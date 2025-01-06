import { Agent, AgentRole, Task, AgentTeam } from '../types/agents';

class AgentService {
  private agents: Map<string, Agent> = new Map();
  private teams: Map<string, AgentTeam> = new Map();
  private tasks: Map<string, Task> = new Map();

  constructor() {
    this.initializeSuperAgentTeam();
  }

  private initializeSuperAgentTeam() {
    // Create Sales Team
    const salesTeam: AgentTeam = {
      id: crypto.randomUUID(),
      name: "Sales Team",
      specialization: "This team is responsible for generating and closing sales opportunities and managing customer relationships.",
      orchestrators: [],
      agents: [
        {
          id: crypto.randomUUID(),
          name: "Sales Manager",
          role: "Team management and development",
          capabilities: ["Team management", "Sales forecasting", "Performance analysis"],
          status: "idle"
        },
        {
          id: crypto.randomUUID(),
          name: "Sales Representative",
          role: "Lead prospecting and closing",
          capabilities: ["Lead generation", "Sales presentations", "Negotiation"],
          status: "idle"
        }
      ],
      computeCredits: 5000,
      serverHours: 200,
      billingTier: "pro"
    };

    this.teams.set(salesTeam.id, salesTeam);
  }

  createAgent(name: string, role: AgentRole, capabilities: string[], parentId?: string): Agent {
    const agent: Agent = {
      id: crypto.randomUUID(),
      name,
      role,
      capabilities,
      status: 'idle',
      parentId
    };
    this.agents.set(agent.id, agent);
    return agent;
  }

  createTeam(name: string, specialization: string, agents: Agent[]): AgentTeam {
    const team: AgentTeam = {
      id: crypto.randomUUID(),
      name,
      agents,
      specialization,
      orchestrators: [], // Add the required orchestrators property
    };
    this.teams.set(team.id, team);
    return team;
  }

  async createTask(description: string, priority: Task['priority'] = 'medium'): Promise<Task> {
    const task: Task = {
      id: crypto.randomUUID(),
      description,
      status: 'pending',
      assignedAgents: [],
      priority,
      created: new Date(),
      updated: new Date()
    };
    
    this.tasks.set(task.id, task);
    await this.analyzeAndAssignTask(task);
    return task;
  }

  private async analyzeAndAssignTask(task: Task) {
    // Determine required capabilities based on task description
    const capabilities = await this.analyzeTaskRequirements(task.description);
    
    // Find suitable agents
    const requiredAgents = this.findSuitableAgents(capabilities);
    
    if (requiredAgents.length > 0) {
      task.assignedAgents = requiredAgents;
      task.status = 'in_progress';
      this.updateTask(task);
      await this.executeTask(task);
    }
  }

  private async analyzeTaskRequirements(description: string): Promise<string[]> {
    // This would use NLP to determine required capabilities
    // For now, returning mock capabilities
    if (description.toLowerCase().includes('web') || description.toLowerCase().includes('screenshot')) {
      return ['browser_control', 'screenshot'];
    }
    if (description.toLowerCase().includes('ocr') || description.toLowerCase().includes('image')) {
      return ['vision', 'ocr'];
    }
    return ['research'];
  }

  private findSuitableAgents(requiredCapabilities: string[]): Agent[] {
    const suitableAgents: Agent[] = [];
    
    for (const agent of this.agents.values()) {
      if (agent.status === 'idle' && 
          requiredCapabilities.some(cap => agent.capabilities.includes(cap))) {
        suitableAgents.push(agent);
      }
    }
    
    return suitableAgents;
  }

  private async executeTask(task: Task) {
    try {
      // Simulate task execution
      console.log(`Executing task: ${task.description}`);
      console.log(`Assigned agents: ${task.assignedAgents.map(a => a.name).join(', ')}`);
      
      // Update task status
      task.status = 'completed';
      this.updateTask(task);
    } catch (error) {
      task.status = 'failed';
      this.updateTask(task);
      console.error(`Task execution failed: ${error}`);
    }
  }

  private updateTask(task: Task) {
    task.updated = new Date();
    this.tasks.set(task.id, task);
  }

  // Updated getters
  getAgents(): Agent[] {
    return Array.from(this.agents.values());
  }

  getTeams(): AgentTeam[] {
    return Array.from(this.teams.values());
  }

  getTasks(): Task[] {
    return Array.from(this.tasks.values());
  }

  getAgentsByRole(role: AgentRole): Agent[] {
    return this.getAgents().filter(agent => agent.role === role);
  }

  getAgentsByParent(parentId: string): Agent[] {
    return this.getAgents().filter(agent => agent.parentId === parentId);
  }
}

export const agentService = new AgentService();
