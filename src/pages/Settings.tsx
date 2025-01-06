import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";

interface TeamConfiguration {
  id: string;
  name: string;
  description: string | null;
  billing_tier: string;
  compute_credits: number;
  server_hours: number;
  active: boolean;
}

export const Settings = () => {
  const { data: config, isLoading, error } = useQuery({
    queryKey: ['team-configuration'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_configurations')
        .select('*')
        .limit(1)
        .single();

      if (error) throw error;
      return data as TeamConfiguration;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load settings. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Team Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold">{config?.name}</h3>
            {config?.description && (
              <p className="text-sm text-muted-foreground">
                {config.description}
              </p>
            )}
            <div className="flex items-center gap-2">
              <Badge variant={config?.active ? 'default' : 'secondary'}>
                {config?.billing_tier}
              </Badge>
              <Badge variant={config?.active ? 'default' : 'secondary'}>
                {config?.active ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Compute Credits</span>
                <span className="text-sm text-muted-foreground">
                  {config?.compute_credits} credits
                </span>
              </div>
              <Progress value={config?.compute_credits} max={1000} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Server Hours</span>
                <span className="text-sm text-muted-foreground">
                  {config?.server_hours} hours
                </span>
              </div>
              <Progress value={config?.server_hours} max={100} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};