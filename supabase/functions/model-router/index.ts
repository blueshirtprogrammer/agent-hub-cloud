import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.2.1";

const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { model, context } = await req.json();
    console.log('Processing request with model:', model);
    console.log('Context:', context);

    const modelInstance = genAI.getGenerativeModel({ model });

    let result;
    if (context.requiresMultimodal && context.input.images?.length > 0) {
      result = await modelInstance.generateContent([
        context.input.text || '',
        ...context.input.images.map(img => ({
          inlineData: {
            mimeType: "image/png",
            data: img.split(',')[1]
          }
        }))
      ]);
    } else {
      result = await modelInstance.generateContent(context.input.text || '');
    }

    const response = await result.response;
    const confidence = calculateConfidence(response.text());

    return new Response(
      JSON.stringify({
        result: response.text(),
        confidence,
        metadata: {
          model,
          taskType: context.type,
          timestamp: new Date().toISOString()
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in model-router function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

function calculateConfidence(text: string): number {
  // Simple confidence calculation based on response length and structure
  if (!text) return 0;
  const minLength = 50;
  const maxLength = 1000;
  const length = text.length;
  const lengthScore = Math.min(Math.max((length - minLength) / (maxLength - minLength), 0), 1);
  return 0.5 + (lengthScore * 0.5); // Base 0.5 confidence + up to 0.5 based on length
}