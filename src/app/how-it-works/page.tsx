'use client';

import Link from 'next/link';
import {
  ShieldCheckIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  ScaleIcon,
  LockClosedIcon,
  UsersIcon,
  ChartBarIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

export default function HowItWorksPage() {
  const steps = [
    {
      number: '01',
      title: 'Connect Your Wallet',
      description: 'Securely connect your Web3 wallet (MetaMask, WalletConnect, etc.) to get started. No KYC required.',
      details: [
        'Anonymous connection - no personal data required',
        'Sign message to create anonymous identity',
        'Wallet acts as your pseudonymous identifier',
      ],
      icon: LockClosedIcon,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      number: '02',
      title: 'Browse Evidence Pools',
      description: 'Explore active whistleblowing pools organized by case type, strength, and credibility score.',
      details: [
        'Filter by: Tax fraud, Shell companies, Payroll fraud',
        'View evidence strength meter',
        'See pool threshold and current contributors',
        'Check estimated award potential',
      ],
      icon: DocumentTextIcon,
      color: 'from-purple-500 to-pink-500',
    },
    {
      number: '03',
      title: 'Upload Evidence Shard',
      description: 'Upload your encrypted evidence (documents, logs, communications) as a ZK-proofed shard.',
      details: [
        'File encrypted client-side with AES-256',
        'Generate zero-knowledge proof for verification',
        'Upload to Constellation Metagraph (feeless)',
        'Receive narrative token on Story Protocol',
      ],
      icon: ShieldCheckIcon,
      color: 'from-green-500 to-emerald-500',
    },
    {
      number: '04',
      title: 'Pool Strength Builds',
      description: 'Watch the pool\'s evidence strength increase as more contributors add verified shards.',
      details: [
        'Real-time credibility scoring',
        'Cross-validation with other shards',
        'Strength meter visual feedback',
        'Early contributor bonus rewards',
      ],
      icon: ChartBarIcon,
      color: 'from-yellow-500 to-orange-500',
    },
    {
      number: '05',
      title: 'Lawyer Auction Triggers',
      description: 'When threshold reached (e.g., 75% strength), vetted lawyers bid to take the case.',
      details: [
        'Auto-auction to preselected tax lawyers',
        'Bid on success fee percentage',
        'Lawyer reviews aggregated evidence',
        'Winner files IRS Form 211',
      ],
      icon: ScaleIcon,
      color: 'from-indigo-500 to-purple-500',
    },
    {
      number: '06',
      title: 'Award Distribution',
      description: 'Upon IRS award, smart contracts auto-split proceeds according to contribution.',
      details: [
        '70% to evidence contributors (pro-rata)',
        '20% to winning lawyer (success fee)',
        '10% to WhistleBack protocol',
        'Royalties from narrative token licensing',
      ],
      icon: CurrencyDollarIcon,
      color: 'from-pink-500 to-rose-500',
    },
  ];

  const benefits = [
    {
      title: 'Diffused Risk',
      description: 'Multiple contributors share the whistleblowing risk',
      icon: UsersIcon,
    },
    {
      title: 'Higher Success Rate',
      description: 'Aggregate evidence is 2-3x more likely to succeed',
      icon: CheckCircleIcon,
    },
    {
      title: 'Maximum Anonymity',
      description: 'ZK-proofs and encryption protect your identity',
      icon: LockClosedIcon,
    },
    {
      title: 'Fair Compensation',
      description: 'Smart contracts ensure transparent award splitting',
      icon: CurrencyDollarIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm mb-8">
            <span className="text-sm text-blue-300">Complete User Guide</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
            How WhistleBack Works
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A step-by-step guide to decentralized whistleblowing. From anonymous connection
            to IRS award distribution - everything you need to know.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 mb-24">
          {steps.map((step, index) => (
            <div key={index} className="group relative">
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all duration-500">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Step Number & Icon */}
                  <div className="flex items-start gap-6 lg:w-1/3">
                    <div className="flex-shrink-0">
                      <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <step.icon className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <div>
                      <div className="text-5xl font-bold bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent mb-2">
                        {step.number}
                      </div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-2/3">
                    <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                      {step.description}
                    </p>
                    <ul className="space-y-3">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-400">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Arrow connector (except last item) */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center mt-8">
                    <ArrowRightIcon className="w-8 h-8 text-gray-600" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Why Use WhistleBack?
            </h2>
            <p className="text-xl text-gray-400">
              Traditional solo whistleblowing is risky and often rejected. We fix that.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* The Problem */}
        <div className="mb-24">
          <div className="bg-gradient-to-br from-red-500/10 to-orange-500/5 border border-red-500/20 rounded-3xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <ShieldCheckIcon className="w-8 h-8 text-red-400" />
              The Problem We&apos;re Solving
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">73% Rejection Rate</h3>
                <p className="text-sm leading-relaxed">
                  The IRS rejected nearly three-quarters of whistleblower claims in FY2024,
                  primarily due to weak, isolated evidence and lack of corroboration.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Solo Risk</h3>
                <p className="text-sm leading-relaxed">
                  Individual whistleblowers face maximum retaliation risk with no guarantee of success
                  or compensation, creating a strong disincentive to report.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Evidence Fragmentation</h3>
                <p className="text-sm leading-relaxed">
                  Relevant evidence often sits with multiple people who are unwilling to come
                  forward individually due to safety concerns.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">No IP Value</h3>
                <p className="text-sm leading-relaxed">
                  Contributors receive no ongoing value from their evidence even if it leads to
                  massive IRS collections and media coverage.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* The Solution */}
        <div className="mb-24">
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 rounded-3xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <CheckCircleIcon className="w-8 h-8 text-green-400" />
              The WhistleBack Solution
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Collective Evidence</h3>
                <p className="text-sm leading-relaxed">
                  Aggregate multiple evidence shards into a compelling, corroborated case that&apos;s
                  2-3x more likely to succeed than solo submissions.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Shared Risk</h3>
                <p className="text-sm leading-relaxed">
                  Distribute whistleblowing risk across multiple contributors, making it safer
                  for everyone involved while maintaining anonymity.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Professional Curation</h3>
                <p className="text-sm leading-relaxed">
                  Vetted tax lawyers handle IRS filing complexity, ensuring Form 211 compliance
                  and maximizing award potential.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Tokenized IP</h3>
                <p className="text-sm leading-relaxed">
                  Your evidence becomes a narrative token with ongoing royalty rights from
                  licensing deals and media coverage.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-3">Is my identity protected?</h3>
              <p className="text-gray-400 text-sm">
                Yes. All uploads use client-side encryption and ZK-proofs. Your wallet address
                is your only identifier, and lawyers only see aggregated evidence.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-3">What if the IRS rejects the claim?</h3>
              <p className="text-gray-400 text-sm">
                Pooled evidence has a much higher success rate, but if rejected, shards remain
                encrypted and can potentially be used in future pool formations.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white-10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-3">How are lawyers vetted?</h3>
              <p className="text-gray-400 text-sm">
                Our network includes IRS whistleblower specialists with proven track records.
                Lawyers compete via auctions, ensuring you get the best terms.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-3">What types of evidence work?</h3>
              <p className="text-gray-400 text-sm">
                Documents, financial records, communications, photos, videos, or any digital
                evidence related to tax fraud or non-compliance.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-3">When do I receive my award?</h3>
              <p className="text-gray-400 text-sm">
                IRS awards typically take 6-18 months to process. Smart contracts automatically
                distribute funds upon receipt.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-3">Can I withdraw my evidence?</h3>
              <p className="text-gray-400 text-sm">
                Yes, you can eject your shard anytime before the lawyer auction begins.
                Once filed, evidence becomes part of the legal case.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
          <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Ready to Make a Difference?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the revolution in ethical whistleblowing. Your evidence could help recover
            billions in unpaid taxes while keeping you safe and rewarded.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard/pools"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl text-xl font-bold transition-all duration-300 shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
            >
              <span>Explore Pools</span>
              <ArrowRightIcon className="w-6 h-6" />
            </Link>
            <Link
              href="/dashboard/auction"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white/5 hover:bg-white/10 text-white rounded-2xl text-xl font-bold transition-all duration-300 border border-white/10 hover:border-white/20"
            >
              <span>View Lawyers</span>
            </Link>
          </div>
          <p className="text-gray-400 text-sm mt-6">
            Not legal/financial advice. Consult professionals before participating.
          </p>
        </div>
      </div>
    </div>
  );
}