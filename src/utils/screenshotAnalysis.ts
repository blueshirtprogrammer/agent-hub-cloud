import html2canvas from 'html2canvas';
import { supabase } from "@/integrations/supabase/client";

interface AnalysisResult {
  analysis?: string;
  error?: string;
}

export const captureAndAnalyzeScreenshot = async (): Promise<AnalysisResult> => {
  try {
    // Capture the entire page
    const canvas = await html2canvas(document.body);
    const screenshot = canvas.toDataURL('image/png');

    if (!screenshot.startsWith('data:image/png;base64,')) {
      throw new Error('Invalid screenshot format');
    }

    console.log('Screenshot captured, sending to analysis...');

    // Call the edge function
    const { data, error } = await supabase.functions.invoke('analyze-interface', {
      body: { 
        screenshot,
        context: window.location.pathname.slice(1) || 'home'
      }
    });

    if (error) {
      console.error('Error from edge function:', error);
      throw new Error(error.message || 'Failed to analyze interface');
    }

    if (!data?.analysis) {
      throw new Error('No analysis received from the server');
    }

    return { analysis: data.analysis };
  } catch (error) {
    console.error('Screenshot analysis error:', error);
    return { 
      error: error instanceof Error ? error.message : 'Failed to analyze interface'
    };
  }
};