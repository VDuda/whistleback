export interface Shard {
  id: string;
  hash: string;
  poolId: string;
  uploader: string;
  proof: any;
  encryptedData: string;
  timestamp: number;
  credibilityScore: number;
}

export interface Pool {
  id: string;
  name: string;
  description: string;
  creator: string;
  shards: Shard[];
  strength: number; // 0-100
  threshold: number; // Threshold for lawyer auction
  status: 'active' | 'auction' | 'filing' | 'closed';
  createdAt: number;
  tokens?: string[]; // Story Protocol token addresses
  winner?: string; // Winning lawyer
}

export interface Lawyer {
  id: string;
  name: string;
  address: string;
  successFee: number; // percentage
  rating: number;
  casesWon: number;
  specialization: string;
}

export interface NarrativeToken {
  id: string;
  poolId: string;
  shardHash: string;
  metadata: {
    name: string;
    attributes: Record<string, any>;
  };
  royalties: number;
  owner: string;
}

export interface Auction {
  id: string;
  poolId: string;
  status: 'open' | 'closed';
  bids: Bid[];
  winner?: string;
  endTime: number;
}

export interface Bid {
  lawyerId: string;
  fee: number;
  timestamp: number;
}

export interface Filing {
  id: string;
  poolId: string;
  lawyerId: string;
  status: 'draft' | 'submitted' | 'accepted' | 'rejected';
  form211Data: any;
  submittedAt?: number;
  awardAmount?: number;
}