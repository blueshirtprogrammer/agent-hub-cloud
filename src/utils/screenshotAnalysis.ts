import html2canvas from 'html2canvas';
import { supabase } from "@/integrations/supabase/client";

export const captureAndAnalyzeScreen = async (context: string) => {
  try {
    // Capture the entire page
    const canvas = await html2canvas(document.body);
    const screenshot = canvas.toDataURL('image/png');

    // Call the edge function for analysis
    const { data: { analysis }, error } = await supabase.functions.invoke('ux-design-agent', {
      body: { imageData: screenshot, context }
    });

    if (error) throw error;
    return analysis;
  } catch (error) {
    console.error('Error capturing and analyzing screen:', error);
    throw error;
  }
};