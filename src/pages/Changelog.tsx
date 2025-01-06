import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Bug, 
  Rocket,
  Construction,
  Star
} from "lucide-react";

export const Changelog = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Changelog & Roadmap</h1>
          <p className="text-muted-foreground">Track updates, planned features, and improvements</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-primary" />
              <CardTitle>Roadmap</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                <div className="border-l-2 border-primary pl-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <h3 className="font-semibold">Enhanced UX Analysis</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Implementing comprehensive UX analysis across all pages with role-specific improvements
                  </p>
                  <Badge variant="outline">In Progress</Badge>
                </div>

                <div className="border-l-2 border-muted pl-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Construction className="h-4 w-4 text-blue-500" />
                    <h3 className="font-semibold">Edge Functions Enhancement</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Improving performance, monitoring, and security of Edge Functions
                  </p>
                  <Badge variant="outline">Planned</Badge>
                </div>

                <div className="border-l-2 border-muted pl-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-purple-500" />
                    <h3 className="font-semibold">AI Model Orchestration</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Implementing A/B testing and performance tracking for AI models
                  </p>
                  <Badge variant="outline">Planned</Badge>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <CardTitle>Recent Updates</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                <div className="border-l-2 border-green-500 pl-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <h3 className="font-semibold">UX Analysis Implementation</h3>
                    <Badge>Latest</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Added initial UX analysis capability to the Resources page
                  </p>
                  <div className="text-xs text-muted-foreground">April 15, 2024</div>
                </div>

                <div className="border-l-2 border-yellow-500 pl-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    <h3 className="font-semibold">Document Management Updates</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enhanced document processing and management capabilities
                  </p>
                  <div className="text-xs text-muted-foreground">April 10, 2024</div>
                </div>

                <div className="border-l-2 border-red-500 pl-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Bug className="h-4 w-4 text-red-500" />
                    <h3 className="font-semibold">Bug Fixes</h3>
                  </div>
                  <ul className="text-sm text-muted-foreground list-disc ml-4 space-y-1">
                    <li>Fixed TypeScript errors in Document components</li>
                    <li>Resolved import issues with screenshot analysis</li>
                  </ul>
                  <div className="text-xs text-muted-foreground">April 5, 2024</div>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              <CardTitle>Known Issues</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px] pr-4">
              <div className="space-y-4">
                <div className="border-l-2 border-orange-500 pl-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    <h3 className="font-semibold">Performance Optimization Needed</h3>
                    <Badge variant="destructive">High Priority</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Edge Functions require optimization for better performance and reliability
                  </p>
                </div>

                <div className="border-l-2 border-yellow-500 pl-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                    <h3 className="font-semibold">UI Inconsistencies</h3>
                    <Badge variant="secondary">Medium Priority</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Some pages need UI alignment with the design system
                  </p>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};