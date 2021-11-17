export interface IMeal {
  name: string;
  description?: string;
  address?: string;
  isOpen: boolean;
  photos?: string[];
  icon?: string;
  rate?: number;
}
