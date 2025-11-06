'use client';

import { useTokens } from '@/hooks/useTokens';
import { PhotoIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

export function TokenViewer() {
  const { mintedTokens, isLoadingTokens } = useTokens();
  const [error, setError] = useState<string | null>(null);

  console.log('[VIEWER] ⚡ Component render - mintedTokens:', mintedTokens, 'isLoading:', isLoadingTokens);
  console.log('[VIEWER] Tokens array length:', Array.isArray(mintedTokens) ? mintedTokens.length : 'NOT_AN_ARRAY');
  console.log('[VIEWER] First token:', mintedTokens?.[0] || 'NONE');

  useEffect(() => {
    console.log('[VIEWER] 🎯 useEffect running, tokens length:', mintedTokens?.length || 0);
    if (mintedTokens && mintedTokens.length > 0) {
      console.log('[VIEWER] Tokens to render:', JSON.stringify(mintedTokens, null, 2));
    }
  }, [mintedTokens]);

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-400 mb-2">Error displaying tokens</h3>
        <p className="text-red-300 text-sm">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Reload Page
        </button>
      </div>
    );
  }

  if (isLoadingTokens) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 text-center border border-gray-700">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-3"></div>
        <p className="text-gray-400">Loading tokens...</p>
      </div>
    );
  }

  // Safety check: ensure mintedTokens is an array
  const tokensArray = Array.isArray(mintedTokens) ? mintedTokens : [];

  if (tokensArray.length === 0) {
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
        {tokensArray.map((token) => (
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
