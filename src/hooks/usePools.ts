import { useState, useEffect, useCallback } from 'react';
import { Pool, Shard, Company } from '@/types';
import { useStore } from '@/lib/store';
import { constellationClient } from '@/lib/constellation';

export function usePools() {
  const { pools, addPool, updatePool, addShard } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const createPool = useCallback(async (name: string, description: string, creator: string, company: Company, threshold: number = 75) => {
    setIsLoading(true);
    try {
      const poolId = `pool-${Date.now()}`;
      const id = await constellationClient.createPool(poolId, creator, company, name, description, threshold);

      const newPool: Pool = {
        id,
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

      addPool(newPool);
      return newPool;
    } finally {
      setIsLoading(false);
    }
  }, [addPool]);

  const joinPool = useCallback(async (poolId: string) => {
    const pool = await constellationClient.getPoolState(poolId);
    if (pool) {
      updatePool(poolId, pool);
    }
    return pool;
  }, [updatePool]);

  const uploadShard = useCallback(async (
    poolId: string,
    file: File,
    uploader: string
  ) => {
    setIsLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      const mockProof = { verified: true, timestamp: Date.now() };
      const encryptedData = `encrypted-${hashHex}`; // Mock encrypted data

      const shard: Omit<Shard, 'id'> = {
        hash: hashHex,
        poolId,
        uploader,
        proof: mockProof,
        encryptedData,
        timestamp: Date.now(),
        credibilityScore: 0,
      };

      const shardId = await constellationClient.addShard(poolId, shard);

      const fullShard: Shard = {
        ...shard,
        id: shardId,
        credibilityScore: 85, // Mock score
      };

      addShard(poolId, fullShard);
      return fullShard;
    } finally {
      setIsLoading(false);
    }
  }, [addShard]);

  const refreshPool = useCallback(async (poolId: string) => {
    const pool = await constellationClient.getPoolState(poolId);
    if (pool) {
      updatePool(poolId, pool);
    }
    return pool;
  }, [updatePool]);

  // Initialize with mock data
  useEffect(() => {
    // In a real app, we'd fetch from the network
  }, []);

  return {
    pools,
    isLoading,
    createPool,
    joinPool,
    uploadShard,
    refreshPool,
  };
}