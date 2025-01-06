import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { GoogleGenerativeAI } from 'https://esm.sh/@google/generative-ai@0.1.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '', {
  apiEndpoint: 'https://generativelanguage.googleapis.com/v1beta'
})

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: corsHeaders,
      status: 204
    })
  }

  try {
    const { screenshot, context } = await req.json()
    
    if (!screenshot) {
      throw new Error('Screenshot data is required')
    }

    console.log('Analyzing interface with context:', context)

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Validate and extract base64 data
    const base64Data = screenshot.split(',')[1]
    if (!base64Data) {
      throw new Error('Invalid screenshot data format')
    }

    // Convert base64 to Uint8Array for Gemini
    const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))
    
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `You are a world-class UX/UI expert and conversion optimization specialist, similar to Sabri Suby, known for creating high-converting, user-centric interfaces. You're analyzing a real estate AI agent management platform that helps agencies automate and optimize their operations.

Project Context:
This is an AI Agent Management Platform specifically designed for real estate agencies. It includes:
- Task management for real estate workflows
- Document automation for REIQ standards
- Property listing management
- Team creation and management
- Integration with various real estate tools
- Billing and resource management

Current context: ${context || 'No specific context provided'}

Provide analysis in this format:
{
  "conversion_optimization": {
    "strengths": [],
    "improvements": [],
    "priority_actions": []
  },
  "visual_hierarchy": {
    "strengths": [],
    "improvements": [],
    "priority_actions": []
  },
  "user_experience": {
    "strengths": [],
    "improvements": [],
    "priority_actions": []
  },
  "real_estate_context": {
    "strengths": [],
    "improvements": [],
    "priority_actions": []
  }
}`

    console.log('Sending request to Gemini with model: gemini-1.5-flash')
    
    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [
          { text: prompt },
          { inlineData: { mimeType: 'image/png', data: base64Data } }
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