/**
 * Real Story Protocol Integration for WhistleBack
 *
 * This file contains the real implementation that connects to Story Protocol TestNet.
 * Replace the mock client in story-protocol.ts with this implementation.
 *
 * Setup:
 * 1. Install: pnpm install @story-protocol/core-sdk viem
 * 2. Copy .env.testnet.example to .env.testnet
 * 3. Add your private key and configure environment
 * 4. Set STORY_MODE=real to use this implementation
 */

// Dynamic imports to prevent webpack bundling
let viem: any = null;
let storyProtocol: any = null;

function loadDependencies() {
  if (!viem || !storyProtocol) {
    try {
      viem = require('viem');
      storyProtocol = require('@story-protocol/core-sdk');
    } catch (error) {
      throw new Error('Story Protocol SDK not installed. Run: pnpm install @story-protocol/core-sdk viem');
    }
  }
  return { viem, storyProtocol };
}

import type { NarrativeToken } from '@/types';

// Story Protocol TestNet configuration
const STORY_CONFIG = {
  chainId: 1315, // Aeneid TestNet
  rpcUrl: process.env.STORY_RPC_URL || 'https://odyssey.storyrpc.io/',
  // Add your private key - NEVER commit this!
  privateKey: process.env.STORY_PRIVATE_KEY,
};

// Contract addresses on Aeneid TestNet
const STORY_CONTRACTS = {
  ipAssetRegistry: process.env.STORY_IP_ASSET_REGISTRY || '0x77319B4031e6eF1250907aa00018B8B1c67a244b',
  licensingModule: process.env.STORY_LICENSING_MODULE || '0x04fbd8a2e56dd85CFD5500A4A4DfA955B9f1dE6f',
  royaltyModule: process.env.STORY_ROYALTY_MODULE || '0xD2f60c40fEbccf6311f8B47c4f2Ec6b040400086',
  pilicenseTemplate: process.env.STORY_PILICENSE_TEMPLATE || '0x2E896b0b2Fdb7457499B56AAaA4AE55BCB4Cd316',
  metadataModule: process.env.STORY_METADATA_MODULE || '0x6E81a25C99C6e8430aeC7353325EB138aFE5DC16',
  groupingModule: process.env.STORY_GROUPING_MODULE || '0x69D3a7aa9edb72Bc226E745A7cCdd50D947b69Ac',
  disputeModule: process.env.STORY_DISPUTE_MODULE || '0x9b7A9c70AFF961C799110954fc06F3093aeb94C5',
};

/**
 * Real Story Protocol Client
 *
 * This class wraps the @story-protocol/sdk to provide
 * WhistleBack-specific functionality for evidence shards and narrative tokens.
 */
export class RealStoryClient {
  private storyClient: any = null;
  private account: any = null;
  private config: any = null;

  constructor() {
    // Load dependencies dynamically
    const { viem, storyProtocol } = loadDependencies();
    const { createPublicClient, createWalletClient, http } = viem;
    const { StoryClient, StoryNetwork } = storyProtocol;

    // Configuration
    this.config = {
      privateKey: process.env.STORY_PRIVATE_KEY,
      chainId: parseInt(process.env.STORY_CHAIN_ID || '1315'),
      rpcUrl: process.env.STORY_RPC_URL || 'https://odyssey.storyrpc.io/',
      contracts: {
        ipAssetRegistry: process.env.STORY_IP_ASSET_REGISTRY || '0x77319B4031e6eF1250907aa00018B8B1c67a244b',
        licensingModule: process.env.STORY_LICENSING_MODULE || '0x04fbd8a2e56dd85CFD5500A4A4DfA955B9f1dE6f',
        royaltyModule: process.env.STORY_ROYALTY_MODULE || '0xD2f60c40fEbccf6311f8B47c4f2Ec6b040400086',
        pilicenseTemplate: process.env.STORY_PILICENSE_TEMPLATE || '0x2E896b0b2Fdb7457499B56AAaA4AE55BCB4Cd316',
        metadataModule: process.env.STORY_METADATA_MODULE || '0x6E81a25C99C6e8430aeC7353325EB138aFE5DC16',
        groupingModule: process.env.STORY_GROUPING_MODULE || '0x69D3a7aa9edb72Bc226E745A7cCdd50D947b69Ac',
        disputeModule: process.env.STORY_DISPUTE_MODULE || '0x9b7A9c70AFF961C799110954fc06F3093aeb94C5',
      },
    };

    // Validate configuration
    if (!this.config.privateKey) {
      throw new Error('STORY_PRIVATE_KEY not configured. Set it in your .env file.');
    }

    // Initialize viem clients
    const publicClient = createPublicClient({
      chain: StoryNetwork.Testnet,
      transport: http(this.config.rpcUrl),
    });

    // Create account from private key
    this.account = createWalletClient({
      chain: StoryNetwork.Testnet,
      transport: http(this.config.rpcUrl),
      account: this.config.privateKey as `0x${string}`,
    });

    // Initialize Story Protocol client
    this.storyClient = new StoryClient({
      publicClient,
      walletClient: this.account,
      account: this.account.address,
    });

    console.log('✅ Real Story Protocol client initialized');
    console.log(`   Network: Story TestNet (Chain ID: ${this.config.chainId})`);
    console.log(`   Account: ${this.account.address}`);
    console.log(`   IP Asset Registry: ${this.config.contracts.ipAssetRegistry}`);
  }

