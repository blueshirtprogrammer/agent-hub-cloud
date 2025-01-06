import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface Template {
  id: string;
  name: string;
  description: string | null;
  template_data: {
    stages?: string[];
    required_roles?: string[];
  };
}

interface IndustryContextProps {
  templates: Template[];
  industry: string;
  region: string;
}

export const IndustryContext = ({ templates, industry, region }: IndustryContextProps) => {
  return (
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
  );
};