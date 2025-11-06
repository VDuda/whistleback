import { useState, useCallback, useEffect } from 'react';
import { NarrativeToken } from '@/types';
import { isUsingRealTestNet } from '@/lib/story-protocol-config';
import { useMode } from './useMode';

export function useTokens() {
  const [isLoading, setIsLoading] = useState(false);
  const [mintedTokens, setMintedTokens] = useState<NarrativeToken[]>([]);
  const [isLoadingTokens, setIsLoadingTokens] = useState(true);
  const { mode } = useMode(); // Get mode from slider

  console.log('[TOKENS] Hook rendering, mode:', mode, 'current tokens length:', mintedTokens.length);

  // Load tokens from API
  const loadTokens = useCallback(async () => {
    console.log('[TOKENS] loadTokens called, mode:', mode);
    setIsLoadingTokens(true);
    try {
      const response = await fetch(`/api/story/tokens?mode=${mode}`);
      const data = await response.json();

      console.log('[TOKENS] Full API response:', JSON.stringify(data, null, 2));
      console.log('[TOKENS] Mode:', mode, 'Token count:', data.tokens?.length || 0);

      if (response.ok && data.tokens) {
        console.log('[TOKENS] Setting tokens:', data.tokens);
        setMintedTokens(data.tokens);
        console.log('[TOKENS] State updated. New mintedTokens length:', data.tokens.length);
      } else {
        console.error('Failed to load tokens:', data.error);
      }
    } catch (error) {
      console.error('Error loading tokens:', error);
    } finally {
      setIsLoadingTokens(false);
      console.log('[TOKENS] loadTokens complete, isLoadingTokens set to false');
    }
  }, [mode]); // Only depend on mode, not the fetch logic

  // Load tokens on mount and when mode changes
  useEffect(() => {
    console.log('[TOKENS] ⚡ useEffect triggered, mode:', mode);
    loadTokens();
  }, [mode, loadTokens]); // Add loadTokens to dependencies to ensure stability

  const mintToken = useCallback(async (
    shardHash: string,
    poolId: string,
    owner: string
  ) => {
    setIsLoading(true);
    try {
      // Call server-side API route
      const response = await fetch('/api/story/mint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          shardHash,
          poolId,
          owner,
          metadata: {
            name: `Shard-${shardHash.slice(0, 8)}`,
            attributes: {
              poolId,
              type: 'evidence',
              timestamp: Date.now(),
            },
            royalties: 100, // 1% royalty
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to mint token');
      }

      // Reload tokens from API to get the newly minted token
      await loadTokens();

      return data.tokenId;
    } finally {
      setIsLoading(false);
    }
  }, [mode, loadTokens]);

  const remixTokens = useCallback(async (
    parentTokenIds: string[],
    metadata: any,
    poolId: string
  ) => {
    setIsLoading(true);
    try {
      // Call server-side API route
      const response = await fetch('/api/story/remix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          parentTokenIds,
          metadata,
          poolId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to remix tokens');
      }

      return data.masterTokenId;
    } finally {
      setIsLoading(false);
    }
  }, [mode]);

  const forkToken = useCallback(async (tokenId: string, metadata: any) => {
    setIsLoading(true);
    try {
      // Call server-side API route
      const response = await fetch('/api/story/fork', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          tokenId,
          metadata,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fork token');
      }

      return data.forkTokenId;
    } finally {
      setIsLoading(false);
    }
  }, [mode]);

  const getTokenRoyalties = useCallback(async (tokenId: string) => {
    // For demo purposes, return a mock royalty
    // In production, you would call an API route to get real royalty data
    return 100; // 1% royalty
  }, []);

  return {
    mintedTokens,
    isLoading,
    isLoadingTokens,
    mintToken,
    remixTokens,
    forkToken,
    getTokenRoyalties,
    refreshTokens: loadTokens,
  };
}