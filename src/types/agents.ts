export type AgentRole = 
  | 'SUPERVISOR'
  | 'PROCESS_ORCHESTRATOR'
  | 'LISTING_MANAGER'
  | 'PHOTOGRAPHY_COORDINATOR'
  | 'MARKETING_AGENT'
  | 'BUYER_RELATIONS_AGENT'
  | 'SETTLEMENT_COORDINATOR';

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