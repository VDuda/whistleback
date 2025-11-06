'use client';

import Link from 'next/link';
import { WalletConnect } from '@/components/WalletConnect';
import {
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

interface HeaderProps {
  showWallet?: boolean;
  currentPath?: string;
}

export function Header({ showWallet = true, currentPath = '/' }: HeaderProps) {
  return (
    <nav className="relative z-10 border-b border-white/10 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group cursor-pointer">
            <div className="relative">
              <ShieldCheckIcon className="w-10 h-10 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                WhistleBack
              </h1>
              <p className="text-xs text-gray-400 -mt-1">Decentralized Bounty Marketplace</p>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentPath === '/'
                  ? 'text-white bg-white/10 border border-white/20'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </Link>
            <Link
              href="/how-it-works"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentPath === '/how-it-works'
                  ? 'text-white bg-white/10 border border-white/20'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              How It Works
            </Link>
            <Link
              href="https://dorahacks.io/hackathon/legal-hack/detail"
              target="_blank"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              LegalHack 2025
            </Link>
            {showWallet && <WalletConnect />}
          </div>
        </div>
      </div>
    </nav>
  );
}
