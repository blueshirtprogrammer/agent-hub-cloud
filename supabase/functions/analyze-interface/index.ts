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
  try {
    console.log('Starting team requirements analysis for:', description)
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
    console.log('Analysis completed successfully')
    return JSON.parse(response.text())
  } catch (error) {
    console.error('Error in analyzeTeamRequirements:', error)
    throw error
  }
}

async function createSuperTeam(teamConfig: any) {
  try {
    console.log('Creating team with config:', teamConfig)

    // Create team configuration with a timeout
    const { data: team, error: teamError } = await Promise.race([
      supabase
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
        .single(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database operation timed out')), 25000)
      )
    ]) as any

    if (teamError) throw teamError

    // Create team roles with a timeout
    const rolePromises = teamConfig.roles.map((role: any) => 
      Promise.race([
        supabase
          .from('team_roles')
          .insert([{
            team_id: team.id,
            name: role.name,
            description: role.description,
            capabilities: role.capabilities,
            required_tools: role.required_tools
          }]),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Role creation timed out')), 25000)
        )
      ])
    )

    await Promise.all(rolePromises)
    console.log('Team and roles created successfully')
    return { success: true, team }
  } catch (error) {
    console.error('Error creating super team:', error)
    return { success: false, error: error.message }
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { action, data } = await req.json()
    console.log(`Processing ${action} request:`, data)

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

      default:
        throw new Error('Invalid action')
    }
  } catch (error) {
    console.error('Error processing request:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})