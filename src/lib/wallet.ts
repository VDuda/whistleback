import { createWalletClient, http, custom } from 'viem';
import { mainnet, sepolia } from 'viem/chains';

// Story Protocol Aeneid TestNet configuration
const storyAeneid = {
  id: 1315,
  name: 'Story Aeneid',
  nativeCurrency: {
    name: 'IP',
    symbol: 'IP',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://aeneid.storyrpc.io/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Storyscan',
      url: 'https://aeneid.storyscan.xyz/',
    },
  },
};

export interface WalletConnection {
  address: string;
  client: ReturnType<typeof createWalletClient>;
}

export async function connectWallet(): Promise<WalletConnection | null> {
  if (typeof window === 'undefined' || !window.ethereum) {
    console.log('No wallet found. Please install MetaMask.');
    return null;
  }

  try {
    // Request account access
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    if (!accounts || accounts.length === 0) {
      return null;
    }

    const address = accounts[0];

    // Check if user is on the correct network
    const chainId = await window.ethereum.request({
      method: 'eth_chainId',
    });

    // If not on Story Aeneid (1315), prompt to switch
    if (chainId !== '0x523') { // 1315 in hex = 0x523
      console.log('Switching to Story Aeneid TestNet...');

      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x523' }], // 1315 in hex
        });
      } catch (switchError: any) {
        // If chain doesn't exist, add it
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x523',
                  chainName: 'Story Aeneid',
                  nativeCurrency: {
                    name: 'IP',
                    symbol: 'IP',
                    decimals: 18,
                  },
                  rpcUrls: ['https://aeneid.storyrpc.io/'],
                  blockExplorerUrls: ['https://aeneid.storyscan.xyz/'],
                },
              ],
            });
          } catch (addError) {
            console.error('Failed to add Story Aeneid network:', addError);
          }
        } else {
          console.error('Failed to switch network:', switchError);
        }
      }
    }

    // Create wallet client with Story Aeneid
    const client = createWalletClient({
      chain: storyAeneid,
      transport: custom(window.ethereum),
    });

    console.log('✅ Connected to wallet on Story Aeneid TestNet');
    console.log(`   Address: ${address}`);

    return {
      address,
      client,
    };
  } catch (error: any) {
    // Handle user cancellation gracefully (MetaMask error code 4001)
    if (error?.code === 4001 || error?.message?.includes('User rejected')) {
      console.log('Wallet connection cancelled by user');
    } else {
      console.error('Failed to connect wallet:', error);
    }
    return null;
  }
}

export async function signMessage(message: string): Promise<string | null> {
  if (!window.ethereum) {
    console.log('No wallet found');
    return null;
  }

  try {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    if (!accounts || accounts.length === 0) {
      return null;
    }

    const signature = await window.ethereum.request({
      method: 'personal_sign',
      params: [message, accounts[0]],
    });

    return signature;
  } catch (error: any) {
    // Handle user cancellation gracefully
    if (error?.code === 4001 || error?.message?.includes('User rejected')) {
      console.log('Message signing cancelled by user');
    } else {
      console.error('Failed to sign message:', error);
    }
    return null;
  }
}

export function disconnectWallet() {
  // For web3 wallets, disconnection is handled by the wallet itself
  // We just clear local state
}

// Extend Window interface
declare global {
  interface Window {
    ethereum?: any;
  }
}