'use client';

import { useWallet } from '@/hooks/useWallet';
import { WalletIcon } from '@heroicons/react/24/outline';

export function WalletConnect() {
  const { address, isConnected, isConnecting, connect, disconnect } = useWallet();

  if (isConnected) {
    return (
      <div className="flex items-center gap-3">
        <div className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg">
          Connected
        </div>
        <div className="text-sm text-gray-400">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </div>
        <button
          onClick={disconnect}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
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
      className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white rounded-lg transition"
    >
      <WalletIcon className="w-5 h-5" />
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}