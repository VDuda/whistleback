// Constellation Network Integration
// Supports both mock and real implementations

import { Pool, Shard, Company } from '@/types';
import { mockPools } from './mock-data';

// Real client will be loaded dynamically

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

/**
 * Get the current mode for Constellation
 * Priority: localStorage (slider) > env var
 * Default: 'mock' (safe default)
 */
function getConstellationMode(): 'mock' | 'real' {
  // Client-side: Check localStorage first (controlled by slider)
  if (typeof window !== 'undefined') {
    const savedMode = localStorage.getItem('whistleback-mode') as 'mock' | 'real' | null;
    // Only use 'real' if explicitly saved in localStorage
    if (savedMode === 'real') {
      return 'real';
    }
    // Any other value (null, 'mock', undefined) defaults to 'mock'
    return 'mock';
  }

  // Server-side: ALWAYS default to 'mock' for safety
  // The slider controls everything - server should never force real mode
  console.log('🔒 Server-side: defaulting to mock mode (use slider to enable real)');
  return 'mock';
}

// Simulated Metagraph pool operations
export class ConstellationClient {
  private pools: Map<string, Pool> = new Map();
  private realClient: any = null;
  private initialized: boolean = false;

  constructor() {
    // Initialize lazily
  }

  private async ensureInitialized() {
    if (this.initialized) return;

    const currentMode = getConstellationMode();

    // Decide which client to use
    if (currentMode === 'real') {
      try {
        // Dynamic import to load TypeScript module
        // Note: constellation-real.ts is not needed for token display
        // const realModule = await import('./constellation-real');
        // const RealConstellationClient = realModule.RealConstellationClient;

        // if (RealConstellationClient) {
        //   this.realClient = new RealConstellationClient();
        //   console.log('🚀 Using REAL Constellation TestNet integration');
        //   this.initialized = true;
        //   return;
        // }
        console.log('🎭 Constellation real mode not fully implemented, using mock');
      } catch (error) {
        console.error('❌ Failed to initialize real Constellation client:', error);
        console.log('🎭 Falling back to MOCK Constellation client');
      }
    }

    // If no real client, use mock
    console.log('🎭 Initializing Constellation client (Mock)');
    mockPools.forEach(pool => {
      this.pools.set(pool.id, pool);
    });
    console.log(`Loaded ${mockPools.length} mock pools into Constellation client`);
    this.initialized = true;
  }

  async createPool(poolId: string, creator: string, company: Company, name: string, description: string, threshold: number = 75): Promise<string> {
    await this.ensureInitialized();

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
    await this.ensureInitialized();
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
    await this.ensureInitialized();
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
    await this.ensureInitialized();
    if (this.realClient) {
      return this.realClient.submitTransaction(data);
    }

    // Simulate feeless transaction
    await new Promise(resolve => setTimeout(resolve, 400));
    return `tx-${Date.now()}`;
  }

  async queryNetwork(query: string): Promise<any> {
    await this.ensureInitialized();

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

// Export as singleton with mode change detection
let _constellationClient: ConstellationClient | null = null;
let _cachedConstellationMode: string = '';

// Listen for mode changes and invalidate cache
if (typeof window !== 'undefined') {
  window.addEventListener('modeChanged', () => {
    console.log('🔄 Constellation client mode changed, invalidating cache');
    _constellationClient = null;
    _cachedConstellationMode = '';
  });
}

export const constellationClient = {
  get instance() {
    const currentMode = getConstellationMode();
    // Recreate client if mode has changed
    if (!_constellationClient || _cachedConstellationMode !== currentMode) {
      _constellationClient = new ConstellationClient();
      _cachedConstellationMode = currentMode;
    }
    return _constellationClient;
  }
};