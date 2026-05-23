export interface PortfolioItemRecord {
  id: string;
  title: string;
  description: string | null;
  coverImage: string | null;
  category: string;
  itemType: string;
  clientName: string | null;
  featured: boolean;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  images: PortfolioImageRecord[];
  _count?: { images: number };
}

export interface PortfolioImageRecord {
  id: string;
  portfolioItemId: string;
  imageUrl: string;
  caption: string | null;
  sortOrder: number;
}