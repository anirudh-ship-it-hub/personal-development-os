export interface Project {
  id: string;
  user_id: string;

  title: string;
  description?: string;

  project_type: string;
  mission_type?: string;

  current_state?: string;
  target_state?: string;

  target_date?: string;

  status?: string;

  level?: number;
  progress?: number;

  xp_reward?: number;

  created_at?: string;
}

export interface FocusArea {
  id: string;
  project_id: string;

  name: string;
  description?: string;

  level?: number;
  progress?: number;
}

export interface Habit {
  id: string;
  focus_area_id: string;

  name: string;
  description?: string;

  habit_type?: string;

  target_frequency: string;

  active: boolean;

  xp_reward?: number;
}

export interface XPLog {
  id: string;

  user_id: string;

  xp_earned: number;

  source: string;

  source_id?: string;

  created_at?: string;
}