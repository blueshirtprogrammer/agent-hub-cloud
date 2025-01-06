import html2canvas from 'html2canvas';
import { supabase } from "@/integrations/supabase/client";

export const captureAndAnalyzeScreen = async (context: string) => {
  try {
    // Capture the entire page
    const canvas = await html2canvas(document.body);
    const screenshot = canvas.toDataURL('image/png');

    // First, store the screenshot
    const { data: captureData, error: captureError } = await supabase.functions.invoke('capture-screenshot', {
      body: { imageData: screenshot, context }
    });

    if (captureError) throw captureError;

    // Then, analyze the screenshot
    const { data: { analysis }, error: analysisError } = await supabase.functions.invoke('analyze-interface', {
      body: { 
        imageData: screenshot, 
        context,
        analysisId: captureData.id 
      }
    });

    if (analysisError) throw analysisError;
    return analysis;
  } catch (error) {
    console.error('Error capturing and analyzing screen:', error);
    throw error;
  }
};