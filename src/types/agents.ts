export type AgentRole = 
  | 'BROWSER_CONTROLLER'
  | 'VISION_ANALYZER' 
  | 'DATA_PROCESSOR'
  | 'TASK_COORDINATOR'
  | 'RESEARCH_SPECIALIST';

export interface Agent {
  id: string;
  name: string;
  role: AgentRole;
  capabilities: string[];
  status: 'idle' | 'busy' | 'error';
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
}

export interface AgentTeam {
  id: string;
  name: string;
  agents: Agent[];
  specialization: string;
}