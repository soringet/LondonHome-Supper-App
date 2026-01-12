
import { Service } from './types';

export const LONDON_SERVICES: Service[] = [
  // Phase 1 & 2: Essentials
  {
    id: 'c1',
    name: 'Regular Cleaning',
    category: 'CLEANING',
    description: 'Weekly home maintenance.',
    price: 18,
    unit: 'hour',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695ce6958?auto=format&fit=crop&q=80&w=400',
    isRecurring: true
  },
  {
    id: 'l1',
    name: 'Laundry & Ironing',
    category: 'LAUNDRY',
    description: 'Collection & delivery next day.',
    price: 25,
    unit: 'fixed',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&q=80&w=400',
    isRecurring: true
  },
  // Phase 3: Home Maintenance
  {
    id: 'm1',
    name: 'Boiler Service',
    category: 'MAINTENANCE',
    description: 'Gas Safe registered annual check.',
    price: 85,
    unit: 'fixed',
    image: 'https://images.unsplash.com/photo-1585011664466-b7bbe92f34ef?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'm2',
    name: 'Appliance Repair',
    category: 'MAINTENANCE',
    description: 'Washing machines, fridges, ovens.',
    price: 60,
    unit: 'fixed',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=400'
  },
  // Phase 4: Lifestyle & Education
  {
    id: 'ch1',
    name: 'Verified Childcare',
    category: 'CHILDCARE',
    description: 'Enhanced DBS checked nannies.',
    price: 18,
    unit: 'hour',
    image: 'https://images.unsplash.com/photo-1587653263995-422546a72569?auto=format&fit=crop&q=80&w=400',
    requiresVetting: true
  },
  {
    id: 't1',
    name: 'Maths Tutoring',
    category: 'TUTORING',
    description: 'GCSE & A-Level specialists.',
    price: 35,
    unit: 'hour',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da07bb5e?auto=format&fit=crop&q=80&w=400'
  },
  // Phase 5: City Super-App
  {
    id: 'v1',
    name: 'Full Valet',
    category: 'CAR_CARE',
    description: 'Premium mobile car cleaning.',
    price: 45,
    unit: 'fixed',
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'err1',
    name: 'Personal Errands',
    category: 'CONCIERGE',
    description: 'Shopping, pickups, or waiting.',
    price: 22,
    unit: 'hour',
    image: 'https://images.unsplash.com/photo-1534452286302-2f5630b6039e?auto=format&fit=crop&q=80&w=400'
  }
];

export const MOCK_PROVIDERS = [
  { id: 'p1', name: 'John Smith', rating: 4.9, category: 'HANDYMAN', verified: true, avatar: 'https://i.pravatar.cc/150?u=p1' },
  { id: 'p2', name: 'Maria Gomez', rating: 4.8, category: 'CLEANING', verified: true, avatar: 'https://i.pravatar.cc/150?u=p2' },
  { id: 'p4', name: 'Dr. Sarah Lane', rating: 5.0, category: 'TUTORING', verified: true, avatar: 'https://i.pravatar.cc/150?u=p4' },
];
