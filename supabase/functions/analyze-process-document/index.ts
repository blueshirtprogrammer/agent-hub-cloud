import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { GoogleGenerativeAI } from 'https://esm.sh/@google/generative-ai@0.1.3'
import { documentPrompts } from './prompts.ts'
import { calculateConfidenceScore } from './utils.ts'

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
      analysis = { raw_text: result.response.text() }
    }

    if (!analysis || typeof analysis !== 'object') {
      throw new Error('Invalid analysis result format')
    }

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