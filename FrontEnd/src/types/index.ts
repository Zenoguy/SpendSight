export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  vendor: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  status: 'uploaded' | 'parsing' | 'parsed' | 'error';
}

export type Tier = 'free' | 'smart' | 'business';

export interface TierInfo {
  name: string;
  price: string;
  features: string[];
  uploadLimit: string;
  color: string;
}

export interface CategorySpending {
  category: string;
  amount: number;
  percentage: number;
}

export interface MonthlySpending {
  month: string;
  amount: number;
}

export interface VendorSpending {
  vendor: string;
  amount: number;
  transactions: number;
}