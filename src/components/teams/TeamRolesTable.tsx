import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { BriefcaseIcon } from "lucide-react";
import type { Agent } from "@/types/agents";

interface TeamRolesTableProps {
  agents: Agent[];
}

export const TeamRolesTable = ({ agents }: TeamRolesTableProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-4">Current Roles</h3>
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
          {agents.map((agent) => (
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
  );
};