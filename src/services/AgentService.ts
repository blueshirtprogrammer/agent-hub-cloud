import { Agent, AgentRole, Task, AgentTeam } from '../types/agents';

class AgentService {
  private agents: Map<string, Agent> = new Map();
  private teams: Map<string, AgentTeam> = new Map();
  private tasks: Map<string, Task> = new Map();

  constructor() {
    this.initializeRealEstateTeam();
  }

  private initializeRealEstateTeam() {
    const realEstateTeam: AgentTeam = {
      id: crypto.randomUUID(),
      name: "Real Estate Sales Team",
      specialization: "Automated end-to-end real estate sales process management",
      orchestrators: [
        {
          id: crypto.randomUUID(),
          name: "Process Orchestrator",
          role: "Process management and coordination",
          capabilities: ["workflow_management", "task_distribution", "status_monitoring"],
          status: "idle"
        }
      ],
      agents: [
        {
          id: crypto.randomUUID(),
          name: "Listing Manager",
          role: "Form 6 and document processing",
          capabilities: ["document_processing", "contract_generation", "compliance_checking"],
          status: "idle"
        },
        {
          id: crypto.randomUUID(),
          name: "Photography Coordinator",
          role: "Photo and inspection scheduling",
          capabilities: ["calendar_management", "tenant_communication", "vendor_coordination"],
          status: "idle"
        },
        {
          id: crypto.randomUUID(),
          name: "Marketing Agent",
          role: "Advertisement and portal management",
          capabilities: ["content_creation", "portal_management", "flyer_design"],
          status: "idle"
        },
        {
          id: crypto.randomUUID(),
          name: "Buyer Relations Agent",
          role: "Buyer enquiry and offer management",
          capabilities: ["enquiry_handling", "offer_processing", "viewing_coordination"],
          status: "idle"
        },
        {
          id: crypto.randomUUID(),
          name: "Settlement Coordinator",
          role: "Contract to settlement management",
          capabilities: ["contract_management", "settlement_coordination", "inspection_booking"],
          status: "idle"
        }
      ],
      computeCredits: 10000,
      serverHours: 500,
      billingTier: "professional"
    };

    this.teams.set(realEstateTeam.id, realEstateTeam);
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
    const capabilities = await this.analyzeTaskRequirements(task.description);
    const requiredAgents = this.findSuitableAgents(capabilities);
    
    if (requiredAgents.length > 0) {
      task.assignedAgents = requiredAgents;
      task.status = 'in_progress';
      this.updateTask(task);
      await this.executeTask(task);
    }
  }

  private async analyzeTaskRequirements(description: string): Promise<string[]> {
    if (description.toLowerCase().includes('form 6') || description.toLowerCase().includes('document')) {
      return ['document_processing', 'contract_generation'];
    }
    if (description.toLowerCase().includes('photo') || description.toLowerCase().includes('inspection')) {
      return ['calendar_management', 'vendor_coordination'];
    }
    if (description.toLowerCase().includes('advertis') || description.toLowerCase().includes('market')) {
      return ['content_creation', 'portal_management'];
    }
    if (description.toLowerCase().includes('buyer') || description.toLowerCase().includes('offer')) {
      return ['enquiry_handling', 'offer_processing'];
    }
    if (description.toLowerCase().includes('settlement') || description.toLowerCase().includes('contract')) {
      return ['contract_management', 'settlement_coordination'];
    }
    return ['workflow_management'];
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
