'use client';

import { useSearchParams } from 'next/navigation';
import { ShardUploader } from '@/components/ShardUploader';

export default function UploadPageClient() {
  const searchParams = useSearchParams();
  const poolId = searchParams.get('poolId');

  if (!poolId) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
        <p className="text-gray-400">No pool selected</p>
        <p className="text-gray-500 text-sm mt-2">
          Please select a pool from the Pools page first
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Upload Evidence</h1>
        <p className="text-gray-400">
          Contribute your evidence shard to Pool #{poolId}
        </p>
      </div>

      <ShardUploader poolId={poolId} />

      <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">What Happens Next?</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
              1
            </div>
            <div>
              <p className="text-white font-medium">Evidence Encrypted</p>
              <p className="text-gray-400 text-sm">Your file is encrypted client-side with zero-knowledge proof</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
              2
            </div>
            <div>
              <p className="text-white font-medium">Added to Constellation Network</p>
              <p className="text-gray-400 text-sm">Feeless transaction on Metagraph for secure aggregation</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
              3
            </div>
            <div>
              <p className="text-white font-medium">Narrative Token Minted</p>
              <p className="text-gray-400 text-sm">You receive a Story Protocol NFT with royalty rights</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
              4
            </div>
            <div>
              <p className="text-white font-medium">Pool Strength Increases</p>
              <p className="text-gray-400 text-sm">Your contribution makes the case stronger</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}