import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export default function Index() {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [teams, setTeams] = useState<any[]>([]);
  const { toast } = useToast();

  // Fetch existing teams
  const fetchTeams = async () => {
    try {
      const { data: teamConfigs, error: teamsError } = await supabase
        .from('team_configurations')
        .select(`
          *,
          team_roles (*)
        `);
      
      if (teamsError) throw teamsError;
      setTeams(teamConfigs || []);
    } catch (error) {
      console.error('Error fetching teams:', error);
      toast({
        title: "Error",
        description: "Failed to fetch teams. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-interface', {
        body: { 
          action: 'create_super_team',
          data: {
            description
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Team created successfully! Check the details below.",
      });

      // Refresh teams list
      await fetchTeams();

      // Reset form
      setDescription("");
    } catch (error) {
      console.error('Error creating team:', error);
      toast({
        title: "Error",
        description: "Failed to create team. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatCapabilities = (capabilities: string[]) => {
    return capabilities.join(", ");
  };

  const formatTools = (tools: string[]) => {
    return tools.join(", ");
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Create Team Form */}
        <Card>
          <CardHeader>
            <CardTitle>Create AI Team</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateTeam} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="description">Describe Your Team Needs</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the team you need in plain English. For example: 'I need a marketing team that can handle content creation, social media, and email campaigns. They should be able to use tools like Buffer and Mailchimp.'"
                  className="min-h-[150px]"
                  required
                />
              </div>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Team...
                  </>
                ) : (
                  "Create AI Team"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Existing Teams */}
        <Card>
          <CardHeader>
            <CardTitle>Your Teams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teams.length === 0 ? (
                <p className="text-muted-foreground">No teams created yet.</p>
              ) : (
                teams.map((team) => (
                  <Card key={team.id} className="p-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{team.name}</h3>
                      <p className="text-sm text-muted-foreground">{team.description}</p>
                      
                      <div className="mt-4">
                        <h4 className="font-medium text-sm">Resources:</h4>
                        <ul className="text-sm text-muted-foreground">
                          <li>Compute Credits: {team.compute_credits}</li>
                          <li>Server Hours: {team.server_hours}</li>
                          <li>Billing Tier: {team.billing_tier}</li>
                        </ul>
                      </div>

                      {team.team_roles && team.team_roles.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-medium text-sm">Roles:</h4>
                          <div className="grid gap-2">
                            {team.team_roles.map((role: any) => (
                              <div key={role.id} className="text-sm">
                                <p className="font-medium">{role.name}</p>
                                <p className="text-muted-foreground">{role.description}</p>
                                {role.capabilities && (
                                  <p className="text-xs text-muted-foreground">
                                    Capabilities: {formatCapabilities(role.capabilities)}
                                  </p>
                                )}
                                {role.required_tools && (
                                  <p className="text-xs text-muted-foreground">
                                    Tools: {formatTools(role.required_tools)}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
