import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { GoogleGenerativeAI } from 'https://esm.sh/@google/generative-ai@0.1.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')

const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
const supabase = createClient(supabaseUrl!, supabaseKey!)

async function analyzeTeamRequirements(description: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-thinking-exp-1219' })

  const prompt = `Analyze this team requirements description and create a structured team configuration. The response should be a JSON object with:
  1. Team name (derived from the description)
  2. Team description (enhanced version of user's input)
  3. Required roles (array of roles with name, description, capabilities array, and required_tools array)
  4. Suggested billing tier (basic, pro, or enterprise based on complexity)
  5. Recommended compute credits (number between 1000-10000)
  6. Recommended server hours (number between 100-1000)

  Description: ${description}

  Format the response as a valid JSON object.`

  const result = await model.generateContent(prompt)
  const response = await result.response
  return JSON.parse(response.text())
}

async function createSuperTeam(teamConfig: any) {
  try {
    console.log('Creating team with config:', teamConfig)

    // Create team configuration
    const { data: team, error: teamError } = await supabase
      .from('team_configurations')
      .insert([{
        name: teamConfig.name,
        description: teamConfig.description,
        billing_tier: teamConfig.billing_tier.toLowerCase(),
        compute_credits: teamConfig.compute_credits,
        server_hours: teamConfig.server_hours,
        requirements: teamConfig.requirements || {},
        tools_and_integrations: teamConfig.tools_and_integrations || []
      }])
      .select()
      .single()

    if (teamError) throw teamError

    // Create team roles
    const rolePromises = teamConfig.roles.map((role: any) => 
      supabase
        .from('team_roles')
        .insert([{
          team_id: team.id,
          name: role.name,
          description: role.description,
          capabilities: role.capabilities,
          required_tools: role.required_tools
        }])
    )

    await Promise.all(rolePromises)

    return { success: true, team }
  } catch (error) {
    console.error('Error creating super team:', error)
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
      case 'create_super_team': {
        console.log('Analyzing team requirements:', data.description)
        
        const teamConfig = await analyzeTeamRequirements(data.description)
        console.log('Generated team configuration:', teamConfig)
        
        const result = await createSuperTeam(teamConfig)
        return new Response(
          JSON.stringify(result),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
        )
      }

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
