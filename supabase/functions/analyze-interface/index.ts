import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { GoogleGenerativeAI } from 'https://esm.sh/@google/generative-ai@0.1.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Initialize Gemini with the correct API endpoint and model
const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '', {
  apiEndpoint: 'https://generativelanguage.googleapis.com/v1beta'
})

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { imageData, context } = await req.json()
    console.log('Analyzing interface with context:', context)

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Convert base64 to Uint8Array for Gemini
    const binaryData = Uint8Array.from(atob(imageData.split(',')[1]), c => c.charCodeAt(0))
    
    // Use gemini-1.5-flash for image analysis as it supports multimodal inputs
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `Analyze this interface screenshot and provide UX/UI feedback. Consider:
    1. Visual hierarchy
    2. Layout and spacing
    3. Color usage and contrast
    4. Typography
    5. Interactive elements
    6. Accessibility concerns
    
    Additional context: ${context || 'No specific context provided'}
    
    Provide feedback in JSON format with these keys:
    {
      "strengths": [],
      "improvements": [],
      "accessibility": [],
      "priority_changes": []
    }`

    console.log('Sending request to Gemini with model: gemini-1.5-flash')
    
    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [
          { text: prompt },
          { inlineData: { mimeType: 'image/png', data: imageData.split(',')[1] } }
        ]
      }]
    })

    const response = await result.response
    let analysis = {}

    try {
      analysis = JSON.parse(response.text())
    } catch (parseError) {
      console.error('Failed to parse analysis as JSON:', parseError)
      analysis = {
        raw_text: response.text(),
        error: 'Failed to parse as JSON'
      }
    }

    // Store analysis result
    const { error: dbError } = await supabase
      .from('ux_analysis')
      .insert({
        analysis_result: analysis,
        context: context || null
      })

    if (dbError) {
      console.error('Error storing analysis:', dbError)
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        analysis
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )

  } catch (error) {
    console.error('Error in analyze-interface:', error)
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