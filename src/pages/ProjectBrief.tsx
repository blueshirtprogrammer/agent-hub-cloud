import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ProjectBrief = () => {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project Brief</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="prose prose-sm max-w-none">
              <h2>Product Requirements</h2>
              <ul>
                <li>
                  <strong>AI Agent Management Platform:</strong> A platform for managing AI agents with an admin dashboard.
                </li>
                <li>
                  <strong>Natural Language Team Creation:</strong> Users can describe team needs in plain English to generate team structures and roles.
                </li>
                <li>
                  <strong>Document Management and Automation:</strong> Automate workflows, including document generation and signing management, ensuring compliance with REIQ standards.
                </li>
                <li>
                  <strong>Real Estate Features:</strong> Property listing management, client interaction tracking, and automated photography scheduling.
                </li>
                <li>
                  <strong>Task Management:</strong> Create, assign, and track tasks, including breaking down complex tasks into subtasks.
                </li>
              </ul>

              <h2>Technical Features</h2>
              <ul>
                <li>
                  <strong>Web Scraping and Research:</strong> Gather data from external sources, including a web research agent.
                </li>
                <li>
                  <strong>Integration Management:</strong> Users can describe integration needs in plain English for automatic management.
                </li>
                <li>
                  <strong>Document Processing:</strong> Natural language processing for automating workflows based on user requests.
                </li>
                <li>
                  <strong>Self-Repairing Agent Framework:</strong> Create agents on the fly with internet search capabilities.
                </li>
              </ul>

              <h2>Current Development Focus</h2>
              <ul>
                <li>Implementing comprehensive workflow system for real estate processes</li>
                <li>Enhancing document tracking and management capabilities</li>
                <li>Developing UX/UI design analysis features</li>
                <li>Improving error handling and system reliability</li>
              </ul>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};