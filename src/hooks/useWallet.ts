import { useState, useEffect, useCallback } from 'react';
import { connectWallet, signMessage } from '@/lib/wallet';
import { useStore } from '@/lib/store';

export function useWallet() {
  const { address, isConnected, setAddress, setConnected } = useStore();
  const [isConnecting, setIsConnecting] = useState(false);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    console.log('🔌 [WALLET] Connect attempt started, current state:', { address, isConnected });
    try {
      const wallet = await connectWallet();
      console.log('🔌 [WALLET] connectWallet() returned:', wallet);
      if (wallet) {
        // Only update state after successful wallet connection
        console.log('🔌 [WALLET] Setting address and connected to true');
        setAddress(wallet.address);
        setConnected(true);
        // Sign anonymous identity proof
        await signMessage(`WhistleBack anonymous session: ${Date.now()}`);
        // State updates only happen after successful signature
        console.log('✅ [WALLET] Wallet connected and signed successfully');
      } else {
        // Wallet connection was rejected or failed
        console.log('⚠️ [WALLET] Wallet connection failed or rejected - NOT updating state');
      }
    } catch (error: any) {
      // Handle user cancellation (MetaMask error code 4001)
      if (error?.code === 4001 || error?.message?.includes('User rejected')) {
        console.log('⚠️ [WALLET] Wallet connection cancelled by user - NOT updating state');
      } else {
        console.error('❌ [WALLET] Failed to connect wallet:', error);
      }
      // Ensure state is not updated on error - keep previous connection state
    } finally {
      setIsConnecting(false);
    }
  }, [setAddress, setConnected, address, isConnected]);

  const disconnect = useCallback(() => {
    setAddress(null);
    setConnected(false);
  }, [setAddress, setConnected]);

  // Auto-connect if wallet was previously connected
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        // Don't log state - just handle the event
        if (accounts.length === 0) {
          console.log('📱 [WALLET] No accounts, disconnecting');
          disconnect();
        } else {
          console.log('📱 [WALLET] Account changed, but NOT auto-connecting - user must click Connect');
          // Don't auto-set address on accountsChanged - only manual connect should update state
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
    // Only include stable dependencies - setAddress and setConnected are stable from Zustand
  }, [disconnect, setAddress]);

  return {
    address,
    isConnected,
    isConnecting,
    connect,
    disconnect,
  };
}