  /**
   * Mint a narrative token for an evidence shard
   *
   * This function:
   * 1. Creates an IP Asset (NFT) representing the evidence
   * 2. Registers it with Story Protocol
   * 3. Attaches metadata describing the evidence
   * 4. Returns the token ID
   */
  async mintNarrative(
    shardHash: string,
    poolId: string,
    metadata: {
      name: string;
      description?: string;
      image?: string; // Optional: URL to evidence thumbnail
      attributes?: Record<string, any>;
      evidenceType?: string;
      strength?: number;
    },
    owner: string
  ): Promise<string> {
    try {
      console.log(`🎭 Minting narrative token for shard: ${shardHash.slice(0, 8)}...`);

      // Load dependencies
      const { storyProtocol } = loadDependencies();
      const { IpMetadata } = storyProtocol;

      // Step 1: Define IP metadata
      // This describes the intellectual property (evidence shard)
      const ipMetadata = {
        title: metadata.name,
        description: metadata.description || `Evidence shard from pool ${poolId}`,
        image: metadata.image, // Optional: URL to evidence thumbnail
        attributes: [
          {
            traitType: 'evidenceType',
            value: metadata.evidenceType || 'document',
          },
          {
            traitType: 'poolId',
            value: poolId,
          },
          {
            traitType: 'shardHash',
            value: shardHash,
          },
          {
            traitType: 'strength',
            value: metadata.strength || 0,
          },
          ...(metadata.attributes
            ? Object.entries(metadata.attributes).map(([key, value]) => ({
                traitType: key,
                value,
              }))
            : []),
        ],
      };

      // Step 2: Register IP Asset
      // This creates an NFT and registers it as programmable IP
      const ipAsset = await this.storyClient.ipAsset.register({
        nftMetadata: {
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        },
        ipMetadata,
        // You can specify a deadline for registration if needed
        // deadline: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
      });

      console.log(`✅ IP Asset registered: ${ipAsset.ipId}`);

      // Step 3: Optionally attach license terms
      // This defines how the IP can be used/remixed
      await this.attachDefaultLicense(ipAsset.ipId);

      // Step 4: Return token information
      // ipAsset.tokenId is the ERC-721 token ID
      // ipAsset.ipId is the registered IP asset address
      return ipAsset.ipId; // Using IP ID as our token identifier
    } catch (error) {
      console.error('❌ Error minting narrative token:', error);
      throw new Error(`Failed to mint narrative token: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Attach default license terms to an IP Asset
   *
   * This establishes remix rights and royalty structure
   */
  private async attachDefaultLicense(ipId: string): Promise<void> {
    try {
      // Load dependencies
      const { storyProtocol } = loadDependencies();

      // Define license terms
      const licenseTerms = await this.storyClient.license.pilTerms.create({
        // Personal & Internal Use License
        // See: https://docs.story.foundation/docs/pil-types
        transferable: true,
        royaltyPolicy: this.config.contracts.royaltyModule,
        defaultMintingFee: 0, // 0 for evidence sharing
        expiration: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365 * 10, // 10 years
        commercialUse: false,
        derivatives: true, // Allow remixing
        attribution: true, // Require attribution
      });

      // Attach to IP Asset
      await this.storyClient.license.attachTerms({
        ipId,
        licenseTermsId: licenseTerms.licenseTermsId,
      });

      console.log(`✅ Default license attached to IP: ${ipId}`);
    } catch (error) {
      console.warn('⚠️  Failed to attach license terms:', error);
      // Don't throw - this is optional
    }
  }

  /**
   * Remix multiple tokens into a master NFT
   *
   * When a pool reaches its threshold, remix all narrative tokens
   * into a single master NFT representing the complete case
   */
  async remixTokens(
    parentTokenIds: string[],
    metadata: {
      name: string;
      description: string;
      poolId: string;
    },
    poolId: string
  ): Promise<string> {
    try {
      console.log(`🎨 Remixing ${parentTokenIds.length} tokens into master NFT`);

      // Create a derivative IP from parent tokens
      const masterIp = await this.storyClient.ipAsset.register({
        nftMetadata: {
          name: metadata.name,
          description: metadata.description,
        },
        ipMetadata: {
          title: metadata.name,
          description: metadata.description,
          attributes: [
            {
              traitType: 'type',
              value: 'master_nft',
            },
            {
              traitType: 'poolId',
              value: poolId,
            },
            {
              traitType: 'parentTokens',
              value: parentTokenIds.join(','),
            },
            {
              traitType: 'contributorCount',
              value: parentTokenIds.length,
            },
          ],
        },
        // Make this a derivative of all parent tokens
        parentIpIds: parentTokenIds,
      });

      console.log(`✅ Master NFT created: ${masterIp.ipId}`);
      return masterIp.ipId;
    } catch (error) {
      console.error('❌ Error remixing tokens:', error);
      throw new Error(`Failed to remix tokens: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get token information
   */
  async getToken(tokenId: string): Promise<NarrativeToken | null> {
    try {
      // Fetch IP Asset data
      const ipAsset = await this.storyClient.ipAsset.getIpAsset(tokenId);

      if (!ipAsset) {
        return null;
      }

      // Convert to our format
      const narrativeToken: NarrativeToken = {
        id: tokenId,
        poolId: this.extractPoolId(ipAsset.metadata),
        shardHash: this.extractShardHash(ipAsset.metadata),
        metadata: {
          name: ipAsset.metadata.title || 'Evidence Shard',
          attributes: ipAsset.metadata.attributes || {},
        },
        royalties: 100, // 1% default
        owner: ipAsset.owner,
      };

      return narrativeToken;
    } catch (error) {
      console.error('❌ Error getting token:', error);
      return null;
    }
  }

  /**
   * Get token royalties
   */
  async getTokenRoyalties(tokenId: string): Promise<number> {
    try {
      const ipAsset = await this.storyClient.ipAsset.getIpAsset(tokenId);
      return ipAsset?.royalty?.royaltyStack?.reduce((sum: number, r: any) => sum + r.percentage, 0) || 0;
    } catch (error) {
      console.error('❌ Error getting royalties:', error);
      return 0;
    }
  }

  /**
   * Transfer token
   */
  async transferToken(tokenId: string, to: string): Promise<boolean> {
    try {
      await this.storyClient.ipAsset.transfer({
        ipId: tokenId,
        to,
      });
      return true;
    } catch (error) {
      console.error('❌ Error transferring token:', error);
      return false;
    }
  }

  /**
   * Fork token (for dispute cases)
   */
  async forkToken(
    tokenId: string,
    metadata: {
      name: string;
      description: string;
      reason: string;
    }
  ): Promise<string> {
    try {
      console.log(`🔀 Forking token ${tokenId} - reason: ${metadata.reason}`);

      // Create a derivative IP with dispute information
      const forkIp = await this.storyClient.ipAsset.register({
        nftMetadata: {
          name: metadata.name,
          description: metadata.description,
        },
        ipMetadata: {
          title: metadata.name,
          description: metadata.description,
          attributes: [
            {
              traitType: 'type',
              value: 'dispute_fork',
            },
            {
              traitType: 'parentToken',
              value: tokenId,
            },
            {
              traitType: 'reason',
              value: metadata.reason,
            },
          ],
        },
        parentIpIds: [tokenId],
      });

      console.log(`✅ Token forked: ${forkIp.ipId}`);
      return forkIp.ipId;
    } catch (error) {
      console.error('❌ Error forking token:', error);
      throw new Error(`Failed to fork token: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Utility: Extract pool ID from metadata
   */
  private extractPoolId(metadata: any): string {
    const attr = metadata?.attributes?.find((a: any) => a.traitType === 'poolId');
    return attr?.value || 'unknown';
  }

  /**
   * Utility: Extract shard hash from metadata
   */
  private extractShardHash(metadata: any): string {
    const attr = metadata?.attributes?.find((a: any) => a.traitType === 'shardHash');
    return attr?.value || '';
  }

  /**
   * Get client status
   */
  getStatus() {
    return {
      network: 'Story TestNet',
      chainId: STORY_CONFIG.chainId,
      rpcUrl: STORY_CONFIG.rpcUrl,
      account: this.account?.address,
      connected: !!this.account,
      contracts: STORY_CONTRACTS,
    };
  }
}

// Export instance
export const realStoryClient = new RealStoryClient();
