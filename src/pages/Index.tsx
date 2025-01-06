import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export default function Index() {
  const [teamName, setTeamName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [teams, setTeams] = useState<any[]>([]);
  const { toast } = useToast();

  // Fetch existing teams
  const fetchTeams = async () => {
    try {
      const { data: agents, error } = await supabase
        .from('agents')
        .select('*')
        .eq('role', 'SUPERVISOR');
      
      if (error) throw error;
      setTeams(agents || []);
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
            name: teamName,
            specialization: specialization
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Super agent team created successfully!",
      });

      // Refresh teams list
      await fetchTeams();

      // Reset form
      setTeamName("");
      setSpecialization("");
    } catch (error) {
      console.error('Error creating team:', error);
      toast({
        title: "Error",
        description: "Failed to create super agent team. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Create Team Form */}
        <Card>
          <CardHeader>
            <CardTitle>Create Super Agent Team</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateTeam} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="teamName">Team Name</Label>
                <Input
                  id="teamName"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter team name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Input
                  id="specialization"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  placeholder="Enter team specialization"
                  required
                />
              </div>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Super Agent Team"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Existing Teams */}
        <Card>
          <CardHeader>
            <CardTitle>Existing Teams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teams.length === 0 ? (
                <p className="text-muted-foreground">No teams created yet.</p>
              ) : (
                teams.map((team) => (
                  <Card key={team.id} className="p-4">
                    <h3 className="font-semibold">{team.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Role: {team.role}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Status: {team.status}
                    </p>
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
