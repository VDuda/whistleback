import { useState, useEffect, useCallback } from 'react';
import { connectWallet, signMessage } from '@/lib/wallet';
import { useStore } from '@/lib/store';

export function useWallet() {
  const { address, isConnected, setAddress, setConnected } = useStore();
  const [isConnecting, setIsConnecting] = useState(false);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    try {
      const wallet = await connectWallet();
      if (wallet) {
        setAddress(wallet.address);
        setConnected(true);
        // Sign anonymous identity proof
        await signMessage(`WhistleBack anonymous session: ${Date.now()}`);
      }
    } catch (error) {
      console.error('Failed to connect:', error);
    } finally {
      setIsConnecting(false);
    }
  }, [setAddress, setConnected]);

  const disconnect = useCallback(() => {
    setAddress(null);
    setConnected(false);
  }, [setAddress, setConnected]);

  // Auto-connect if wallet was previously connected
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
        } else {
          setAddress(accounts[0]);
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
  }, [disconnect, setAddress]);

  return {
    address,
    isConnected,
    isConnecting,
    connect,
    disconnect,
  };
}