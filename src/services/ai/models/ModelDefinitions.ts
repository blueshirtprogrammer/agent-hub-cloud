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
  'gemini-2.0-flash-thinking': {
    id: 'gemini-2.0-flash-thinking-exp-1219',
    name: 'Gemini 2.0 Flash Thinking',
    capabilities: ['complex_reasoning', 'strategic_planning', 'risk_assessment'],
    strengths: ['detailed analysis', 'step-by-step thinking', 'problem decomposition'],
    contextWindowSize: 128000,
    multimodal: false,
    maxOutputTokens: 4096
  },
  'gemini-2.0-flash': {
    id: 'gemini-2.0-flash-exp',
    name: 'Gemini 2.0 Flash',
    capabilities: ['real_time_processing', 'tool_integration', 'content_generation'],
    strengths: ['speed', 'accuracy', 'integration'],
    contextWindowSize: 128000,
    multimodal: true,
    maxOutputTokens: 4096
  },
  'gemini-base': {
    id: 'gemini-exp-1206',
    name: 'Gemini Base',
    capabilities: ['text_generation', 'analysis', 'summarization'],
    strengths: ['general purpose', 'reliability', 'consistency'],
    contextWindowSize: 32000,
    multimodal: false,
    maxOutputTokens: 2048
  },
  'learnlm-vision': {
    id: 'learnlm-1.5-pro-experimental',
    name: 'LearnLM Vision',
    capabilities: ['image_analysis', 'video_analysis', 'multimodal_processing'],
    strengths: ['visual understanding', 'UI analysis', 'multimedia processing'],
    contextWindowSize: 32000,
    multimodal: true,
    maxOutputTokens: 4096
  }
};