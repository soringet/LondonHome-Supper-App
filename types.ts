
export type ServiceCategory = 
  | 'CLEANING' 
  | 'HANDYMAN' 
  | 'BEAUTY' 
  | 'LAUNDRY' 
  | 'MAINTENANCE' 
  | 'PETS' 
  | 'WELLNESS' 
  | 'CAR_CARE'
  | 'CHILDCARE'
  | 'TUTORING'
  | 'CONCIERGE';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  price: number;
  unit: 'hour' | 'fixed' | 'item' | 'day';
  image: string;
  isRecurring?: boolean;
  requiresVetting?: boolean;
}

export type BookingStatus = 'PENDING' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  status: BookingStatus;
  totalPrice: number;
  address: string;
  providerId?: string;
  providerName?: string;
  providerAvatar?: string;
  eta?: string;
  isRecurring?: boolean;
}

export interface Transaction {
  id: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  description: string;
  date: string;
}

export interface UserProfile {
  name: string;
  membership: 'BASIC' | 'GOLD';
  walletBalance: number;
  points: number;
  transactions: Transaction[];
}

export type AppView = 'USER' | 'PROVIDER' | 'ADMIN';
export type CustomerTab = 'DISCOVER' | 'WALLET' | 'TASKS' | 'PROFILE';
