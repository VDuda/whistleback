'use client';

import { useState } from 'react';
import { mockLawyers } from '@/lib/mock-data';
import {
  ScaleIcon,
  TrophyIcon,
  StarIcon,
  CheckBadgeIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';
import { Lawyer } from '@/types';

export default function AuctionPage() {
  const [selectedPool, setSelectedPool] = useState('');
  const [auctionStatus, setAuctionStatus] = useState<'idle' | 'running' | 'completed'>('idle');
  const [winner, setWinner] = useState<Lawyer | null>(null);

  const handleStartAuction = async () => {
    setAuctionStatus('running');

    // Simulate auction duration
    setTimeout(() => {
      const randomWinner = mockLawyers[Math.floor(Math.random() * mockLawyers.length)];
      setWinner(randomWinner);
      setAuctionStatus('completed');
    }, 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Lawyer Auction Hub</h1>
        <p className="text-xl text-gray-400">
          When pool strength meets threshold, trigger competitive bidding from our network of vetted specialists
        </p>
      </div>

      {auctionStatus === 'idle' && (
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ScaleIcon className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Auction?</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Select a pool that has reached the strength threshold (typically 75%+).
            Our vetted lawyers will bid competitively for the case.
          </p>

          <div className="max-w-md mx-auto mb-8">
            <label className="block text-gray-400 text-sm mb-3 text-left">Pool ID</label>
            <input
              type="text"
              value={selectedPool}
              onChange={(e) => setSelectedPool(e.target.value)}
              placeholder="e.g., pool-1730800000000"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <button
            onClick={handleStartAuction}
            disabled={!selectedPool}
            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
          >
            Trigger Auction
          </button>
        </div>
      )}

      {auctionStatus === 'running' && (
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-12 text-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="absolute inset-0 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl mx-auto" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Auction in Progress</h3>
          <p className="text-gray-400 text-lg mb-6">
            Vetted lawyers are reviewing the case and placing their bids...
          </p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      )}

      {auctionStatus === 'completed' && winner && (
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/30 rounded-3xl p-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                <TrophyIcon className="w-10 h-10 text-white" />
              </div>
              <div className="absolute inset-0 bg-green-400/20 rounded-full blur-2xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Auction Complete! 🎉</h3>
              <p className="text-gray-300">Winning lawyer selected for your case</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6">
            <h4 className="text-2xl font-bold text-white mb-2">{winner.name}</h4>
            <p className="text-blue-400 font-medium mb-4">{winner.specialization}</p>

            {winner.bio && (
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">{winner.bio}</p>
            )}

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <StarIcon className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-400 text-sm">Rating</span>
                </div>
                <p className="text-white font-bold text-xl">{winner.rating}/5.0</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckBadgeIcon className="w-5 h-5 text-green-400" />
                  <span className="text-gray-400 text-sm">Cases Won</span>
                </div>
                <p className="text-white font-bold text-xl">{winner.casesWon}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ScaleIcon className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-400 text-sm">Success Fee</span>
                </div>
                <p className="text-white font-bold text-xl">{(winner.successFee * 100).toFixed(0)}%</p>
              </div>
            </div>

            {winner.barAdmissions && winner.barAdmissions.length > 0 && (
              <div className="mb-6">
                <p className="text-gray-400 text-sm mb-2">Bar Admissions</p>
                <div className="flex flex-wrap gap-2">
                  {winner.barAdmissions.map((bar) => (
                    <span
                      key={bar}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                    >
                      {bar}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {winner.notableCases && winner.notableCases.length > 0 && (
              <div>
                <p className="text-gray-400 text-sm mb-3 flex items-center gap-2">
                  <BriefcaseIcon className="w-4 h-4" />
                  Notable Cases
                </p>
                <div className="space-y-2">
                  {winner.notableCases.map((caseName, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                      <span className="text-gray-300 text-sm">{caseName}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              setAuctionStatus('idle');
              setWinner(null);
              setSelectedPool('');
            }}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 font-semibold"
          >
            Start New Auction
          </button>
        </div>
      )}

      {/* Available Lawyers */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Our Network of Vetted Specialists</h2>
          <p className="text-gray-400">
            Former IRS, SEC attorneys and top-rated whistleblower specialists
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {mockLawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              className="group bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                  <ScaleIcon className="w-8 h-8 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                    {lawyer.name}
                  </h3>
                  <p className="text-blue-400 text-sm font-medium">{lawyer.specialization}</p>
                </div>
              </div>

              {lawyer.bio && (
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{lawyer.bio}</p>
              )}

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{lawyer.rating}</div>
                  <div className="text-xs text-gray-400">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{lawyer.casesWon}</div>
                  <div className="text-xs text-gray-400">Won</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{(lawyer.successFee * 100).toFixed(0)}%</div>
                  <div className="text-xs text-gray-400">Fee</div>
                </div>
              </div>

              {lawyer.barAdmissions && lawyer.barAdmissions.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {lawyer.barAdmissions.slice(0, 3).map((bar) => (
                    <span
                      key={bar}
                      className="px-2 py-1 bg-white/5 text-gray-400 rounded text-xs"
                    >
                      {bar}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}