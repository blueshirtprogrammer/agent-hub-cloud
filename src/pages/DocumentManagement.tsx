import React from "react";
import { DocumentAssistant } from "@/components/teams/DocumentAssistant";
import { DocumentGenerator } from "@/components/teams/DocumentGenerator";
import { DocumentUpload } from "@/components/teams/DocumentUpload";
import { DocumentViewer } from "@/components/teams/DocumentViewer";

export const DocumentManagement = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Document Management</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DocumentAssistant />
        <DocumentGenerator />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <DocumentUpload />
        <DocumentViewer />
      </div>
    </div>
  );
};