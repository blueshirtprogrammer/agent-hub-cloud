import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PlusCircle, Shield, Star } from "lucide-react";

export const TeamRoleManager = ({ teamId }: { teamId: string }) => {
  const [roleName, setRoleName] = React.useState("");
  const [roleDescription, setRoleDescription] = React.useState("");
  const [capabilities, setCapabilities] = React.useState<string[]>([]);
  const [priority, setPriority] = React.useState(1);
  const [maxAssignments, setMaxAssignments] = React.useState<number>();
  const [isLeadership, setIsLeadership] = React.useState(false);
  const [reportingTo, setReportingTo] = React.useState<string>();
  const [existingRoles, setExistingRoles] = React.useState<any[]>([]);
  const { toast } = useToast();

  React.useEffect(() => {
    fetchExistingRoles();
  }, [teamId]);

  const fetchExistingRoles = async () => {
    try {
      const { data, error } = await supabase
        .from('team_roles')
        .select('*')
        .eq('team_id', teamId);

      if (error) throw error;
      setExistingRoles(data || []);
    } catch (error) {
      console.error('Error fetching roles:', error);
      toast({
        title: "Error",
        description: "Failed to fetch existing roles",
        variant: "destructive"
      });
    }
  };

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
          required_tools: [],
          priority: priority,
          max_assignments: maxAssignments,
          reporting_to: reportingTo,
          is_leadership: isLeadership,
          permissions: []
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
      setPriority(1);
      setMaxAssignments(undefined);
      setIsLeadership(false);
      setReportingTo(undefined);
      
      // Refresh roles list
      fetchExistingRoles();
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
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg font-semibold">Team Roles</CardTitle>
        </div>
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority Level</Label>
              <Input
                id="priority"
                type="number"
                min={1}
                max={10}
                value={priority}
                onChange={(e) => setPriority(parseInt(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxAssignments">Max Assignments</Label>
              <Input
                id="maxAssignments"
                type="number"
                min={1}
                value={maxAssignments || ''}
                onChange={(e) => setMaxAssignments(parseInt(e.target.value))}
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Reports To</Label>
            <Select
              value={reportingTo}
              onValueChange={setReportingTo}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select supervisor role" />
              </SelectTrigger>
              <SelectContent>
                {existingRoles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isLeadership"
              checked={isLeadership}
              onCheckedChange={setIsLeadership}
            />
            <Label htmlFor="isLeadership" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Leadership Role
            </Label>
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