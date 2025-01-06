export type AIModel = {
  id: string;
  name: string;
  capabilities: string[];
  strengths: string[];
  contextWindowSize: number;
  multimodal: boolean;
  maxOutputTokens?: number;
  costPerToken?: number;
};

export const AI_MODELS: Record<string, AIModel> = {
  'gemini-pro-vision': {
    id: 'gemini-pro-vision',
    name: 'Gemini Pro Vision',
    capabilities: ['image_analysis', 'video_analysis', 'multimodal_processing'],
    strengths: ['visual understanding', 'UI analysis', 'multimedia processing'],
    contextWindowSize: 32000,
    multimodal: true,
    maxOutputTokens: 4096
  },
  'gemini-pro': {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    capabilities: ['text_generation', 'analysis', 'summarization'],
    strengths: ['general purpose', 'reliability', 'consistency'],
    contextWindowSize: 32000,
    multimodal: false,
    maxOutputTokens: 2048
  },
  'gemini-ultra': {
    id: 'gemini-ultra',
    name: 'Gemini Ultra',
    capabilities: ['complex_reasoning', 'strategic_planning', 'risk_assessment'],
    strengths: ['detailed analysis', 'step-by-step thinking', 'problem decomposition'],
    contextWindowSize: 128000,
    multimodal: true,
    maxOutputTokens: 4096
  }
};