import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Settings2 } from "lucide-react";

interface TeamConfigurationFormProps {
  teamId: string;
  onConfigurationUpdated: () => void;
}

export const TeamConfigurationForm = ({ teamId, onConfigurationUpdated }: TeamConfigurationFormProps) => {
  const [computeCredits, setComputeCredits] = React.useState<number>(1000);
  const [serverHours, setServerHours] = React.useState<number>(100);
  const [billingTier, setBillingTier] = React.useState<'basic' | 'pro' | 'enterprise'>('basic');
  const [isActive, setIsActive] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);
  const { toast } = useToast();

  React.useEffect(() => {
    fetchTeamConfiguration();
  }, [teamId]);

  const fetchTeamConfiguration = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('team_configurations')
        .select('*')
        .eq('id', teamId)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setComputeCredits(data.compute_credits || 1000);
        setServerHours(data.server_hours || 100);
        setBillingTier(data.billing_tier || 'basic');
        setIsActive(data.active !== false);
      } else {
        // If no configuration exists, we'll keep the default values
        toast({
          title: "No configuration found",
          description: "Using default configuration values",
        });
      }
    } catch (error) {
      console.error('Error fetching team configuration:', error);
      toast({
        title: "Error",
        description: "Failed to fetch team configuration",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('team_configurations')
        .upsert({
          id: teamId,
          compute_credits: computeCredits,
          server_hours: serverHours,
          billing_tier: billingTier,
          active: isActive
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Configuration updated",
        description: "Team configuration has been updated successfully."
      });

      onConfigurationUpdated();
    } catch (error) {
      console.error('Error updating team configuration:', error);
      toast({
        title: "Error",
        description: "Failed to update team configuration",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings2 className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg font-semibold">Loading Configuration...</CardTitle>
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Settings2 className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg font-semibold">Team Configuration</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="computeCredits">Compute Credits</Label>
              <Input
                id="computeCredits"
                type="number"
                min={0}
                value={computeCredits}
                onChange={(e) => setComputeCredits(parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serverHours">Server Hours</Label>
              <Input
                id="serverHours"
                type="number"
                min={0}
                value={serverHours}
                onChange={(e) => setServerHours(parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Billing Tier</Label>
            <Select value={billingTier} onValueChange={(value: 'basic' | 'pro' | 'enterprise') => setBillingTier(value)}>
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

          <div className="flex items-center space-x-2">
            <Switch
              id="active"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
            <Label htmlFor="active">Active Team</Label>
          </div>

          <Button type="submit" className="w-full">Save Configuration</Button>
        </form>
      </CardContent>
    </Card>
  );
};
