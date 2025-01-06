import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { agentService } from "@/services/AgentService";

export const Teams = () => {
  const teams = agentService.getTeams();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Teams</h1>
      
      <div className="grid gap-4 md:grid-cols-2">
        {teams.map((team) => (
          <Card key={team.id}>
            <CardHeader>
              <CardTitle>{team.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Specialization: {team.specialization}
                </p>
                <p className="text-sm">
                  Agents: {team.agents.length}
                </p>
                <p className="text-sm">
                  Orchestrators: {team.orchestrators.length}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};