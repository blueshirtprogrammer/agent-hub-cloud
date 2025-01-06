import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { GoogleGenerativeAI } from 'https://esm.sh/@google/generative-ai@0.1.3'

const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface DocumentRequirement {
  formType: string
  purpose: string
  requiredFields: Record<string, string>
  deadline?: string
  recipients?: string[]
}

async function analyzeRequest(request: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
  
  const prompt = `As a REIQ document expert, analyze this request and identify required documents and actions:
  "${request}"
  
  Return a JSON object with:
  {
    "documents": [{
      "formType": string (e.g., "Form 9", "Entry Notice"),
      "purpose": string,
      "requiredFields": Record<string, string>,
      "deadline": string (optional),
      "recipients": string[] (optional)
    }],
    "tasks": [{
      "type": string,
      "assignTo": string (role),
      "deadline": string,
      "description": string
    }],
    "timeline": [{
      "action": string,
      "date": string,
      "responsible": string
    }]
  }`

  const result = await model.generateContent(prompt)
  const response = await result.response
  return JSON.parse(response.text())
}

async function createWorkflowTasks(
  supabase: any,
  analysis: any,
  propertyId: string
) {
  const tasks = []
  
  for (const task of analysis.tasks) {
    // Find suitable agent
    const { data: agent } = await supabase
      .from('agents')
      .select('*')
      .eq('role', task.assignTo)
      .single()

    if (!agent) continue

    // Create task
    const { data: newTask } = await supabase
      .from('listing_tasks')
      .insert({
        listing_id: propertyId,
        task_type: task.type,
        status: 'pending',
        assigned_to: agent.id,
        due_date: task.deadline,
        metadata: {
          description: task.description,
          timeline: analysis.timeline
        }
      })
      .select()
      .single()

    tasks.push(newTask)
  }

  return tasks
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { request } = await req.json()
    console.log('Processing request:', request)

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Analyze the request
    const analysis = await analyzeRequest(request)
    console.log('Analysis results:', analysis)

    // Create tasks and workflow
    const tasks = await createWorkflowTasks(supabase, analysis, 'property_id')

    return new Response(
      JSON.stringify({ 
        success: true,
        analysis,
        tasks,
        message: 'Request processed successfully'
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    console.error('Error processing request:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message 
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