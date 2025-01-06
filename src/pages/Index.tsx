import React from "react";
import { TeamCard } from "@/components/teams/TeamCard";
import { agentService } from "@/services/AgentService";

const Index = () => {
  const teams = agentService.getTeams();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Agent Teams</h1>
      
      <div className="grid gap-6">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
};

export default Index;