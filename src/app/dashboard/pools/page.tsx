'use client';

import { useEffect, useState } from 'react';
import { PoolCard } from '@/components/PoolCard';
import { usePools } from '@/hooks/usePools';
import { mockPools } from '@/lib/mock-data';
import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function PoolsPage() {
  const { pools } = usePools();
  const [displayPools, setDisplayPools] = useState(pools);

  useEffect(() => {
    if (pools.length === 0) {
      setDisplayPools(mockPools);
    } else {
      setDisplayPools(pools);
    }
  }, [pools]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Evidence Pools</h1>
          <p className="text-gray-400">
            Join anonymous pools and contribute evidence shards to build strong cases
          </p>
        </div>

        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
          <PlusIcon className="w-5 h-5" />
          Create Pool
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayPools.map((pool) => (
          <PoolCard key={pool.id} pool={pool} />
        ))}
      </div>

      {displayPools.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg mb-4">No pools available</p>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Create First Pool
          </button>
        </div>
      )}

      {/* How it Works Section */}
      <div className="mt-16 bg-gray-800 rounded-lg p-8 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
              1
            </div>
            <h3 className="text-white font-semibold mb-2">Back In</h3>
            <p className="text-gray-400 text-sm">
              Connect wallet and join an evidence pool anonymously
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
              2
            </div>
            <h3 className="text-white font-semibold mb-2">Contribute</h3>
            <p className="text-gray-400 text-sm">
              Upload encrypted evidence shards with ZK-proofs
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
              3
            </div>
            <h3 className="text-white font-semibold mb-2">Aggregate</h3>
            <p className="text-gray-400 text-sm">
              Watch pool strength grow as more evidence is added
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
              4
            </div>
            <h3 className="text-white font-semibold mb-2">Mint & Win</h3>
            <p className="text-gray-400 text-sm">
              Get narrative tokens and share in IRS awards
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}