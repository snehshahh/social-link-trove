export interface Collection {
  id: string; // UUID
  user_id: string; // UUID
  name: string;
  description?: string;
  shared_with?: string[];
  links: string[];
  isPublic: boolean;
  upvote: number;
  downvote: number;
  created_at: string;
  warning?: string;
}
