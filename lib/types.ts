export interface Mission {
  id: string;
  title: string;
  status: 'backlog' | 'today' | 'in_progress' | 'done';
  type: 'write' | 'publish' | 'seo' | 'distribution' | 'build' | 'other';
  priority: 'low' | 'medium' | 'high';
  expectedImpact: {
    visitsPerMonth: number;
    revenueUsdPerMonth: number;
  };
  dueDate?: string;
  createdAt: string;
  tags: string[];
  subtasks: {
    id: string;
    text: string;
    done: boolean;
  }[];
  notes?: string;
}

export interface MissionFilters {
  search: string;
  statuses: string[];
  priorities: string[];
  types: string[];
  tags: string[];
  dateRange: {
    start?: string;
    end?: string;
  };
}

export type ViewMode = 'table' | 'kanban';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}