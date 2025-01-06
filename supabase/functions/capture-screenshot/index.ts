import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

    // Store screenshot in Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    );

    const timestamp = new Date().toISOString();
    const { data, error } = await supabase
      .from('ux_analysis')
      .insert({
        screenshot_timestamp: timestamp,
        context,
        analysis_result: {} // Empty analysis initially
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(
      JSON.stringify({ 
        success: true,
        id: data.id,
        timestamp 
      }),
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