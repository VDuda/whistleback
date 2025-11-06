import { useState, useEffect, useCallback } from 'react';
import { connectWallet, signMessage } from '@/lib/wallet';
import { useStore } from '@/lib/store';

export function useWallet() {
  const { address, isConnected, setAddress, setConnected } = useStore();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const checkExistingSession = async () => {
      const sessionId = localStorage.getItem('wb_session_id');
      if (sessionId) {
        console.log('🔍 [WALLET] Found existing session, checking wallet connection...');
        // Reconstruct session without requiring new signature
        try {
          const wallet = await connectWallet();
          if (wallet) {
            console.log('✅ [WALLET] Restored session without new signature');
            setAddress(wallet.address);
            setConnected(true);
          } else {
            // Clear invalid session
            localStorage.removeItem('wb_session_id');
          }
        } catch (error) {
          console.log('⚠️ [WALLET] No wallet connected, cleared invalid session');
          localStorage.removeItem('wb_session_id');
        }
      }
      setIsInitialized(true);
    };

    checkExistingSession();
  }, [setAddress, setConnected]);

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
        // Sign anonymous identity proof (use session-based approach)
        const sessionId = localStorage.getItem('wb_session_id') || crypto.randomUUID();
        localStorage.setItem('wb_session_id', sessionId);
        await signMessage(`WhistleBack anonymous session: ${sessionId}`);
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
    console.log('🔌 [WALLET] Disconnecting wallet, clearing session');
    setAddress(null);
    setConnected(false);
    localStorage.removeItem('wb_session_id');
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