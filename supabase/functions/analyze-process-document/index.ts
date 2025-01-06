import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { GoogleGenerativeAI } from 'https://esm.sh/@google/generative-ai@0.1.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')

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

    if (downloadError) throw downloadError

    // Convert file to text
    const text = await fileData.text()

    // Analyze with Gemini based on document type
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    
    const prompts = {
      form_6: `Analyze this Form 6 (Appointment of Real Estate Agent) and extract:
        1. Property address
        2. Seller details
        3. Commission rate
        4. Listing period
        5. Special conditions
        Return a JSON object with these fields.`,
      rates_notice: `Analyze this rates notice and extract:
        1. Property details
        2. Assessment number
        3. Rates amount
        4. Due date
        Return a JSON object with these fields.`,
      tenancy_agreement: `Analyze this tenancy agreement and extract:
        1. Property address
        2. Tenant details
        3. Lease period
        4. Rent amount
        5. Special conditions
        Return a JSON object with these fields.`,
      // Add more document type prompts as needed
    }

    const prompt = `${prompts[documentType as keyof typeof prompts] || 'Analyze this document and extract key information.'}\n\nDocument text:\n${text}`

    const result = await model.generateContent(prompt)
    const analysis = JSON.parse(result.response.text())

    // Update analysis record
    const { error: updateError } = await supabase
      .from('document_analysis')
      .update({
        status: 'completed',
        analysis_result: analysis,
        updated_at: new Date().toISOString()
      })
      .eq('file_path', filePath)

    if (updateError) throw updateError

    return new Response(
      JSON.stringify({ success: true, analysis }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in analyze-process-document:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})