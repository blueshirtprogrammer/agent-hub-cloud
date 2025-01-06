import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Book, Briefcase, FileText } from "lucide-react";

export const ProjectBrief = () => {
  return (
    <div className="container mx-auto py-6 space-y-8 max-w-5xl">
      <div className="flex items-center gap-2">
        <Book className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Project Brief</h1>
      </div>

      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="space-y-8 pr-4">
          {/* Product Overview */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="h-5 w-5" />
              <h2 className="text-2xl font-semibold">Product Overview</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              An AI Agent Management Platform designed specifically for real estate agencies,
              focusing on automation, document management, and team coordination.
            </p>
            
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-semibold mb-3">Core Features</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>AI Agent Management Dashboard</li>
                  <li>Natural Language Team Creation</li>
                  <li>Document Management and Automation</li>
                  <li>Property Listing Management</li>
                  <li>Task Management System</li>
                  <li>Web Scraping and Research Capabilities</li>
                  <li>Billing and Resource Management</li>
                  <li>Integration Management</li>
                  <li>Reporting and Analytics</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">Technical Specifications</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Frontend: React with TypeScript</li>
                  <li>UI Framework: Tailwind CSS with shadcn/ui</li>
                  <li>Backend: Supabase (Authentication, Database, Storage)</li>
                  <li>State Management: TanStack Query</li>
                  <li>Build Tool: Vite</li>
                </ul>
              </section>
            </div>
          </Card>

          {/* Detailed Requirements */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5" />
              <h2 className="text-2xl font-semibold">Detailed Requirements</h2>
            </div>
            
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-semibold mb-3">Document Management</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Automated workflow management</li>
                  <li>REIQ standards compliance</li>
                  <li>Document generation and signing</li>
                  <li>Real-time status updates</li>
                  <li>Document viewer with download capabilities</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">AI and Automation</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Self-repairing agent framework</li>
                  <li>Natural language processing for document requests</li>
                  <li>UX/UI design analysis agent</li>
                  <li>Web research capabilities</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">Real Estate Features</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Property listing management</li>
                  <li>Client interaction tracking</li>
                  <li>Automated photography scheduling</li>
                  <li>REIQ document processing</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">System Infrastructure</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Enhanced error handling in edge functions</li>
                  <li>Consistent UX analysis panel</li>
                  <li>Role-specific UI enhancements</li>
                  <li>Comprehensive changelog tracking</li>
                </ul>
              </section>
            </div>
          </Card>

          {/* Current Development Status */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Current Development Status</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">In Progress</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Document Assistant component implementation</li>
                  <li>TypeScript error resolution</li>
                  <li>UX/UI design agent development</li>
                  <li>Document path handling improvements</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Planned Features</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Edge Functions performance optimization</li>
                  <li>Enhanced error logging system</li>
                  <li>Comprehensive roadmap implementation</li>
                  <li>Role-specific UI improvements</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProjectBrief;