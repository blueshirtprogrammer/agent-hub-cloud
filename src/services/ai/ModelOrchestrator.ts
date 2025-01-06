import { ModelRouter, TaskContext } from './ModelRouter';
import { supabase } from "@/integrations/supabase/client";

export type ModelResponse = {
  text: string;
  confidence: number;
  metadata?: Record<string, any>;
  error?: string;
};

export class ModelOrchestrator {
  private static instance: ModelOrchestrator;
  private router: ModelRouter;

  private constructor() {
    this.router = ModelRouter.getInstance();
  }

  public static getInstance(): ModelOrchestrator {
    if (!ModelOrchestrator.instance) {
      ModelOrchestrator.instance = new ModelOrchestrator();
    }
    return ModelOrchestrator.instance;
  }

  public async processTask(context: TaskContext): Promise<ModelResponse> {
    try {
      const selectedModel = this.router.selectModel(context);
      console.log(`Selected model for task: ${selectedModel.name}`);

      const { data, error } = await supabase.functions.invoke(
        this.getFunctionName(context.type),
        {
          body: {
            model: selectedModel.id,
            context,
          }
        }
      );

      if (error) throw error;

      return {
        text: data.result,
        confidence: data.confidence || 1.0,
        metadata: data.metadata
      };
    } catch (error) {
      console.error('Error in model orchestration:', error);
      return {
        text: '',
        confidence: 0,
        error: error.message
      };
    }
  }

  private getFunctionName(taskType: TaskType): string {
    const functionMap: Record<TaskType, string> = {
      'visual_analysis': 'analyze-interface',
      'document_processing': 'process-document',
      'complex_reasoning': 'strategic-analysis',
      'real_time_generation': 'generate-content',
      'general_purpose': 'general-task'
    };

    return functionMap[taskType];
  }

  public async analyzeResponse(response: ModelResponse): Promise<{
    success: boolean;
    actionRequired: boolean;
    nextSteps?: string[];
    confidence: number;
  }> {
    if (response.error || !response.text) {
      return {
        success: false,
        actionRequired: true,
        nextSteps: ['Review error and retry', 'Consider different model'],
        confidence: 0
      };
    }

    return {
      success: true,
      actionRequired: response.confidence < 0.8,
      nextSteps: response.confidence < 0.8 ? ['Review output', 'Consider human verification'] : undefined,
      confidence: response.confidence
    };
  }
}