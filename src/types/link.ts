
export interface Link {
  id: string;
  url: string;
  title: string;
  description?: string;
  notes?: string;
  favicon?: string;
  isImportant: boolean;
  isPublic: boolean;
  dateAdded: string;
}
