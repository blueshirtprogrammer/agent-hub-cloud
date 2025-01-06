import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PlusCircle } from "lucide-react";

export const CreateTeamDialog = ({ onTeamCreated }: { onTeamCreated: () => void }) => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [billingTier, setBillingTier] = React.useState("basic");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase
        .from('team_configurations')
        .insert([
          {
            name,
            description,
            billing_tier: billingTier,
            requirements: {
              license: true,
              compliance: true
            },
            tools_and_integrations: ["document_processing", "photography", "marketing", "offers"]
          }
        ])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Team created successfully",
        description: `${name} has been created.`
      });

      onTeamCreated();
    } catch (error) {
      console.error('Error creating team:', error);
      toast({
        title: "Error",
        description: "Failed to create team. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Create Team
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Team</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Team Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter team name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter team description"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="billingTier">Billing Tier</Label>
            <Select value={billingTier} onValueChange={setBillingTier}>
              <SelectTrigger>
                <SelectValue placeholder="Select billing tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="pro">Professional</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">Create Team</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};