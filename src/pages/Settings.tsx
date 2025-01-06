import React, { useEffect } from "react";
import { captureAndAnalyzeScreen } from "@/utils/screenshotAnalysis";
import { useToast } from "@/hooks/use-toast";

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

  return (
    <div>
      <h1 className="text-2xl font-semibold">Settings</h1>
      {/* Add your settings content here */}
    </div>
  );
};
