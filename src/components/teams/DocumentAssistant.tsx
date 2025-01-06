import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Loader2, CheckCircle2, Search, Download, FileCheck } from "lucide-react"

export const DocumentAssistant = () => {
  const [request, setRequest] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [steps, setSteps] = useState<{text: string, completed: boolean, icon?: React.ReactNode}[]>([])
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setSteps([
      { 
        text: "Checking local templates...", 
        completed: false,
        icon: <Search className="h-4 w-4" />
      },
      { 
        text: "Activating web research agent...", 
        completed: false,
        icon: <Search className="h-4 w-4" />
      },
      { 
        text: "Processing document request...", 
        completed: false,
        icon: <FileCheck className="h-4 w-4" />
      },
      { 
        text: "Storing retrieved document...", 
        completed: false,
        icon: <Download className="h-4 w-4" />
      }
    ])

    try {
      // First try the REIQ document assistant
      const { data: reiqData, error: reiqError } = await supabase.functions.invoke('reiq-document-assistant', {
        body: { request }
      })

      if (reiqError && reiqError.message.includes("Template not found")) {
        // Update first step as completed but template not found
        setSteps(prev => [
          { ...prev[0], completed: true, text: "Local template not found" },
          ...prev.slice(1)
        ])

        // Activate web research agent
        const { data: researchData, error: researchError } = await supabase.functions.invoke('web-research-agent', {
          body: { 
            searchQuery: request,
            documentType: "REIQ Form" // You can make this more specific based on the request
          }
        })

        if (researchError) throw researchError

        // Update steps based on web research success
        setSteps(prev => prev.map((step, index) => ({
          ...step,
          completed: true,
          text: index === 1 ? "Web research completed successfully" : step.text
        })))

        toast({
          title: "Document Retrieved",
          description: `Document found and stored at ${researchData.filePath}`,
        })
      } else if (reiqError) {
        throw reiqError
      } else {
        // Local template was found and processed
        setSteps(prev => prev.map((step, index) => ({
          ...step,
          completed: true,
          text: index === 0 ? "Local template found and processed" : step.text
        })))

        toast({
          title: "Document Processed",
          description: "Document was found locally and processed successfully",
        })
      }

      setRequest("")
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: error.message || "Failed to process your request",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Assistant</CardTitle>
        <CardDescription>
          Describe what you need in plain English, and I'll handle the paperwork. 
          If I can't find the document locally, I'll search for it online.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="e.g., 'I need a REIQ Form 6 - Appointment and reappointment of real estate agent'"
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            className="min-h-[100px]"
          />
          <Button 
            type="submit" 
            disabled={isProcessing || !request.trim()}
            className="w-full"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing Request...
              </>
            ) : (
              "Submit Request"
            )}
          </Button>

          {steps.length > 0 && (
            <div className="mt-4 space-y-2">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {step.completed ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    step.icon || <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                  <span className="text-sm text-muted-foreground">{step.text}</span>
                </div>
              ))}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}