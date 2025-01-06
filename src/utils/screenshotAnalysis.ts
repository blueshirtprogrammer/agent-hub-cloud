import html2canvas from 'html2canvas';
import { supabase } from "@/integrations/supabase/client";

export const captureAndAnalyzeScreen = async (context: string) => {
  try {
    // Capture the entire page
    const canvas = await html2canvas(document.body);
    const screenshot = canvas.toDataURL('image/png');

    // Call the edge function directly
    const { data, error } = await supabase.functions.invoke('analyze-interface', {
      body: { 
        screenshot,
        context
      }
    });

    if (error) {
      console.error('Analysis error:', error);
      throw error;
    }

    if (!data?.analysis) {
      throw new Error('No analysis data received');
    }

    return data.analysis;
  } catch (error) {
    console.error('Error capturing and analyzing screen:', error);
    throw error;
  }
};