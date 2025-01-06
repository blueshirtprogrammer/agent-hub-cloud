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
  role: AgentRole;
  capabilities: string[];
  status: 'idle' | 'busy' | 'error';
  parentId?: string; // Reference to orchestrator or supervisor
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
  subTasks?: Task[]; // For breaking down complex tasks
}

export interface AgentTeam {
  id: string;
  name: string;
  supervisor?: Agent;
  orchestrators: Agent[];
  agents: Agent[];
  specialization: string;
}