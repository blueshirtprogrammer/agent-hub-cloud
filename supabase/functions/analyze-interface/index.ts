import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { GoogleGenerativeAI } from 'https://esm.sh/@google/generative-ai@0.1.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Initialize Gemini with the latest Flash Thinking model for better reasoning
const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')

// Initialize Supabase Admin Client
const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
const supabase = createClient(supabaseUrl!, supabaseKey!)

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { url, screenshot } = await req.json()
    console.log('Analyzing interface for URL:', url)

    // Create a new scraping session
    const { data: session, error: sessionError } = await supabase
      .from('scraping_sessions')
      .insert([
        { 
          url,
          status: 'processing',
          screenshots: screenshot ? [screenshot] : []
        }
      ])
      .select()
      .single()

    if (sessionError) {
      throw sessionError
    }

    // Use the latest Gemini Flash Thinking model for enhanced reasoning
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-thinking-exp-1219' })

    const prompt = `Analyze this screenshot of the Relevance AI interface. 
    Please identify and describe:
    1. The main UI components and their purposes
    2. Any visible API endpoints or data structures
    3. The workflow and user interaction patterns
    4. Any configuration options or parameters visible
    Provide the response in a structured JSON format.`

    const result = await model.generateContent([prompt, screenshot])
    const response = await result.response
    const text = response.text()

    // Store the analysis in the knowledge base
    const { error: knowledgeError } = await supabase
      .from('knowledge_base')
      .insert([
        {
          topic: 'interface_analysis',
          content: { analysis: text },
          source_session_id: session.id,
          confidence: 0.8
        }
      ])

    if (knowledgeError) {
      throw knowledgeError
    }

    // Update session status
    await supabase
      .from('scraping_sessions')
      .update({ status: 'completed', data: { analysis: text } })
      .eq('id', session.id)

    return new Response(
      JSON.stringify({ success: true, sessionId: session.id }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    )
  }
})