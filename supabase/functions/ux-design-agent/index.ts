import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.1.3";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: corsHeaders,
      status: 204
    });
  }

  try {
    const { imageData, context } = await req.json();
    
    if (!imageData || !imageData.includes('base64')) {
      throw new Error('Invalid image data format');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-vision' });

    const prompt = `As a UX/UI expert specializing in real estate software interfaces, analyze this screenshot.
    Consider the following aspects:

    1. Visual Hierarchy & Layout
    - Evaluate the layout structure and content organization
    - Assess the visual hierarchy of information
    - Check spacing and alignment consistency

    2. Navigation & User Flow
    - Evaluate the navigation structure
    - Assess the clarity of user pathways
    - Check for clear call-to-actions

    3. Real Estate Industry Context
    - Evaluate alignment with real estate workflows
    - Check industry-specific feature implementation
    - Assess professional presentation

    4. Accessibility & Usability
    - Check color contrast and readability
    - Evaluate form design and input patterns
    - Assess responsive design implementation

    Current context: ${context}

    Provide analysis in this format:
    {
      "overall_assessment": "Brief overall evaluation",
      "strengths": ["Key positive aspects"],
      "areas_for_improvement": ["Specific improvement suggestions"],
      "industry_specific_feedback": ["Real estate industry specific notes"],
      "accessibility_notes": ["Accessibility observations"],
      "priority_changes": ["Ordered list of recommended changes"]
    }`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "image/png",
          data: imageData.split(',')[1]
        }
      }
    ]);

    if (!result.response) {
      throw new Error('No response from AI model');
    }

    const response = await result.response;
    const analysis = JSON.parse(response.text());

    // Store analysis in Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    );

    await supabase
      .from('ux_analysis')
      .insert({
        analysis_result: analysis,
        context: context || 'general'
      });

    return new Response(
      JSON.stringify({ analysis }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    console.error('Error:', error);
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
    );
  }
});