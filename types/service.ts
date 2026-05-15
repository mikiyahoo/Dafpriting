export interface ServiceRecord {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}