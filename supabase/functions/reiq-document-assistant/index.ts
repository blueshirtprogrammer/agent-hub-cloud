import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { GoogleGenerativeAI } from 'https://esm.sh/@google/generative-ai@0.1.3'

const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')
const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
const supabase = createClient(supabaseUrl!, supabaseKey!)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function validateFormAccuracy(formType: string, requirements: any) {
  console.log('Validating form accuracy for:', formType)
  
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
  
  const prompt = `As a REIQ document expert, validate the accuracy and completeness of the ${formType} requirements:
  ${JSON.stringify(requirements, null, 2)}
  
  Please analyze and verify:
  1. Are all required fields for this form type included?
  2. Are the field requirements accurate according to current REIQ standards?
  3. Are there any missing compliance requirements specific to Queensland?
  4. Are the suggested values and formats correct?
  5. What additional fields or requirements might be missing?
  
  Return a JSON object with:
  {
    "isValid": boolean,
    "missingFields": string[],
    "inaccurateFields": string[],
    "suggestions": string[],
    "complianceNotes": string[],
    "confidence": number
  }`

  const result = await model.generateContent(prompt)
  const response = await result.response
  return JSON.parse(response.text())
}

async function findREIQDocument(formType: string) {
  console.log('Searching for REIQ document:', formType)
  
  // First check our local storage
  const { data: existingDocs } = await supabase
    .storage
    .from('process_documents')
    .list(`templates/${formType}`)

  if (existingDocs && existingDocs.length > 0) {
    console.log('Found template in local storage')
    return existingDocs[0]
  }

  throw new Error('Template not found in local storage')
}

async function analyzeFormRequirements(formType: string, propertyDetails: any) {
  console.log('Analyzing form requirements for:', formType, propertyDetails)
  
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
  
  const prompt = `As a REIQ document expert, analyze the requirements for a ${formType} with these details:
  ${JSON.stringify(propertyDetails, null, 2)}
  
  Return a JSON object with:
  1. Required fields and their descriptions
  2. Suggested values based on the provided details
  3. Any special requirements or conditions
  4. Required signatures and witness details
  5. Compliance requirements specific to Queensland`

  const result = await model.generateContent(prompt)
  const response = await result.response
  return JSON.parse(response.text())
}

async function createTask(formType: string, propertyDetails: any, requirements: any, validation: any) {
  // Find an agent with document processing capabilities
  const { data: agents } = await supabase
    .from('agents')
    .select('*')
    .contains('capabilities', ['document_processing'])
    .single()

  if (!agents) {
    throw new Error('No suitable agent found for document processing')
  }

  // Create a task for document generation
  const task = {
    task_type: `Generate ${formType}`,
    status: 'pending',
    assigned_to: agents.id,
    metadata: {
      form_type: formType,
      property_details: propertyDetails,
      requirements: requirements,
      validation_results: validation,
      description: `Generate ${formType} for ${propertyDetails.address}`
    },
    due_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
  }

  const { data, error } = await supabase
    .from('listing_tasks')
    .insert([task])
    .select()
    .single()

  if (error) throw error
  return data
}

async function createListingDocument(formType: string, propertyDetails: any, filePath: string, validation: any) {
  // First, find or create the property listing
  let { data: listing } = await supabase
    .from('property_listings')
    .select('id')
    .eq('address', propertyDetails.address)
    .single()

  if (!listing) {
    const { data: newListing, error: listingError } = await supabase
      .from('property_listings')
      .insert([{
        address: propertyDetails.address,
        seller_name: propertyDetails.ownerName,
        listing_status: 'draft',
        workflow_stage: 'document_preparation'
      }])
      .select()
      .single()

    if (listingError) throw listingError
    listing = newListing
  }

  // Create the document record
  const { error: docError } = await supabase
    .from('listing_documents')
    .insert([{
      listing_id: listing.id,
      document_type: formType,
      file_path: filePath,
      status: 'pending',
      metadata: {
        owner_name: propertyDetails.ownerName,
        generated_at: new Date().toISOString(),
        validation_results: validation
      }
    }])

  if (docError) throw docError
  return listing.id
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { formType, propertyDetails } = await req.json()
    console.log('Received request for:', formType, propertyDetails)

    // Find the template document
    const template = await findREIQDocument(formType)
    console.log('Found template:', template)

    // Analyze form requirements
    const requirements = await analyzeFormRequirements(formType, propertyDetails)
    console.log('Analyzed requirements:', requirements)

    // Validate form accuracy
    const validation = await validateFormAccuracy(formType, requirements)
    console.log('Validation results:', validation)

    // Create task for document generation
    const task = await createTask(formType, propertyDetails, requirements, validation)
    console.log('Created task:', task)

    // Create listing document record
    const listingId = await createListingDocument(formType, propertyDetails, template.name, validation)
    console.log('Created listing document for listing:', listingId)

    return new Response(
      JSON.stringify({ 
        success: true,
        requirements,
        validation,
        task,
        listingId
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    console.error('Error processing request:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  }
})