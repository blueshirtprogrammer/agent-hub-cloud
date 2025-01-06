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

    const prompt = `You are a world-class UX/UI expert and conversion optimization specialist, similar to Sabri Suby, known for creating high-converting, user-centric interfaces. You're analyzing a real estate AI agent management platform that helps agencies automate and optimize their operations.

Project Context:
This is an AI Agent Management Platform specifically designed for real estate agencies. It includes:
- Task management for real estate workflows
- Document automation for REIQ standards
- Property listing management
- Team creation and management
- Integration with various real estate tools
- Billing and resource management

The target users are real estate agency administrators and agents who need to:
- Efficiently manage their daily tasks
- Handle property listings
- Process real estate documents
- Manage teams and resources
- Track performance metrics

As Sabri Suby would approach this, analyze this interface screenshot focusing on:

1. Conversion Optimization
- Is the interface designed to maximize user engagement and task completion?
- Are there clear calls-to-action?
- Does the layout guide users toward key actions?

2. Visual Hierarchy & Psychology
- How well does the design psychologically guide users?
- Are important elements given proper visual weight?
- Does the layout create a natural flow?

3. User Experience
- How intuitive is the navigation?
- Are there any friction points?
- Is the interface accessible to all users?

4. Real Estate Context
- Does the interface align with real estate professionals' needs?
- Are industry-specific features properly highlighted?
- Is the terminology appropriate for the real estate context?

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
  },
  "sabri_suby_recommendations": {
    "headline_suggestions": [],
    "cta_improvements": [],
    "psychological_triggers": []
  }
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