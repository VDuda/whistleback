// Mock Story Protocol Integration for MVP
// In production, this would use @story-protocol/sdk

import { NarrativeToken } from '@/types';

// Singleton pattern for mock client to persist tokens across requests
class MockStoryClient {
  private static instance: MockStoryClient;
  private tokens: Map<string, NarrativeToken> = new Map();

  private constructor() {
    console.log('Initializing Story Protocol TestNet (Aeneid)');
  }

  static getInstance(): MockStoryClient {
    if (!MockStoryClient.instance) {
      MockStoryClient.instance = new MockStoryClient();
    }
    return MockStoryClient.instance;
  }

  async mintNarrative(shardHash: string, poolId: string, metadata: any, owner: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 600));

    const tokenId = `token-${Date.now()}`;
    const token: NarrativeToken = {
      id: tokenId,
      poolId,
      shardHash,
      metadata: {
        name: metadata.name || `Shard-${shardHash.slice(0, 8)}`,
        attributes: metadata.attributes || { type: 'evidence' },
      },
      royalties: metadata.royalties || 100, // 1% royalty
      owner,
    };

    this.tokens.set(tokenId, token);
    console.log(`✅ Mock token minted: ${tokenId} for pool ${poolId}`);
    return tokenId;
  }

  async remixTokens(parentTokenIds: string[], metadata: any, poolId: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const masterTokenId = `master-${Date.now()}`;
    console.log(`Remixed ${parentTokenIds.length} tokens into master NFT: ${masterTokenId}`);

    return masterTokenId;
  }

  async getToken(tokenId: string): Promise<NarrativeToken | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.tokens.get(tokenId) || null;
  }

  async getAllTokens(): Promise<NarrativeToken[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return Array.from(this.tokens.values());
  }

  async getTokenRoyalties(tokenId: string): Promise<number> {
    const token = this.tokens.get(tokenId);
    return token ? token.royalties : 0;
  }

  async transferToken(tokenId: string, to: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const token = this.tokens.get(tokenId);
    if (token) {
      token.owner = to;
      return true;
    }
    return false;
  }

  async forkToken(tokenId: string, metadata: any): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 600));

    const originalToken = this.tokens.get(tokenId);
    if (!originalToken) {
      throw new Error('Token not found');
    }

    const forkTokenId = `fork-${Date.now()}`;
    const forkToken: NarrativeToken = {
      ...originalToken,
      id: forkTokenId,
      metadata: {
        ...originalToken.metadata,
        ...metadata,
      },
    };

    this.tokens.set(forkTokenId, forkToken);
    return forkTokenId;
  }
}

export const StoryClient = MockStoryClient;
export const storyClient = MockStoryClient.getInstance();