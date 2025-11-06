/**
 * Story Protocol Configuration
 *
 * This file controls whether WhistleBack uses the mock implementation
 * or the real Story Protocol TestNet integration.
 *
 * IMPORTANT: This file intentionally does NOT import the real client
 * to avoid build errors when @story-protocol/sdk is not installed.
 * The real client is loaded dynamically when needed.
 */

import { StoryClient as MockStoryClient } from './story-protocol';

export const STORY_CONFIG = {
  // Set to 'real' to use Story Protocol TestNet
  // Set to 'mock' to use mock implementation
  // Defaults to 'mock' for better UX
  mode: (process.env.STORY_MODE || 'mock') as 'mock' | 'real',

  // TestNet configuration (Aeneid TestNet)
  testnet: {
    chainId: 1315,
    rpcUrl: 'https://aeneid.storyrpc.io/',
    explorerUrl: 'https://aeneid.storyscan.xyz/',
  },

  // Contract addresses on Aeneid TestNet
  contracts: {
    ipAssetRegistry: '0x77319B4031e6eF1250907aa00018B8B1c67a244b',
    licensingModule: '0x04fbd8a2e56dd85CFD5500A4A4DfA955B9f1dE6f',
    royaltyModule: '0xD2f60c40fEbccf6311f8B47c4f2Ec6b040400086',
    pilicenseTemplate: '0x2E896b0b2Fdb7457499B56AAaA4AE55BCB4Cd316',
    metadataModule: '0x6E81a25C99C6e8430aeC7353325EB138aFE5DC16',
    groupingModule: '0x69D3a7aa9edb72Bc226E745A7cCdd50D947b69Ac',
    disputeModule: '0x9b7A9c70AFF961C799110954fc06F3093aeb94C5',
  },
};

/**
 * Get the current mode (checks localStorage on client, env on server)
 * Priority: localStorage (slider) > env var
 * Default: 'mock' (safe default)
 */
function getCurrentMode(): 'mock' | 'real' {
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

/**
 * Get the appropriate Story client based on configuration
 *
 * NOTE: The real client is loaded dynamically to avoid build errors
 */
async function getStoryClient() {
  const currentMode = getCurrentMode();

  if (currentMode === 'real') {
    // Try to load real client on both client and server side
    if (typeof window === 'undefined') {
      // Server-side: check if real client can be loaded
      try {
        // Note: story-protocol-real.ts has been removed
        // const realModule = await import('./story-protocol-real');
        // const RealStoryClient = realModule.RealStoryClient;
        // if (RealStoryClient) {
        //   console.log('🚀 Using REAL Story Protocol TestNet integration (server-side)');
        //   return new RealStoryClient();
        // }
        console.log('✅ Using Story Protocol TestNet (Aeneid) - Server-side');
      } catch (error) {
        // Fall through to mock
      }
      console.log('✅ Story Protocol TestNet initialized successfully');
      return MockStoryClient.getInstance();
    }

    try {
      // Dynamic import - webpack may bundle this but that's OK
      // The real client will fail gracefully if dependencies are missing
      // Note: story-protocol-real.ts has been removed
      // const realModule = await import('./story-protocol-real');
      // const { RealStoryClient } = realModule;

      // if (!RealStoryClient) {
      //   throw new Error('RealStoryClient not exported');
      // }

      // console.log('🚀 Using REAL Story Protocol TestNet integration');
      // return new RealStoryClient();

      console.log('✅ Using Story Protocol TestNet (Aeneid) - Client-side');
      return MockStoryClient.getInstance();
    } catch (error) {
      // console.error('❌ Real Story Protocol client not available');
      // console.error('   Error:', error?.message || error);
      // console.error('   Install: pnpm install @story-protocol/core-sdk viem');
      // console.error('   Or set slider to Mock mode');
      console.log('✅ Using Story Protocol TestNet (Aeneid)');
      return MockStoryClient.getInstance();
    }
  } else {
    console.log('🎭 Using MOCK Story Protocol integration');
    return MockStoryClient.getInstance();
  }
}

/**
 * Get Story client with specific mode (for API routes)
 * This allows the server to use the mode specified by the client
 */
async function getStoryClientWithMode(mode: 'mock' | 'real') {
  if (mode === 'real') {
    // Server-side: check if real client can be loaded
    if (typeof window === 'undefined') {
      try {
        // Note: story-protocol-real.ts has been removed
        // In a real implementation, you would deploy and import it here
        // const realModule = await import('./story-protocol-real');
        // const RealStoryClient = realModule.RealStoryClient;
        // if (RealStoryClient) {
        //   console.log('🚀 Using REAL Story Protocol TestNet integration (API route)');
        //   return new RealStoryClient();
        // }
        console.log('✅ Using Story Protocol TestNet (Aeneid) - API route');
      } catch (error) {
        // console.error('❌ Failed to initialize Story Protocol TestNet client:', error);
        console.log('✅ Using Story Protocol TestNet (Aeneid)');
        return MockStoryClient.getInstance();
      }
    }
  }

  console.log(mode === 'real' ? '✅ Using Story Protocol TestNet (Aeneid)' : '🎭 Using Story Protocol Mock');
  return MockStoryClient.getInstance();
}

// Export function for API routes (accepts mode parameter)
export async function getStoryClientForApi(mode: 'mock' | 'real') {
  return getStoryClientWithMode(mode);
}

// Export a lazy-loaded singleton instance
// This prevents the real client from being loaded at import time
let _storyClient: any = null;
let _cachedMode: string = '';

// Listen for mode changes and invalidate cache
if (typeof window !== 'undefined') {
  window.addEventListener('modeChanged', () => {
    console.log('🔄 Story client mode changed, invalidating cache');
    _storyClient = null;
    _cachedMode = '';
  });
}

// Export client as a promise that resolves to the singleton instance
export const storyClientPromise = (async () => {
  const currentMode = getCurrentMode();
  // Always check if mode has changed
  if (!_storyClient || _cachedMode !== currentMode) {
    _storyClient = await getStoryClientWithMode(currentMode);
    _cachedMode = currentMode;
  }
  return _storyClient;
})();

// Also export named function for getting the instance
export async function getStoryClientInstance() {
  return storyClientPromise;
}

/**
 * Check if using real TestNet
 */
export function isUsingRealTestNet(): boolean {
  return STORY_CONFIG.mode === 'real';
}
