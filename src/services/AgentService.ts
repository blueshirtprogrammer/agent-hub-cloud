import { Agent, AgentRole, Task, AgentTeam } from '../types/agents';

class AgentService {
  private agents: Map<string, Agent> = new Map();
  private teams: Map<string, AgentTeam> = new Map();
  private tasks: Map<string, Task> = new Map();

  constructor() {
    this.initializeRealEstateTeam();
    this.initializeIntegrationTeam();
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

  private initializeIntegrationTeam() {
    const integrationTeam: AgentTeam = {
      id: crypto.randomUUID(),
      name: "Integration Research & Development Team",
      specialization: "Automated tool integration and API implementation",
      orchestrators: [
        {
          id: crypto.randomUUID(),
          name: "Integration Orchestrator",
          role: "Integration workflow management and coordination",
          capabilities: ["workflow_management", "task_distribution", "integration_planning"],
          status: "idle"
        }
      ],
      agents: [
        {
          id: crypto.randomUUID(),
          name: "API Documentation Researcher",
          role: "Research and analyze API documentation",
          capabilities: ["web_scraping", "documentation_analysis", "api_specification_extraction"],
          status: "idle"
        },
        {
          id: crypto.randomUUID(),
          name: "Integration Developer",
          role: "Implement and test integrations",
          capabilities: ["api_integration", "webhook_setup", "authentication_management"],
          status: "idle"
        },
        {
          id: crypto.randomUUID(),
          name: "Tool Database Manager",
          role: "Maintain tool database and assign capabilities",
          capabilities: ["database_management", "capability_mapping", "integration_testing"],
          status: "idle"
        }
      ],
      computeCredits: 15000,
      serverHours: 750,
      billingTier: "professional"
    };

    this.teams.set(integrationTeam.id, integrationTeam);
  }

  async analyzeIntegrationRequest(description: string) {
    console.log('Analyzing integration request:', description);
    
    const capabilities = await this.analyzeToolRequirements(description);
    const integrationTeam = Array.from(this.teams.values())
      .find(team => team.name === "Integration Research & Development Team");
      
    if (!integrationTeam) {
      throw new Error("Integration team not found");
    }

    const task = await this.createTask(description, 'high');
    
    // Assign to researcher first
    const researcher = integrationTeam.agents.find(
      agent => agent.role.includes("Research")
    );
    if (researcher) {
      task.assignedAgents = [researcher];
      this.updateTask(task);
    }

    return {
      task,
      team: integrationTeam,
      capabilities
    };
  }

  private async analyzeToolRequirements(description: string): Promise<string[]> {
    // Extract key integration requirements from the description
    const requirements: string[] = [];
    
    if (description.toLowerCase().includes('email')) {
      requirements.push('email_integration');
    }
    if (description.toLowerCase().includes('report')) {
      requirements.push('reporting');
    }
    if (description.toLowerCase().includes('zapier')) {
      requirements.push('zapier_integration');
    }
    if (description.toLowerCase().includes('api')) {
      requirements.push('direct_api_integration');
    }
    
    return requirements;
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
