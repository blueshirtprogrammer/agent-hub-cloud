import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.1.3"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { screenshot, context } = await req.json()

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" })

    // Convert base64 to uint8array for Gemini
    const imageData = Uint8Array.from(atob(screenshot.split(',')[1]), c => c.charCodeAt(0))

    // Analyze the interface
    const result = await model.generateContent([
      "You are a UX/UI expert. Analyze this interface screenshot and provide detailed feedback on:",
      "1. Visual Hierarchy and Layout",
      "2. Navigation and User Flow",
      "3. Consistency and Branding",
      "4. Accessibility and Usability",
      "5. Performance and Responsiveness",
      "Provide specific recommendations for improvements in each area.",
      {
        inlineData: {
          mimeType: "image/png",
          data: imageData
        }
      }
    ])

    const response = await result.response
    const analysis = response.text()

    // Store the analysis in the database
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { error: dbError } = await supabaseClient
      .from('ux_analysis')
      .insert({
        analysis_result: { feedback: analysis },
        context: context || 'general',
      })

    if (dbError) throw dbError

    return new Response(
      JSON.stringify({ analysis }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})