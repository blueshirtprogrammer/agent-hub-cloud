import React, { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { agentService } from "@/services/AgentService";
import { TeamCard } from "@/components/teams/TeamCard";
import { CreateTeamDialog } from "@/components/teams/CreateTeamDialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const Teams = () => {
  const teams = agentService.getTeams();
  const { toast } = useToast();
  const [industry, setIndustry] = useState('real_estate');
  const [region, setRegion] = useState('QLD');
  const [templates, setTemplates] = useState<any[]>([]);

  useEffect(() => {
    fetchTemplates();
  }, [industry, region]);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('industry_templates')
        .select('*')
        .eq('industry', industry);

      if (error) throw error;
      setTemplates(data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast({
        title: "Error",
        description: "Failed to fetch industry templates",
        variant: "destructive",
      });
    }
  };

  const handleTeamCreated = () => {
    fetchTemplates();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your Teams</h1>
        <div className="flex items-center gap-4">
          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="real_estate">Real Estate</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="education">Education</SelectItem>
            </SelectContent>
          </Select>
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="QLD">Queensland</SelectItem>
              <SelectItem value="NSW">New South Wales</SelectItem>
              <SelectItem value="VIC">Victoria</SelectItem>
              <SelectItem value="WA">Western Australia</SelectItem>
              <SelectItem value="SA">South Australia</SelectItem>
              <SelectItem value="TAS">Tasmania</SelectItem>
              <SelectItem value="NT">Northern Territory</SelectItem>
              <SelectItem value="ACT">Australian Capital Territory</SelectItem>
            </SelectContent>
          </Select>
          <CreateTeamDialog onTeamCreated={handleTeamCreated} />
        </div>
      </div>

      <div className="grid gap-6">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
};