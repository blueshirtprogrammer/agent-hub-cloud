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

async function createTask(formType: string, propertyDetails: any, requirements: any) {
  const { data: agents } = await supabase
    .from('agents')
    .select('*')
    .contains('capabilities', ['document_processing'])
    .single()

  if (!agents) {
    throw new Error('No suitable agent found for document processing')
  }

  const task = {
    task_type: `Generate ${formType}`,
    status: 'pending',
    assigned_to: agents.id,
    metadata: {
      form_type: formType,
      property_details: propertyDetails,
      requirements: requirements,
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

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { formType, propertyDetails } = await req.json()
    console.log('Received request for:', formType, propertyDetails)

    // Analyze form requirements
    const requirements = await analyzeFormRequirements(formType, propertyDetails)
    console.log('Analyzed requirements:', requirements)

    // Create task for document generation
    const task = await createTask(formType, propertyDetails, requirements)
    console.log('Created task:', task)

    return new Response(
      JSON.stringify({ 
        success: true,
        requirements,
        task
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