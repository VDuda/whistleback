'use client';

import { useWallet } from '@/hooks/useWallet';
import { WalletIcon } from '@heroicons/react/24/outline';

export function WalletConnect() {
  const { address, isConnected, isConnecting, connect, disconnect } = useWallet();

  if (isConnected) {
    return (
      <div className="flex items-center gap-3">
        <div className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium border border-green-500/30">
          Connected
        </div>
        <div className="text-sm text-gray-400 font-mono">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </div>
        <button
          onClick={disconnect}
          className="px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 text-sm font-medium"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connect}
      disabled={isConnecting}
      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 disabled:bg-gray-700/50 text-white rounded-lg transition-all duration-200 text-sm font-medium border border-white/20"
    >
      <WalletIcon className="w-4 h-4" />
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}