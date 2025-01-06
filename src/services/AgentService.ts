import { Agent, AgentRole, Task, AgentTeam } from '../types/agents';

class AgentService {
  private agents: Map<string, Agent> = new Map();
  private teams: Map<string, AgentTeam> = new Map();
  private tasks: Map<string, Task> = new Map();

  constructor() {
    this.initializeSuperAgentTeam();
  }

  private initializeSuperAgentTeam() {
    // Create Supervisor
    const supervisor = this.createAgent("SupervisorAgent", "SUPERVISOR", ["task_distribution", "coordination"]);

    // Create Orchestrators
    const browserOrchestrator = this.createAgent("BrowserOrchestrator", "BROWSER_ORCHESTRATOR", ["web_automation"], supervisor.id);
    const visionOrchestrator = this.createAgent("VisionOrchestrator", "VISION_ORCHESTRATOR", ["image_processing"], supervisor.id);
    const dataOrchestrator = this.createAgent("DataOrchestrator", "DATA_ORCHESTRATOR", ["data_management"], supervisor.id);
    const researchOrchestrator = this.createAgent("ResearchOrchestrator", "RESEARCH_ORCHESTRATOR", ["analysis"], supervisor.id);

    // Create Browser Agents
    const browserAgents = Array.from({length: 6}, (_, i) => 
      this.createAgent(`BrowserAgent${i+1}`, "BROWSER_AGENT", ["navigation", "scraping"], browserOrchestrator.id)
    );

    // Create Vision Agents
    const visionAgents = Array.from({length: 3}, (_, i) =>
      this.createAgent(`VisionAgent${i+1}`, "VISION_AGENT", ["ocr", "image_analysis"], visionOrchestrator.id)
    );

    // Create Data Agents
    const dataAgents = Array.from({length: 2}, (_, i) =>
      this.createAgent(`DataAgent${i+1}`, "DATA_AGENT", ["processing", "storage"], dataOrchestrator.id)
    );

    // Create Research Agents
    const researchAgents = Array.from({length: 4}, (_, i) =>
      this.createAgent(`ResearchAgent${i+1}`, "RESEARCH_AGENT", ["analysis", "enrichment"], researchOrchestrator.id)
    );

    // Create Super Agent Team
    const superTeam: AgentTeam = {
      id: crypto.randomUUID(),
      name: "Super Agent Team",
      supervisor: supervisor,
      orchestrators: [browserOrchestrator, visionOrchestrator, dataOrchestrator, researchOrchestrator],
      agents: [...browserAgents, ...visionAgents, ...dataAgents, ...researchAgents],
      specialization: "Real Estate Research and Analysis"
    };

    this.teams.set(superTeam.id, superTeam);
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
