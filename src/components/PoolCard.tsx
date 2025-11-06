'use client';

import Link from 'next/link';
import { Pool } from '@/types';
import {
  ShieldCheckIcon,
  DocumentTextIcon,
  ArrowRightIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';

interface PoolCardProps {
  pool: Pool;
}

export function PoolCard({ pool }: PoolCardProps) {
  const getStatusColor = (status: Pool['status']) => {
    switch (status) {
      case 'active':
        return {
          bg: 'from-blue-500/20 to-blue-600/10',
          border: 'border-blue-500/30',
          text: 'text-blue-400',
          pulse: 'bg-blue-500',
        };
      case 'auction':
        return {
          bg: 'from-yellow-500/20 to-yellow-600/10',
          border: 'border-yellow-500/30',
          text: 'text-yellow-400',
          pulse: 'bg-yellow-500',
        };
      case 'filing':
        return {
          bg: 'from-purple-500/20 to-purple-600/10',
          border: 'border-purple-500/30',
          text: 'text-purple-400',
          pulse: 'bg-purple-500',
        };
      case 'closed':
        return {
          bg: 'from-green-500/20 to-green-600/10',
          border: 'border-green-500/30',
          text: 'text-green-400',
          pulse: 'bg-green-500',
        };
      default:
        return {
          bg: 'from-gray-500/20 to-gray-600/10',
          border: 'border-gray-500/30',
          text: 'text-gray-400',
          pulse: 'bg-gray-500',
        };
    }
  };

  const colors = getStatusColor(pool.status);

  return (
    <div className={`group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border ${colors.border} rounded-3xl p-6 hover:border-opacity-60 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl`}>
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <LockClosedIcon className="w-5 h-5 text-blue-400" />
              <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                {pool.name}
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">{pool.description}</p>
            {pool.company && (
              <div className="flex flex-wrap gap-3 text-xs">
                <div className="flex items-center gap-1.5 px-2 py-1.5 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-gray-400">Company:</span>
                  <span className="text-white font-medium">{pool.company.name}</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1.5 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-gray-400">EIN:</span>
                  <span className="text-white font-mono font-medium">{pool.company.ein}</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1.5 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-gray-400">HQ:</span>
                  <span className="text-white font-medium">{pool.company.headquarters}</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                  <span className="text-gray-400">Industry:</span>
                  <span className="text-blue-300 font-medium">{pool.company.industry}</span>
                </div>
              </div>
            )}
          </div>
          <div className={`px-4 py-2 bg-gradient-to-r ${colors.bg} ${colors.border} border rounded-full`}>
            <span className={`text-xs font-semibold ${colors.text} uppercase tracking-wide`}>
              {pool.status}
            </span>
          </div>
        </div>

        {/* Strength Meter */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Evidence Strength</span>
              {pool.strength >= pool.threshold && (
                <div className={`w-2 h-2 ${colors.pulse} rounded-full animate-pulse`} />
              )}
            </div>
            <span className="text-white font-semibold">{pool.strength}%</span>
          </div>
          <div className="relative">
            <div className="w-full bg-gray-700/50 rounded-full h-3">
              <div
                className={`bg-gradient-to-r ${
                  pool.strength >= pool.threshold
                    ? 'from-green-500 to-emerald-500'
                    : 'from-blue-500 to-purple-500'
                } h-3 rounded-full transition-all duration-500 relative overflow-hidden`}
                style={{ width: `${pool.strength}%` }}
              >
                {pool.strength > 0 && (
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                )}
              </div>
            </div>
            {pool.threshold && (
              <div
                className="absolute top-0 h-3 w-0.5 bg-yellow-400"
                style={{ left: `${pool.threshold}%` }}
              />
            )}
          </div>
          {pool.threshold && (
            <p className="text-xs text-gray-500 mt-1">
              Target: {pool.threshold}%
              {pool.strength >= pool.threshold && (
                <span className="text-green-400 ml-2">✓ Ready for auction</span>
              )}
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
              <DocumentTextIcon className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-white font-semibold">{pool.shards.length}</p>
              <p className="text-gray-400 text-xs">Shards</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
              <ShieldCheckIcon className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-white font-semibold">{pool.threshold}%</p>
              <p className="text-gray-400 text-xs">Threshold</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={`/dashboard/upload?poolId=${pool.id}`}
          className="group/btn relative block w-full text-center px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:shadow-2xl hover:scale-[1.02]"
        >
          <span className="flex items-center justify-center gap-2">
            Join Pool & Upload Evidence
            <ArrowRightIcon className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
          </span>
        </Link>
      </div>
    </div>
  );
}