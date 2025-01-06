import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Users, BriefcaseIcon, Cpu, Clock, CreditCard } from "lucide-react";
import { agentService } from "@/services/AgentService";

export const Teams = () => {
  const teams = agentService.getTeams();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your Teams</h1>
      </div>
      
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