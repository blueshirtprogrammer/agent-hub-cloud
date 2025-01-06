import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { GoogleGenerativeAI } from 'https://esm.sh/@google/generative-ai@0.1.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Initialize Gemini with the latest Flash Thinking model for better reasoning
const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')

// Initialize Supabase Admin Client
const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
const supabase = createClient(supabaseUrl!, supabaseKey!)

async function createSuperAgentTeam(teamConfig: any) {
  try {
    // Create supervisor agent
    const { data: supervisor, error: supervisorError } = await supabase
      .from('agents')
      .insert([{
        name: `${teamConfig.name}_Supervisor`,
        role: 'SUPERVISOR',
        capabilities: ['task_distribution', 'coordination'],
        status: 'idle'
      }])
      .select()
      .single()

    if (supervisorError) throw supervisorError

    // Create orchestrator agents
    const orchestratorRoles = ['BROWSER_ORCHESTRATOR', 'VISION_ORCHESTRATOR', 'DATA_ORCHESTRATOR']
    const orchestrators = await Promise.all(
      orchestratorRoles.map(async (role) => {
        const { data: orchestrator } = await supabase
          .from('agents')
          .insert([{
            name: `${teamConfig.name}_${role}`,
            role,
            capabilities: ['task_management', role.toLowerCase()],
            status: 'idle'
          }])
          .select()
          .single()
        return orchestrator
      })
    )

    // Create specialized agents for each orchestrator
    const agentConfigs = [
      { role: 'BROWSER_AGENT', count: 3, capabilities: ['web_scraping', 'navigation'] },
      { role: 'VISION_AGENT', count: 2, capabilities: ['image_analysis', 'ocr'] },
      { role: 'DATA_AGENT', count: 2, capabilities: ['data_processing', 'storage'] }
    ]

    for (const config of agentConfigs) {
      for (let i = 0; i < config.count; i++) {
        await supabase
          .from('agents')
          .insert([{
            name: `${teamConfig.name}_${config.role}_${i + 1}`,
            role: config.role,
            capabilities: config.capabilities,
            status: 'idle'
          }])
      }
    }

    return { success: true, supervisor, orchestrators }
  } catch (error) {
    console.error('Error creating super agent team:', error)
    return { success: false, error }
  }
}

async function analyzeInterface(screenshot: string, url: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-thinking-exp-1219' })

  const prompt = `Analyze this screenshot of the Relevance AI interface in detail. 
  Please identify and describe:
  1. API endpoints visible in the interface
  2. Data structures and models used
  3. UI components and their functionality
  4. Configuration options and parameters
  5. Authentication methods visible
  6. Any visible backend service integrations
  7. Workflow patterns and user interactions
  8. System architecture hints
  Provide a structured JSON response with these categories.`

  const result = await model.generateContent([prompt, screenshot])
  const response = await result.response
  const analysis = response.text()

  return { analysis, url }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { action, data } = await req.json()

    switch (action) {
      case 'analyze_interface': {
        const { url, screenshot } = data
        console.log('Analyzing interface for URL:', url)

        const { data: session, error: sessionError } = await supabase
          .from('scraping_sessions')
          .insert([{ 
            url,
            status: 'processing',
            screenshots: screenshot ? [screenshot] : []
          }])
          .select()
          .single()

        if (sessionError) throw sessionError

        const { analysis } = await analyzeInterface(screenshot, url)

        // Store analysis in knowledge base
        await supabase
          .from('knowledge_base')
          .insert([{
            topic: 'interface_analysis',
            content: { analysis },
            source_session_id: session.id,
            confidence: 0.85
          }])

        // Update session status
        await supabase
          .from('scraping_sessions')
          .update({ 
            status: 'completed', 
            data: { analysis }
          })
          .eq('id', session.id)

        return new Response(
          JSON.stringify({ success: true, sessionId: session.id, analysis }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
        )
      }

      case 'create_super_team': {
        const result = await createSuperAgentTeam(data)
        return new Response(
          JSON.stringify(result),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
        )
      }

      default:
        throw new Error('Invalid action')
    }
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    )
  }
})