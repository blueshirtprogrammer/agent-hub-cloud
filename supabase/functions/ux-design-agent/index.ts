import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '');

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const supabase = createClient(supabaseUrl!, supabaseKey!);

async function analyzeInterface(imageData: string, context: string) {
  try {
    console.log('Starting interface analysis with context:', context);
    
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

    const prompt = `You are a UX/UI design expert specializing in real estate software. 
    Analyze this interface screenshot and provide specific, actionable feedback based on these criteria:

    1. Alignment with real estate industry standards and workflows
    2. Clarity and intuitiveness of the interface
    3. Accessibility and responsiveness
    4. Visual hierarchy and information architecture
    5. Consistency with the development brief requirements
    6. Suggestions for improvement

    Context about this interface: ${context}

    Provide your feedback in this JSON format:
    {
      "overall_assessment": "string",
      "strengths": ["string"],
      "areas_for_improvement": ["string"],
      "specific_recommendations": ["string"],
      "industry_specific_feedback": ["string"],
      "accessibility_notes": ["string"],
      "priority_changes": ["string"]
    }`;

    console.log('Sending request to Gemini API');
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "image/png",
          data: imageData.split(',')[1]
        }
      }
    ]);

    const response = await result.response;
    const analysis = JSON.parse(response.text());
    
    console.log('Analysis completed successfully');

    // Store analysis in the database
    const { error: dbError } = await supabase
      .from('ux_analysis')
      .insert({
        analysis_result: analysis,
        screenshot_timestamp: new Date().toISOString(),
        context: context
      });

    if (dbError) {
      console.error('Error storing analysis:', dbError);
      throw dbError;
    }

    return analysis;
  } catch (error) {
    console.error('Error in analyzeInterface:', error);
    throw error;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== 'POST') {
      throw new Error(`HTTP method ${req.method} is not supported.`);
    }

    const { imageData, context } = await req.json();
    console.log('Received request with context:', context);

    if (!imageData) {
      throw new Error('No image data provided');
    }

    const analysis = await analyzeInterface(imageData, context);
    console.log('Analysis completed, sending response');

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
    console.error('Error processing request:', error);
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