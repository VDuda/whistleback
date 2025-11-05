'use client';

import { useState } from 'react';
import { mockLawyers } from '@/lib/mock-data';
import { ScaleIcon, TrophyIcon } from '@heroicons/react/24/outline';

export default function AuctionPage() {
  const [selectedPool, setSelectedPool] = useState('');
  const [auctionStatus, setAuctionStatus] = useState<'idle' | 'running' | 'completed'>('idle');
  const [winner, setWinner] = useState<string | null>(null);

  const handleStartAuction = async () => {
    setAuctionStatus('running');

    // Simulate auction duration
    setTimeout(() => {
      const randomWinner = mockLawyers[Math.floor(Math.random() * mockLawyers.length)];
      setWinner(randomWinner.name);
      setAuctionStatus('completed');
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Lawyer Auction Hub</h1>
        <p className="text-gray-400">
          Trigger auctions when pool strength meets threshold
        </p>
      </div>

      {auctionStatus === 'idle' && (
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
          <ScaleIcon className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Ready to Start Auction?</h3>
          <p className="text-gray-400 mb-6">
            Select a pool that has reached the strength threshold
          </p>

          <div className="mb-6">
            <label className="block text-gray-400 text-sm mb-2">Pool ID</label>
            <input
              type="text"
              value={selectedPool}
              onChange={(e) => setSelectedPool(e.target.value)}
              placeholder="e.g., pool-1730800000000"
              className="w-full max-w-md px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
          </div>

          <button
            onClick={handleStartAuction}
            disabled={!selectedPool}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white rounded-lg transition"
          >
            Trigger Auction
          </button>
        </div>
      )}

      {auctionStatus === 'running' && (
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
          <div className="animate-spin w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-white mb-2">Auction in Progress</h3>
          <p className="text-gray-400">Vetted lawyers are placing their bids...</p>
        </div>
      )}

      {auctionStatus === 'completed' && winner && (
        <div className="bg-green-500/20 border border-green-500 rounded-lg p-8">
          <div className="flex items-center gap-4 mb-6">
            <TrophyIcon className="w-12 h-12 text-yellow-400" />
            <div>
              <h3 className="text-xl font-semibold text-white">Auction Complete!</h3>
              <p className="text-gray-400">Winning lawyer selected</p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-4">
            <h4 className="text-lg font-semibold text-white mb-4">Winner: {winner}</h4>

            {mockLawyers
              .filter(l => l.name === winner)
              .map(lawyer => (
                <div key={lawyer.id} className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Success Fee</p>
                      <p className="text-white font-semibold">{(lawyer.successFee * 100).toFixed(0)}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Cases Won</p>
                      <p className="text-white font-semibold">{lawyer.casesWon}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Rating</p>
                      <p className="text-white font-semibold">{lawyer.rating}/5.0</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Specialization</p>
                      <p className="text-white font-semibold">{lawyer.specialization}</p>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>

          <button
            onClick={() => {
              setAuctionStatus('idle');
              setWinner(null);
              setSelectedPool('');
            }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            Start New Auction
          </button>
        </div>
      )}

      {/* Available Lawyers */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Available Lawyers</h3>
        <div className="space-y-3">
          {mockLawyers.map(lawyer => (
            <div key={lawyer.id} className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{lawyer.name}</p>
                <p className="text-gray-400 text-sm">{lawyer.specialization}</p>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold">{(lawyer.successFee * 100).toFixed(0)}% fee</p>
                <p className="text-gray-400 text-sm">Rating: {lawyer.rating}/5</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}