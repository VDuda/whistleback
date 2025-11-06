// Constellation Network Integration
// Supports both mock and real implementations

import { Pool, Shard, Company } from '@/types';
import { mockPools } from './mock-data';

// Lazy load real client
let RealConstellationClient: any = null;
try {
  RealConstellationClient = require('./constellation-real').RealConstellationClient;
} catch (error) {
  console.warn('⚠️  Real Constellation client not available (constellation-real.ts not found or error loading)');
  RealConstellationClient = null;
}

export const CONSTELLATION_CONFIG = {
  // Set to 'real' to use Constellation TestNet
  // Set to 'mock' to use mock implementation
  mode: (process.env.CONSTELLATION_MODE || 'mock') as 'mock' | 'real',

  // TestNet configuration
  testnet: {
    l0Url: 'https://l0-lb-testnet.constellationnetwork.io',
    l1Url: 'https://l0-lb-testnet.constellationnetwork.io',
  },
};

// Simulated Metagraph pool operations
export class ConstellationClient {
  private pools: Map<string, Pool> = new Map();

  private realClient: any = null;

  constructor() {
    // Decide which client to use
    if (CONSTELLATION_CONFIG.mode === 'real' && RealConstellationClient) {
      try {
        this.realClient = new RealConstellationClient();
        console.log('🚀 Using REAL Constellation TestNet integration');
      } catch (error) {
        console.error('❌ Failed to initialize real Constellation client:', error);
        console.log('🎭 Falling back to MOCK Constellation client');
      }
    }

    // If no real client, use mock
    if (!this.realClient) {
      console.log('🎭 Initializing Constellation client (Mock)');
      mockPools.forEach(pool => {
        this.pools.set(pool.id, pool);
      });
      console.log(`Loaded ${mockPools.length} mock pools into Constellation client`);
    }
  }

  async createPool(poolId: string, creator: string, company: Company, name: string, description: string, threshold: number = 75): Promise<string> {
    // Use real client if available
    if (this.realClient) {
      return this.realClient.createPool(poolId, creator, company, name, description, threshold);
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const pool: Pool = {
      id: poolId,
      name,
      description,
      company,
      creator,
      shards: [],
      strength: 0,
      threshold,
      status: 'active',
      createdAt: Date.now(),
    };

    this.pools.set(poolId, pool);
    return poolId;
  }

  async addShard(poolId: string, shard: Omit<Shard, 'id'>): Promise<string> {
    // Use real client if available
    if (this.realClient) {
      return this.realClient.addShard(poolId, shard);
    }

    await new Promise(resolve => setTimeout(resolve, 300));

    const pool = this.pools.get(poolId);
    if (!pool) {
      throw new Error('Pool not found');
    }

    const newShard: Shard = {
      ...shard,
      id: `shard-${Date.now()}`,
    };

    pool.shards.push(newShard);
    pool.strength = Math.min(100, pool.shards.length * 15); // Simple strength calculation

    return newShard.id;
  }

  async getPoolState(poolId: string): Promise<Pool> {
    // Use real client if available
    if (this.realClient) {
      return this.realClient.getPoolState(poolId);
    }

    await new Promise(resolve => setTimeout(resolve, 200));

    const pool = this.pools.get(poolId);
    if (!pool) {
      throw new Error('Pool not found');
    }

    return { ...pool };
  }

  async submitTransaction(data: any): Promise<string> {
    // Use real client if available
    if (this.realClient) {
      return this.realClient.submitTransaction(data);
    }

    // Simulate feeless transaction
    await new Promise(resolve => setTimeout(resolve, 400));
    return `tx-${Date.now()}`;
  }

  async queryNetwork(query: string): Promise<any> {
    // Use real client if available
    if (this.realClient) {
      return this.realClient.queryNetwork(query);
    }

    // Simulate network query
    await new Promise(resolve => setTimeout(resolve, 300));
    return { result: 'Mock network response' };
  }

  /**
   * Get client status
   */
  getStatus() {
    if (this.realClient) {
      return {
        mode: 'real',
        ...this.realClient.getStatus(),
      };
    }
    return {
      mode: 'mock',
      connected: false,
    };
  }
}

export const constellationClient = new ConstellationClient();