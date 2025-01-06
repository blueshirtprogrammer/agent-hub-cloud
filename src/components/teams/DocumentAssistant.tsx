import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Loader2, CheckCircle2 } from "lucide-react"

export const DocumentAssistant = () => {
  const [request, setRequest] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [steps, setSteps] = useState<{text: string, completed: boolean}[]>([])
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setSteps([
      { text: "Analyzing request...", completed: false },
      { text: "Identifying required documents...", completed: false },
      { text: "Retrieving templates...", completed: false },
      { text: "Creating tasks...", completed: false }
    ])

    try {
      const { data, error } = await supabase.functions.invoke('document-assistant', {
        body: { request }
      })

      if (error) throw error

      // Update steps as they complete
      setSteps(prev => prev.map((step, index) => ({
        ...step,
        completed: true
      })))

      toast({
        title: "Request Processed",
        description: `Tasks created and assigned to ${data.assignedAgent}`,
      })

      setRequest("")
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: "Failed to process your request",
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
          Describe what you need in plain English, and I'll handle the paperwork
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="e.g., 'I need to schedule a property inspection for 10 Smith Street on January 10th and notify the tenant'"
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
                    <Loader2 className="h-4 w-4 animate-spin" />
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