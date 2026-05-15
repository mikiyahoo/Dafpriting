export interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  createdAt: string;
  updatedAt: string;
}