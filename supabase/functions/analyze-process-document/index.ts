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
    const { filePath } = await req.json()
    console.log('Analyzing document:', filePath)

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

    // Analyze with Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const prompt = `Analyze this real estate process document and create a structured output with:
    1. Required team roles and their responsibilities
    2. Main process stages
    3. Tasks for each stage
    4. Required documents and tools
    Return ONLY a JSON object with these exact fields, no additional text:
    {
      "roles": [
        {
          "name": "string",
          "responsibilities": "string",
          "capabilities": ["string"]
        }
      ],
      "stages": [
        {
          "name": "string",
          "tasks": [
            {
              "description": "string",
              "assignedTo": "string",
              "requiredDocs": ["string"]
            }
          ]
        }
      ]
    }

    Document text:
    ${text}`

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