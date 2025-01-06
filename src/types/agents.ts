export type AgentRole = 
  | 'SUPERVISOR'
  | 'BROWSER_ORCHESTRATOR'
  | 'VISION_ORCHESTRATOR'
  | 'DATA_ORCHESTRATOR'
  | 'RESEARCH_ORCHESTRATOR'
  | 'BROWSER_AGENT'
  | 'VISION_AGENT'
  | 'DATA_AGENT'
  | 'RESEARCH_AGENT';

export interface Agent {
  id: string;
  name: string;
  role: string;
  capabilities: string[];
  status: 'idle' | 'busy' | 'error';
  parentId?: string;
}

export interface Task {
  id: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  assignedAgents: Agent[];
  priority: 'low' | 'medium' | 'high';
  created: Date;
  updated: Date;
  result?: any;
  subTasks?: Task[];
}

export interface AgentTeam {
  id: string;
  name: string;
  supervisor?: Agent;
  orchestrators: Agent[];
  agents: Agent[];
  specialization: string;
  computeCredits?: number;
  serverHours?: number;
  billingTier?: string;
}