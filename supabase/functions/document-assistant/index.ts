import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { GoogleGenerativeAI } from 'https://esm.sh/@google/generative-ai@0.1.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { request } = await req.json()
    console.log('Processing document request:', request)
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // First check if document exists in process_documents bucket
    const { data: processDocsData, error: processDocsError } = await supabase.storage
      .from('process_documents')
      .list()

    if (processDocsError) {
      console.error('Error accessing process_documents:', processDocsError)
      throw new Error('Failed to access document storage')
    }

    // Process the request using Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const result = await model.generateContent(request)
    const response = await result.response
    const text = response.text()

    return new Response(
      JSON.stringify({
        message: 'Document request processed successfully',
        result: text,
        availableDocuments: processDocsData
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )

  } catch (error) {
    console.error('Error in document-assistant:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack
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