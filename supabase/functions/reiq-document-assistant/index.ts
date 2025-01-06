import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { GoogleGenerativeAI } from 'https://esm.sh/@google/generative-ai@0.1.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Starting document request processing')
    const body = await req.json()
    console.log('Request body:', body)

    if (!body || !body.request) {
      console.error('No request provided in body:', body)
      return new Response(
        JSON.stringify({
          error: 'Failed to process document request',
          details: 'No request provided'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      )
    }

    const { request } = body
    console.log('Processing request:', request)

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        auth: {
          persistSession: false,
        },
      }
    )

    // Process the document request
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const result = await model.generateContent(request)
    const response = await result.response
    const text = response.text()

    return new Response(
      JSON.stringify({
        message: 'Document request processed successfully',
        result: text,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error processing document request:', error)
    return new Response(
      JSON.stringify({
        error: 'Failed to process document request',
        details: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})