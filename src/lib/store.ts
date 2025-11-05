import { create } from 'zustand';
import { Pool, Shard, Auction, Lawyer } from '@/types';

interface AppState {
  // Wallet state
  address: string | null;
  isConnected: boolean;

  // Pool state
  pools: Pool[];
  currentPool: Pool | null;

  // Auction state
  auctions: Auction[];
  lawyers: Lawyer[];

  // UI state
  isLoading: boolean;
  error: string | null;

  // Actions
  setAddress: (address: string | null) => void;
  setConnected: (connected: boolean) => void;
  addPool: (pool: Pool) => void;
  updatePool: (poolId: string, updates: Partial<Pool>) => void;
  setCurrentPool: (pool: Pool | null) => void;
  addShard: (poolId: string, shard: Shard) => void;
  addAuction: (auction: Auction) => void;
  updateAuction: (auctionId: string, updates: Partial<Auction>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useStore = create<AppState>((set) => ({
  // Initial state
  address: null,
  isConnected: false,
  pools: [],
  currentPool: null,
  auctions: [],
  lawyers: [],
  isLoading: false,
  error: null,

  // Actions
  setAddress: (address) => set({ address }),
  setConnected: (connected) => set({ isConnected: connected }),
  addPool: (pool) => set((state) => ({ pools: [...state.pools, pool] })),
  updatePool: (poolId, updates) =>
    set((state) => ({
      pools: state.pools.map((p) => (p.id === poolId ? { ...p, ...updates } : p)),
    })),
  setCurrentPool: (pool) => set({ currentPool: pool }),
  addShard: (poolId, shard) =>
    set((state) => ({
      pools: state.pools.map((p) =>
        p.id === poolId
          ? { ...p, shards: [...p.shards, shard] }
          : p
      ),
    })),
  addAuction: (auction) => set((state) => ({ auctions: [...state.auctions, auction] })),
  updateAuction: (auctionId, updates) =>
    set((state) => ({
      auctions: state.auctions.map((a) =>
        a.id === auctionId ? { ...a, ...updates } : a
      ),
    })),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));