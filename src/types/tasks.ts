export interface Task {
  id: string;
  title: string;
  description: string | null;
  priority: 'low' | 'medium' | 'high';
  due_date: string | null;
  status: 'pending' | 'in_progress' | 'completed';
  created_at: string | null;
  updated_at: string | null;
}