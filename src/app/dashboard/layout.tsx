import Link from 'next/link';
import { WalletConnect } from '@/components/WalletConnect';
import { Header } from '@/components/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      {/* Main Header */}
      <Header currentPath="/dashboard" />

      {/* Dashboard Navigation */}
      <nav className="border-b border-white/10 bg-black/50 backdrop-blur sticky top-[85px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-6">
            <Link
              href="/dashboard/pools"
              className="px-4 py-2 text-sm text-gray-300 hover:text-white transition"
            >
              Pools
            </Link>
            <Link
              href="/dashboard/upload"
              className="px-4 py-2 text-sm text-gray-300 hover:text-white transition"
            >
              Upload
            </Link>
            <Link
              href="/dashboard/tokens"
              className="px-4 py-2 text-sm text-gray-300 hover:text-white transition"
            >
              Tokens
            </Link>
            <Link
              href="/dashboard/auction"
              className="px-4 py-2 text-sm text-gray-300 hover:text-white transition"
            >
              Auctions
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}