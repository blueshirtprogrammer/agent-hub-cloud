import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.1.3"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { request } = await req.json()

    // Use Gemini to analyze the request and determine required forms
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `As a real estate document assistant, analyze this request and determine which REIQ form is needed: "${request}". 
                   Return only the form number (e.g., "form_6", "form_9", etc.).`;

    const result = await model.generateContent(prompt);
    const formType = result.response.text().trim().toLowerCase();
    console.log('Identified form type:', formType);

    // Check if template exists in storage
    const { data: templateExists, error: templateCheckError } = await supabase
      .storage
      .from('process_documents')
      .list(`templates/${formType}`)

    if (templateCheckError) {
      console.error('Error checking template:', templateCheckError);
      throw new Error('Failed to check template existence');
    }

    if (!templateExists || templateExists.length === 0) {
      console.error('Template not found:', formType);
      return new Response(
        JSON.stringify({
          error: `Template ${formType} not found. Available templates are in process_documents/templates/`,
          formType
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 404
        }
      )
    }

    // Create a task for document processing
    const { data: task, error: taskError } = await supabase
      .from('listing_tasks')
      .insert({
        task_type: 'document_processing',
        status: 'pending',
        metadata: {
          formType,
          originalRequest: request,
          requiredDocuments: [`templates/${formType}/template.pdf`]
        }
      })
      .select()
      .single()

    if (taskError) {
      console.error('Error creating task:', taskError);
      throw taskError;
    }

    // Assign to an available agent
    const { data: agent, error: agentError } = await supabase
      .from('agents')
      .select('id, name')
      .eq('status', 'idle')
      .limit(1)
      .single()

    if (agentError) {
      console.error('Error finding agent:', agentError);
      throw agentError;
    }

    // Update task with assigned agent
    const { error: updateError } = await supabase
      .from('listing_tasks')
      .update({ assigned_to: agent.id })
      .eq('id', task.id)

    if (updateError) {
      console.error('Error assigning task:', updateError);
      throw updateError;
    }

    return new Response(
      JSON.stringify({
        message: 'Document request processed successfully',
        taskId: task.id,
        assignedAgent: agent.name,
        formType
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to process document request',
        details: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})