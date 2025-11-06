'use client';

import { useEffect, useState } from 'react';
import { PoolCard } from '@/components/PoolCard';
import { CreatePoolModal } from '@/components/CreatePoolModal';
import { usePools } from '@/hooks/usePools';
import { mockPools } from '@/lib/mock-data';
import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function PoolsPage() {
  const { pools } = usePools();
  const [displayPools, setDisplayPools] = useState(pools);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
        >
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
      <div className="mt-16 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3 shadow-lg">
              1
            </div>
            <h3 className="text-white font-semibold mb-2">Back In</h3>
            <p className="text-gray-400 text-sm">
              Connect wallet and join an evidence pool anonymously
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3 shadow-lg">
              2
            </div>
            <h3 className="text-white font-semibold mb-2">Contribute</h3>
            <p className="text-gray-400 text-sm">
              Upload encrypted evidence shards with ZK-proofs
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3 shadow-lg">
              3
            </div>
            <h3 className="text-white font-semibold mb-2">Aggregate</h3>
            <p className="text-gray-400 text-sm">
              Watch pool strength grow as more evidence is added
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3 shadow-lg">
              4
            </div>
            <h3 className="text-white font-semibold mb-2">Mint & Win</h3>
            <p className="text-gray-400 text-sm">
              Get narrative tokens and share in IRS awards
            </p>
          </div>
        </div>
      </div>

      {/* Create Pool Modal */}
      <CreatePoolModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}