import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, BriefcaseIcon, Cpu, Clock, CreditCard } from "lucide-react";
import { agentService } from "@/services/AgentService";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const Teams = () => {
  const teams = agentService.getTeams();
  const { toast } = useToast();
  const [industry, setIndustry] = useState('real_estate');
  const [region, setRegion] = useState('QLD');
  const [templates, setTemplates] = useState<any[]>([]);
  const [context, setContext] = useState<any>(null);

  useEffect(() => {
    fetchBusinessContext();
    fetchTemplates();
  }, [industry, region]);

  const fetchBusinessContext = async () => {
    try {
      const { data, error } = await supabase
        .from('business_context')
        .select('*')
        .eq('industry', industry)
        .eq('region', region)
        .single();

      if (error) throw error;
      setContext(data);
    } catch (error) {
      console.error('Error fetching business context:', error);
      toast({
        title: "Error",
        description: "Failed to fetch business context",
        variant: "destructive",
      });
    }
  };

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

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your Teams</h1>
        <div className="flex gap-4">
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
        </div>
      </div>
      
      {/* Industry Context Card */}
      {context && (
        <Card>
          <CardHeader>
            <CardTitle>Industry Context</CardTitle>
            <CardDescription>
              Specific context for {industry} in {region}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {templates.map((template) => (
                <Card key={template.id} className="p-4">
                  <h3 className="font-semibold">{template.name}</h3>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                  {template.template_data.stages && (
                    <div className="mt-2">
                      <h4 className="text-sm font-medium">Process Stages:</h4>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        {template.template_data.stages.map((stage: string) => (
                          <li key={stage}>{stage.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {template.template_data.required_roles && (
                    <div className="mt-2">
                      <h4 className="text-sm font-medium">Required Roles:</h4>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        {template.template_data.required_roles.map((role: string) => (
                          <li key={role}>{role.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Teams Section */}
      <div className="grid gap-6">
        {teams.map((team) => (
          <Card key={team.id} className="w-full">
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
                {/* Resources Section */}
                <div>
                  <h3 className="text-sm font-medium mb-4">Resources</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6 flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Compute Credits</p>
                          <p className="text-2xl font-bold">{team.computeCredits || 5000}</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Server Hours</p>
                          <p className="text-2xl font-bold">{team.serverHours || 200}</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6 flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Billing Tier</p>
                          <p className="text-2xl font-bold capitalize">{team.billingTier || 'pro'}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Roles Section */}
                <div>
                  <h3 className="text-sm font-medium mb-4">Roles</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Role</TableHead>
                        <TableHead>Responsibilities</TableHead>
                        <TableHead>Capabilities</TableHead>
                        <TableHead>Tools</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {team.agents.map((agent) => (
                        <TableRow key={agent.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
                              {agent.name}
                            </div>
                          </TableCell>
                          <TableCell>{agent.role}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {agent.capabilities.map((capability, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs"
                                >
                                  {capability}
                                </span>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {agent.capabilities.map((tool, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs"
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
