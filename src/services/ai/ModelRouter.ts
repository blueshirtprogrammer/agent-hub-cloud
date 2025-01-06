import { AIModel, AI_MODELS } from './models/ModelDefinitions';

export type TaskType = 
  | 'document_processing'
  | 'visual_analysis'
  | 'complex_reasoning'
  | 'real_time_generation'
  | 'general_purpose';

export type TaskContext = {
  type: TaskType;
  priority: 'low' | 'medium' | 'high';
  requiresMultimodal: boolean;
  complexityLevel: 'simple' | 'moderate' | 'complex';
  input: {
    text?: string;
    images?: string[];
    video?: string;
  };
};

export class ModelRouter {
  private static instance: ModelRouter;

  private constructor() {}

  public static getInstance(): ModelRouter {
    if (!ModelRouter.instance) {
      ModelRouter.instance = new ModelRouter();
    }
    return ModelRouter.instance;
  }

  public selectModel(context: TaskContext): AIModel {
    const { type, requiresMultimodal, complexityLevel } = context;

    // First, filter by basic requirements
    let eligibleModels = Object.values(AI_MODELS).filter(model => {
      if (requiresMultimodal && !model.multimodal) return false;
      return true;
    });

    // Then, select based on task type and complexity
    switch (type) {
      case 'visual_analysis':
        return AI_MODELS['learnlm-vision'];

      case 'complex_reasoning':
        return complexityLevel === 'complex' 
          ? AI_MODELS['gemini-2.0-flash-thinking']
          : AI_MODELS['gemini-2.0-flash'];

      case 'real_time_generation':
        return AI_MODELS['gemini-2.0-flash'];

      case 'document_processing':
        return complexityLevel === 'complex'
          ? AI_MODELS['gemini-2.0-flash']
          : AI_MODELS['gemini-base'];

      default:
        return AI_MODELS['gemini-base'];
    }
  }
}