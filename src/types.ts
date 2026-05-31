export interface Technology {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'mobile' | 'ai-devops';
  description: string;
  logo: string; // Lucide icon identifier
  proCode: string; // example code snippet or feature
  languages: string[];
  features: string[];
}

export interface ProjectInquiry {
  id?: string;
  created_at?: string;
  client_name: string;
  client_email: string;
  company_name?: string;
  project_type: 'mobile' | 'web' | 'desktop' | 'ai' | 'full-stack';
  budget_range: string;
  timeline: string;
  description: string;
  selected_tech: string[];
  status?: 'new' | 'reviewing' | 'contacted' | 'completed';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  type: string;
  tech: string;
  description: string;
}
