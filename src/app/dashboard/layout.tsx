import Link from 'next/link';
import { WalletConnect } from '@/components/WalletConnect';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-3">
                <ShieldCheckIcon className="w-6 h-6 text-blue-400" />
                <span className="text-xl font-bold text-white">WhistleBack</span>
              </Link>

              <div className="flex items-center gap-6">
                <Link
                  href="/dashboard/pools"
                  className="text-gray-300 hover:text-white transition"
                >
                  Pools
                </Link>
                <Link
                  href="/dashboard/upload"
                  className="text-gray-300 hover:text-white transition"
                >
                  Upload
                </Link>
                <Link
                  href="/dashboard/tokens"
                  className="text-gray-300 hover:text-white transition"
                >
                  Tokens
                </Link>
                <Link
                  href="/dashboard/auction"
                  className="text-gray-300 hover:text-white transition"
                >
                  Auctions
                </Link>
              </div>
            </div>

            <WalletConnect />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}