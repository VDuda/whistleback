'use client';

import { useTokens } from '@/hooks/useTokens';
import { PhotoIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

export function TokenViewer() {
  const { mintedTokens, isLoadingTokens } = useTokens();

  if (isLoadingTokens) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 text-center border border-gray-700">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-3"></div>
        <p className="text-gray-400">Loading tokens...</p>
      </div>
    );
  }

  if (mintedTokens.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 text-center border border-gray-700">
        <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-400">No tokens minted yet</p>
        <p className="text-gray-500 text-sm mt-1">Upload evidence to mint your first narrative token</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-4">Your Narrative Tokens</h3>

      <div className="grid gap-4">
        {mintedTokens.map((token) => (
          <div
            key={token.id}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-lg font-medium text-white">{token.metadata.name}</h4>
                <p className="text-gray-400 text-sm">Token ID: {token.id}</p>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <CurrencyDollarIcon className="w-4 h-4" />
                <span className="text-sm">{token.royalties / 100}% royalty</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-700">
              <div>
                <p className="text-gray-400 text-xs mb-1">Pool ID</p>
                <p className="text-white text-sm font-mono">{token.poolId}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Shard Hash</p>
                <p className="text-white text-sm font-mono">{token.shardHash.slice(0, 12)}...</p>
              </div>
            </div>

            {Object.keys(token.metadata.attributes || {}).length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-700">
                <p className="text-gray-400 text-xs mb-2">Attributes</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(token.metadata.attributes).map(([key, value]) => (
                    <span
                      key={key}
                      className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                    >
                      {key}: {String(value)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}