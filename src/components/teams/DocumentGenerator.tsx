import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Loader2 } from "lucide-react"

export const DocumentGenerator = () => {
  const [formType, setFormType] = useState("form_6")
  const [address, setAddress] = useState("")
  const [ownerName, setOwnerName] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      const { data, error } = await supabase.functions.invoke('reiq-document-assistant', {
        body: {
          formType,
          propertyDetails: {
            address,
            ownerName
          }
        }
      })

      if (error) throw error

      toast({
        title: "Document Generation Started",
        description: `Task created and assigned to ${data.task.assigned_to}`,
      })

      // Reset form
      setAddress("")
      setOwnerName("")
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: "Failed to start document generation",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>REIQ Document Generator</CardTitle>
        <CardDescription>
          Generate REIQ documents by providing property and owner details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="formType">Document Type</Label>
            <Select value={formType} onValueChange={setFormType}>
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="form_6">Form 6 - Appointment of Real Estate Agent</SelectItem>
                <SelectItem value="form_9">Form 9 - Sale of Residential Property</SelectItem>
                <SelectItem value="form_30c">Form 30C - Residential Tenancy Agreement</SelectItem>
                <SelectItem value="form_1a">Form 1A - Entry Condition Report</SelectItem>
                <SelectItem value="form_12">Form 12 - Property Occupancy Certificate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Property Address</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g., 1 Aqua Street, Brisbane City"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ownerName">Owner Name</Label>
            <Input
              id="ownerName"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              placeholder="e.g., Josh Goodlock"
              required
            />
          </div>

          <Button 
            type="submit" 
            disabled={isProcessing || !address.trim() || !ownerName.trim()}
            className="w-full"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Generate Document"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}