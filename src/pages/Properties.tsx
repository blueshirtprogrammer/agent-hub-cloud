import React, { useEffect } from "react";
import { captureAndAnalyzeScreen } from "@/utils/screenshotAnalysis";
import { useToast } from "@/hooks/use-toast";

export const Properties = () => {
  const { toast } = useToast();

  useEffect(() => {
    const analyzePage = async () => {
      try {
        const analysis = await captureAndAnalyzeScreen('properties-page');
        console.log('Properties analysis:', analysis);
        
        toast({
          title: "UX Analysis Complete",
          description: "The properties page has been analyzed for UX improvements.",
        });
      } catch (error) {
        console.error('Error analyzing properties:', error);
      }
    };

    analyzePage();
  }, []);

  return (
    <div>
      <h1>Properties</h1>
      {/* Add your properties content here */}
    </div>
  );
};
