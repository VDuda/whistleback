'use client';

import { TokenViewer } from '@/components/TokenViewer';

export default function TokensPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Your Narrative Tokens</h1>
        <p className="text-gray-400">
          Story Protocol NFTs representing your evidence contributions
        </p>
      </div>

      <TokenViewer />

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">What are Narrative Tokens?</h3>
        <div className="space-y-3 text-gray-400">
          <p>
            Each evidence shard you upload is minted as a unique narrative token on Story Protocol.
            These tokens represent your IP rights to the contributed evidence.
          </p>
          <p>
            When the pool is remixed into a master NFT for the IRS filing, your tokens automatically
            receive royalties from any awards or licensing deals.
          </p>
        </div>
      </div>
    </div>
  );
}