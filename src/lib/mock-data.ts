import { Pool, Lawyer, Auction } from '@/types';

export const mockLawyers: Lawyer[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    address: '0x1234...5678',
    successFee: 0.15,
    rating: 4.8,
    casesWon: 23,
    specialization: 'Tax Fraud',
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    address: '0xabcd...efgh',
    successFee: 0.20,
    rating: 4.6,
    casesWon: 31,
    specialization: 'Corporate Whistleblowing',
  },
  {
    id: '3',
    name: 'Jennifer Wu',
    address: '0x9876...5432',
    successFee: 0.18,
    rating: 4.9,
    casesWon: 18,
    specialization: 'IRS Compliance',
  },
];

export const mockPools: Pool[] = [
  {
    id: '1',
    name: 'FraudCorp Tax Evasion',
    description: 'Evidence of systematic tax avoidance practices',
    creator: '0xanonymous',
    shards: [],
    strength: 0,
    threshold: 75,
    status: 'active',
    createdAt: Date.now() - 86400000,
  },
  {
    id: '2',
    name: 'Shell Company Network',
    description: 'Offshore shell company schemes',
    creator: '0xanonymous',
    shards: [],
    strength: 0,
    threshold: 80,
    status: 'active',
    createdAt: Date.now() - 172800000,
  },
  {
    id: '3',
    name: 'Payroll Fraud Scheme',
    description: 'Misclassification of employees',
    creator: '0xanonymous',
    shards: [],
    strength: 0,
    threshold: 70,
    status: 'active',
    createdAt: Date.now() - 259200000,
  },
];

export const mockAuctions: Auction[] = [];