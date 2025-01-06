import React, { useEffect } from "react";
import { captureAndAnalyzeScreen } from "@/utils/screenshotAnalysis";
import { useToast } from "@/hooks/use-toast";
import { PlatformIntegrations } from "@/components/integration/platforms/PlatformIntegrations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings2 } from "lucide-react";

export const Settings = () => {
  const { toast } = useToast();

  useEffect(() => {
    const analyzePage = async () => {
      try {
        const analysis = await captureAndAnalyzeScreen('settings-page');
        console.log('Settings analysis:', analysis);
        
        toast({
          title: "UX Analysis Complete",
          description: "The settings page has been analyzed for UX improvements.",
        });
      } catch (error) {
        console.error('Error analyzing settings:', error);
      }
    };

    analyzePage();
  }, []);

  const handlePlatformToggle = (platformIndex: number, integrationIndex: number) => {
    // Handle platform toggle logic
    console.log('Platform toggled:', platformIndex, integrationIndex);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Settings</h1>
      </div>

      <div className="grid gap-6">
        <PlatformIntegrations onPlatformToggle={handlePlatformToggle} />
      </div>
    </div>
  );
};