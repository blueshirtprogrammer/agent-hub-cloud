import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { GoogleGenerativeAI } from 'https://esm.sh/@google/generative-ai@0.1.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')

const documentPrompts = {
  form_6: `Analyze this Form 6 (Appointment of Real Estate Agent) and extract:
    1. Property address
    2. Seller details (name, contact info)
    3. Commission rate and structure
    4. Listing period start and end dates
    5. Special conditions or terms
    6. Marketing budget and activities
    7. Price range or listing price
    Return a JSON object with these fields.`,
  
  rates_notice: `Analyze this rates notice and extract:
    1. Property details (address, lot number)
    2. Assessment number
    3. Rates amount and breakdown
    4. Due date
    5. Payment options
    6. Any discounts or concessions
    7. Land valuation details
    Return a JSON object with these fields.`,
  
  tenancy_agreement: `Analyze this tenancy agreement and extract:
    1. Property address
    2. Tenant details (all tenants)
    3. Lease period (start and end dates)
    4. Rent amount and payment frequency
    5. Bond amount
    6. Special conditions
    7. Included utilities and services
    8. Pet clauses
    9. Maintenance responsibilities
    Return a JSON object with these fields.`,
  
  key_record: `Analyze this key record and extract:
    1. Property address
    2. Key identification numbers
    3. Key holder details
    4. Date issued
    5. Security system details
    6. Access restrictions
    7. Key return requirements
    Return a JSON object with these fields.`,
  
  title_search: `Analyze this title search document and extract:
    1. Property details (lot, plan numbers)
    2. Registered owner(s)
    3. Encumbrances and mortgages
    4. Easements
    5. Caveats
    6. Title reference
    7. Last sale details
    8. Zoning information if available
    Return a JSON object with these fields.`,
  
  contract_draft: `Analyze this contract draft and extract:
    1. Property details
    2. Seller information
    3. Buyer information
    4. Purchase price
    5. Deposit amount and terms
    6. Settlement period
    7. Special conditions
    8. Included/excluded fixtures
    9. Building and pest inspection clauses
    10. Finance clauses
    Return a JSON object with these fields.`
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { filePath, documentType } = await req.json()
    console.log('Analyzing document:', filePath, 'Type:', documentType)

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Download file content
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('process_documents')
      .download(filePath)

    if (downloadError) {
      console.error('Download error:', downloadError)
      throw downloadError
    }

    // Convert file to text
    const text = await fileData.text()

    // Analyze with Gemini based on document type
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    
    const prompt = documentPrompts[documentType as keyof typeof documentPrompts] || 
      'Analyze this document and extract key information in a structured JSON format.'

    const fullPrompt = `${prompt}\n\nDocument text:\n${text}\n\nProvide the response in valid JSON format only.`

    const result = await model.generateContent(fullPrompt)
    let analysis

    try {
      analysis = JSON.parse(result.response.text())
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', parseError)
      // If parsing fails, store the raw text
      analysis = { raw_text: result.response.text() }
    }

    // Validate analysis result
    if (!analysis || typeof analysis !== 'object') {
      throw new Error('Invalid analysis result format')
    }

    // Update analysis record with confidence scores
    const confidenceScore = calculateConfidenceScore(analysis)
    
    const { error: updateError } = await supabase
      .from('document_analysis')
      .update({
        status: 'completed',
        analysis_result: {
          ...analysis,
          confidence_score: confidenceScore,
          analyzed_at: new Date().toISOString(),
          document_type: documentType
        },
        updated_at: new Date().toISOString()
      })
      .eq('file_path', filePath)

    if (updateError) {
      console.error('Update error:', updateError)
      throw updateError
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        analysis,
        confidence_score: confidenceScore 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in analyze-process-document:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.details || 'An unexpected error occurred during document analysis'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

// Helper function to calculate confidence score based on completeness of extracted data
function calculateConfidenceScore(analysis: Record<string, any>): number {
  const expectedFields = {
    form_6: ['property_address', 'seller_details', 'commission_rate', 'listing_period'],
    rates_notice: ['property_details', 'assessment_number', 'rates_amount', 'due_date'],
    tenancy_agreement: ['property_address', 'tenant_details', 'lease_period', 'rent_amount'],
    key_record: ['property_address', 'key_identification', 'key_holder', 'date_issued'],
    title_search: ['property_details', 'registered_owners', 'encumbrances', 'title_reference'],
    contract_draft: ['property_details', 'purchase_price', 'deposit_amount', 'settlement_period']
  }

  const documentType = analysis.document_type
  if (!documentType || !expectedFields[documentType as keyof typeof expectedFields]) {
    return 0.5 // Default score for unknown document types
  }

  const expectedFieldsList = expectedFields[documentType as keyof typeof expectedFields]
  const foundFields = expectedFieldsList.filter(field => 
    analysis[field] !== undefined && analysis[field] !== null && analysis[field] !== ''
  )

  return foundFields.length / expectedFieldsList.length
}