import { createWalletClient, http, custom } from 'viem';
import { mainnet, sepolia } from 'viem/chains';

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

    // Create wallet client
    const client = createWalletClient({
      chain: sepolia, // Use Sepolia testnet for demo
      transport: custom(window.ethereum),
    });

    return {
      address,
      client,
    };
  } catch (error) {
    console.error('Failed to connect wallet:', error);
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
  } catch (error) {
    console.error('Failed to sign message:', error);
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