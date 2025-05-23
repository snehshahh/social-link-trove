export interface Link {
  id: string; // UUID
  user_id: string; // UUID
  url: string;
  title?: string;
  description?: string;
  tags?: string[];
  shared_with?: string[];
  bool_imp: boolean;
  isPublic: boolean;
  upvote: number;
  downvote: number;
  created_at: string;
  warning?: string;
}
