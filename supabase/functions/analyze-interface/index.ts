import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.1.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { screenshot, context } = await req.json();
    
    if (!screenshot) {
      throw new Error('Screenshot data is required');
    }

    if (!screenshot.startsWith('data:image/png;base64,')) {
      throw new Error('Invalid screenshot format');
    }

    console.log('Analyzing interface with context:', context);

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Extract base64 data
    const base64Data = screenshot.split(',')[1];
    if (!base64Data) {
      throw new Error('Invalid screenshot data format');
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') ?? '');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Prepare the prompt
    const prompt = `
      Analyze this interface screenshot from the perspective of a conversion optimization expert.
      Focus on the ${context} page context.
      
      Provide analysis in these categories:
      1. Conversion Optimization
      2. Visual Hierarchy
      3. User Experience
      4. Real Estate Context
      
      For each category include:
      - Strengths
      - Improvements
      - Priority Actions (max 2)
      
      Format as JSON with this structure:
      {
        "conversion_optimization": {
          "strengths": [],
          "improvements": [],
          "priority_actions": []
        },
        // ... repeat for other categories
      }
    `;

    // Generate analysis
    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [
          { text: prompt },
          { inlineData: { mimeType: 'image/png', data: base64Data } }
        ]
      }]
    });

    const response = await result.response;
    const analysis = response.text();

    // Store analysis in database
    const { error: dbError } = await supabaseClient
      .from('ux_analysis')
      .insert({
        analysis_result: { raw_text: analysis },
        context,
      });

    if (dbError) {
      console.error('Error storing analysis:', dbError);
    }

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
    console.error('Error in analyze-interface function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error',
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