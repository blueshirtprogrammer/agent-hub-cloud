import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { GoogleGenerativeAI } from 'https://esm.sh/@google/generative-ai@0.1.3'

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Initialize Gemini
const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
const supabase = createClient(supabaseUrl!, supabaseKey!)

async function analyzeTeamRequirements(description: string) {
  console.log('Starting team requirements analysis for:', description)
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

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
    throw new Error(`Failed to analyze team requirements: ${error.message}`)
  }
}

async function createSuperTeam(teamConfig: any) {
  console.log('Creating team with config:', teamConfig)
  try {
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
    console.log('Team and roles created successfully')
    return { success: true, team }
  } catch (error) {
    console.error('Error creating super team:', error)
    throw new Error(`Failed to create team: ${error.message}`)
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
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
          { 
            headers: { 
              ...corsHeaders,
              'Content-Type': 'application/json'
            }
          }
        )
      }

      default:
        throw new Error('Invalid action')
    }
  } catch (error) {
    console.error('Error processing request:', error)
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
    )
  }
})