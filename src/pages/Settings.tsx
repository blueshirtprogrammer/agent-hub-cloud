import React, { useEffect } from "react";
import { captureAndAnalyzeScreenshot } from "@/utils/screenshotAnalysis";
import { useToast } from "@/hooks/use-toast";
import { PlatformIntegrations } from "@/components/integration/platforms/PlatformIntegrations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const Settings = () => {
  const { toast } = useToast();

  useEffect(() => {
    const analyzePage = async () => {
      try {
        const result = await captureAndAnalyzeScreenshot();
        console.log('Settings analysis:', result);
        
        if (!result.error) {
          toast({
            title: "UX Analysis Complete",
            description: "The settings page has been analyzed for UX improvements.",
          });
        }
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

  const handleSaveChanges = () => {
    toast({
      title: "Changes Saved",
      description: "Your platform integration settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Platform Settings</h1>
          <p className="text-muted-foreground">
            Configure your integrations and platform preferences
          </p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={handleSaveChanges}
                className="bg-primary hover:bg-primary/90 text-white font-semibold"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save all changes</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid gap-6">
        <Card className="border-2 border-primary/10 shadow-lg">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg font-semibold">Integration Hub</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="max-w-4xl mx-auto">
              <PlatformIntegrations onPlatformToggle={handlePlatformToggle} />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end mt-6">
          <Button 
            onClick={handleSaveChanges}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-semibold"
          >
            <Save className="w-4 h-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  );
};