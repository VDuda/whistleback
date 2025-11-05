import { useState, useCallback } from 'react';
import { NarrativeToken } from '@/types';
import { storyClient } from '@/lib/story-protocol';

export function useTokens() {
  const [isLoading, setIsLoading] = useState(false);
  const [mintedTokens, setMintedTokens] = useState<NarrativeToken[]>([]);

  const mintToken = useCallback(async (
    shardHash: string,
    poolId: string,
    owner: string
  ) => {
    setIsLoading(true);
    try {
      const tokenId = await storyClient.mintNarrative(
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

      const token = await storyClient.getToken(tokenId);
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
      const masterTokenId = await storyClient.remixTokens(
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
      const forkTokenId = await storyClient.forkToken(tokenId, metadata);
      return forkTokenId;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getTokenRoyalties = useCallback(async (tokenId: string) => {
    const royalties = await storyClient.getTokenRoyalties(tokenId);
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