import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users } from "lucide-react";
import { TeamRoleManager } from "./TeamRoleManager";
import { TeamResources } from "./TeamResources";
import { TeamRolesTable } from "./TeamRolesTable";
import type { AgentTeam } from "@/types/agents";

interface TeamCardProps {
  team: AgentTeam;
}

export const TeamCard = ({ team }: TeamCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <CardTitle>{team.name}</CardTitle>
        </div>
        <CardDescription className="mt-2">
          {team.specialization}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <TeamResources 
            computeCredits={team.computeCredits || 5000}
            serverHours={team.serverHours || 200}
            billingTier={team.billingTier || 'pro'}
          />
          
          <TeamRoleManager teamId={team.id} />
          
          <TeamRolesTable agents={team.agents} />
        </div>
      </CardContent>
    </Card>
  );
};