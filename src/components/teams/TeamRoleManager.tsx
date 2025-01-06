import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PlusCircle, UserPlus } from "lucide-react";

export const TeamRoleManager = ({ teamId }: { teamId: string }) => {
  const [roleName, setRoleName] = React.useState("");
  const [roleDescription, setRoleDescription] = React.useState("");
  const [capabilities, setCapabilities] = React.useState<string[]>([]);
  const { toast } = useToast();

  const handleAddRole = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('team_roles')
        .insert({
          team_id: teamId,
          name: roleName,
          description: roleDescription,
          capabilities: capabilities,
          required_tools: []
        });

      if (error) throw error;

      toast({
        title: "Role added successfully",
        description: `${roleName} has been added to the team.`
      });

      // Reset form
      setRoleName("");
      setRoleDescription("");
      setCapabilities([]);
    } catch (error) {
      console.error('Error adding role:', error);
      toast({
        title: "Error",
        description: "Failed to add role. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Team Roles</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddRole} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="roleName">Role Name</Label>
            <Input
              id="roleName"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="e.g., Lead Agent, Sales Manager"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="roleDescription">Description</Label>
            <Input
              id="roleDescription"
              value={roleDescription}
              onChange={(e) => setRoleDescription(e.target.value)}
              placeholder="Role responsibilities and requirements"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Capabilities</Label>
            <Select
              value={capabilities[0]}
              onValueChange={(value) => setCapabilities([...capabilities, value])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select capabilities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="listing_management">Listing Management</SelectItem>
                <SelectItem value="client_communication">Client Communication</SelectItem>
                <SelectItem value="document_processing">Document Processing</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-2">
            {capabilities.map((cap, index) => (
              <div
                key={index}
                className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {cap}
                <button
                  type="button"
                  onClick={() => setCapabilities(capabilities.filter((_, i) => i !== index))}
                  className="hover:text-destructive"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <Button type="submit" className="w-full">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Role
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};