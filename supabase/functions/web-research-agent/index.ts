import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.1.3"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { searchQuery, documentType } = await req.json()
    console.log('Web Research Agent activated for:', searchQuery, 'Document Type:', documentType)

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Create a temporary agent record
    const { data: agent, error: agentError } = await supabase
      .from('agents')
      .insert({
        name: 'Web Research Agent',
        role: 'WEB_RESEARCHER',
        capabilities: ['web_search', 'document_processing', 'content_analysis'],
        status: 'busy'
      })
      .select()
      .single()

    if (agentError) throw agentError

    // Use Gemini to analyze the search requirements
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const searchPrompt = `Analyze this search request and provide specific search terms and potential sources for finding "${documentType}" related to "${searchQuery}". Format as JSON with fields: searchTerms (array), potentialSources (array), documentIdentifiers (array of possible document numbers or references).`

    const result = await model.generateContent(searchPrompt)
    const searchStrategy = JSON.parse(result.response.text())
    
    console.log('Search strategy:', searchStrategy)

    // Simulate web search and document retrieval
    // In a real implementation, this would use actual web scraping or API calls
    const documentContent = await simulateDocumentRetrieval(searchStrategy)

    // Store the found document
    const fileName = `${documentType.toLowerCase()}_${Date.now()}.pdf`
    const filePath = `templates/${documentType}/${fileName}`

    // Store document metadata
    const { error: docError } = await supabase
      .from('document_analysis')
      .insert({
        file_name: fileName,
        file_path: filePath,
        status: 'retrieved',
        analysis_result: {
          source: 'web_research',
          search_strategy: searchStrategy,
          confidence_score: 0.85,
          retrieved_at: new Date().toISOString()
        }
      })

    if (docError) throw docError

    // Update agent status
    await supabase
      .from('agents')
      .update({ status: 'idle' })
      .eq('id', agent.id)

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Document retrieved and stored',
        filePath,
        agent: agent.id
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in web-research-agent:', error)
    return new Response(
      JSON.stringify({
        error: 'Failed to complete web research',
        details: error.message
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

// Simulate document retrieval - in production, replace with actual web scraping
async function simulateDocumentRetrieval(searchStrategy: any) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  return {
    content: "Simulated document content",
    metadata: {
      source: searchStrategy.potentialSources[0],
      retrievedAt: new Date().toISOString(),
      searchTermsUsed: searchStrategy.searchTerms
    }
  }
}