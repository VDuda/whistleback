import { useState, useCallback } from 'react';
import { NarrativeToken } from '@/types';
import { storyClient, isUsingRealTestNet } from '@/lib/story-protocol-config';

export function useTokens() {
  const [isLoading, setIsLoading] = useState(false);
  const [mintedTokens, setMintedTokens] = useState<NarrativeToken[]>([
    // Pre-minted demo tokens for smooth demo flow
    {
      id: 'token-demo-001',
      poolId: 'pool-1730800000000',
      shardHash: '0xabc123def456',
      metadata: {
        name: 'Shell Company Evidence Shard #1',
        attributes: {
          type: 'evidence',
          poolId: 'pool-1730800000000',
          timestamp: Date.now() - 86400000,
        },
      },
      royalties: 100,
      owner: '0x742d35Cc6634C0532925a3b8D3AC2B73aBc9C2',
    },
    {
      id: 'token-demo-002',
      poolId: 'pool-1730800000000',
      shardHash: '0x789xyz012abc',
      metadata: {
        name: 'Shell Company Evidence Shard #2',
        attributes: {
          type: 'evidence',
          poolId: 'pool-1730800000000',
          timestamp: Date.now() - 43200000,
        },
      },
      royalties: 150,
      owner: '0x742d35Cc6634C0532925a3b8D3AC2B73aBc9C2',
    },
  ]);

  const mintToken = useCallback(async (
    shardHash: string,
    poolId: string,
    owner: string
  ) => {
    setIsLoading(true);
    try {
      const tokenId = await storyClient.instance.mintNarrative(
        shardHash,
        poolId,
        {
          name: `Shard-${shardHash.slice(0, 8)}`,
          attributes: {
            poolId,
            type: 'evidence',
            timestamp: Date.now(),
          },
          royalties: 100, // 1% royalty
        },
        owner
      );

      const token = await storyClient.instance.getToken(tokenId);
      if (token) {
        setMintedTokens(prev => [...prev, token]);
      }

      return tokenId;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const remixTokens = useCallback(async (
    parentTokenIds: string[],
    metadata: any,
    poolId: string
  ) => {
    setIsLoading(true);
    try {
      const masterTokenId = await storyClient.instance.remixTokens(
        parentTokenIds,
        metadata,
        poolId
      );
      return masterTokenId;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const forkToken = useCallback(async (tokenId: string, metadata: any) => {
    setIsLoading(true);
    try {
      const forkTokenId = await storyClient.instance.forkToken(tokenId, metadata);
      return forkTokenId;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getTokenRoyalties = useCallback(async (tokenId: string) => {
    const royalties = await storyClient.instance.getTokenRoyalties(tokenId);
    return royalties;
  }, []);

  return {
    mintedTokens,
    isLoading,
    mintToken,
    remixTokens,
    forkToken,
    getTokenRoyalties,
  };
}