'use client';

import Link from 'next/link';
import { Header } from '@/components/Header';
import {
  ShieldCheckIcon,
  CurrencyDollarIcon,
  UsersIcon,
  LockClosedIcon,
  ChartBarIcon,
  ScaleIcon,
  ArrowRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { useEffect, useRef } from 'react';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const animate = () => {
      if (!ctx) return;
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
      </div>

      {/* Navigation */}
      <Header currentPath="/" />

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm">
            <SparklesIcon className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300">Powered by Story Protocol × Constellation Network</span>
          </div>
        </div>

        {/* Hero Text */}
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
              Back the Whistle.
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Build the Bust.
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Crowdfund <span className="text-blue-400 font-semibold">anonymous tips</span> where multiple contributors
            drop encrypted shards into themed bounties. Aggregate weak solo claims into
            <span className="text-purple-400 font-semibold"> powerhouse IRS Form 211 filings</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Link
              href="/dashboard/pools"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:shadow-2xl hover:scale-105 flex items-center gap-2"
            >
              <span>Explore Pools</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 -z-10" />
            </Link>
            <button
              onClick={() => document.getElementById('learn-more')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl text-lg font-semibold transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20"
            >
              How It Works
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 group">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                $474M
              </div>
              <div className="text-gray-400 text-sm">IRS Collections (FY2024)</div>
            </div>
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300 group">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                73%
              </div>
              <div className="text-gray-400 text-sm">Claims Rejected</div>
            </div>
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-green-500/30 transition-all duration-300 group">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                2-3x
              </div>
              <div className="text-gray-400 text-sm">Success Rate Boost</div>
            </div>
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-yellow-500/30 transition-all duration-300 group">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                $123.5M
              </div>
              <div className="text-gray-400 text-sm">Awards Paid in 2024</div>
            </div>
          </div>

          {/* Source Citation */}
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              Data source:{' '}
              <a
                href="https://www.irs.gov/pub/irs-pdf/p5241.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                IRS Annual Report 2024 - Whistleblower Office
              </a>
            </p>
          </div>
        </div>

        {/* Features */}
        <div id="learn-more" className="mb-24">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Revolutionizing Whistleblowing
            </h3>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Transform isolated risks into collective wins through decentralized collaboration
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative bg-gradient-to-br from-blue-500/10 to-purple-500/5 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-8 hover:border-blue-500/40 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30">
                  <LockClosedIcon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">Anon Back Pools</h4>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Join public pools via wallet—drop ZK-proofed tip shards anonymously.
                  Auto-aggregate with credibility scoring from multiple sources.
                </p>
                <div className="flex items-center gap-2 text-blue-400 font-medium group-hover:translate-x-2 transition-transform">
                  <span>Learn More</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-purple-500/10 to-pink-500/5 backdrop-blur-sm border border-purple-500/20 rounded-3xl p-8 hover:border-purple-500/40 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/30">
                  <CurrencyDollarIcon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">Incentivized Collab</h4>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Earn micro-rewards and award shares for quality inputs. Smart contracts
                  auto-split proceeds (15-30% of collected awards).
                </p>
                <div className="flex items-center gap-2 text-purple-400 font-medium group-hover:translate-x-2 transition-transform">
                  <span>Learn More</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-green-500/10 to-emerald-500/5 backdrop-blur-sm border border-green-500/20 rounded-3xl p-8 hover:border-green-500/40 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-500/30">
                  <ScaleIcon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">Lawyer Curation</h4>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Auto-auction to vetted tax lawyers who weave shards into IRS-compliant
                  narratives. File Forms 211 under attorney privilege.
                </p>
                <div className="flex items-center gap-2 text-green-400 font-medium group-hover:translate-x-2 transition-transform">
                  <span>Learn More</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Built for Scale
            </h3>
            <p className="text-xl text-gray-400">
              Leveraging cutting-edge blockchain infrastructure
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-blue-500/40 transition-all duration-300 hover:scale-105 w-full md:w-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">Story Protocol</div>
                <div className="text-blue-400 text-sm mb-4">Programmable IP Layer</div>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  <span>Narrative Tokens & Remixable NFTs</span>
                </div>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-purple-500/40 transition-all duration-300 hover:scale-105 w-full md:w-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">Constellation Network</div>
                <div className="text-purple-400 text-sm mb-4">Hypergraph L0 & Metagraphs</div>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                  <span>Feeless, High-Throughput Data</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <Link href="/how-it-works">
              <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent hover:from-blue-400 hover:to-purple-400 transition-all duration-300 cursor-pointer">
                How It Works
              </h3>
            </Link>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              A quick overview of our process.{' '}
              <Link href="/how-it-works" className="text-blue-400 hover:text-blue-300 font-medium underline decoration-blue-400/50 hover:decoration-blue-300 transition">
                Read the complete 6-step guide
              </Link>{' '}
              with FAQ and lawyer network details.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Connect & Join',
                description: 'Wallet connect → Quick anon quiz for pool match',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                step: '02',
                title: 'Upload Shard',
                description: 'Drop encrypted evidence (docs, logs, proofs)',
                color: 'from-purple-500 to-pink-500',
              },
              {
                step: '03',
                title: 'Build Strength',
                description: 'Evidence aggregates → Credibility scoring',
                color: 'from-green-500 to-emerald-500',
              },
              {
                step: '04',
                title: 'Win Together',
                description: 'Award split via smart contracts',
                color: 'from-yellow-500 to-orange-500',
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-white/10 to-white/[0.03] backdrop-blur-sm border border-white/20 rounded-2xl p-6 h-full hover:border-white/40 transition-all duration-300 hover:bg-white/15">
                  <div className={`text-6xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent opacity-90 mb-4 drop-shadow-lg`}>
                    {item.step}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-gray-600">
                    <ArrowRightIcon className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
          <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Ready to Back the Whistle?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the revolution in decentralized whistleblowing. Anonymous, secure, and rewarding.
          </p>
          <Link
            href="/dashboard/pools"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl text-xl font-bold transition-all duration-300 shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
          >
            <span>Get Started Now</span>
            <ArrowRightIcon className="w-6 h-6" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 backdrop-blur-sm mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="w-6 h-6 text-blue-400" />
              <span className="text-white font-semibold">WhistleBack</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400 text-sm">LegalHack 2025</span>
            </div>
            <div className="text-gray-400 text-sm">
              Not legal/financial advice. Consult professionals.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}