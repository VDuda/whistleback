# WhistleBack MVP

**Back the whistle—build the bust.**

WhistleBack is a decentralized bounty marketplace for IRS whistleblowers. Built for LegalHack 2025.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build
pnpm start
```

## 🎯 Key Features

- **Anon Back Pools**: Join/create public pools via wallet—drop ZK-proofed tip shards anonymously
- **Incentivized Collaboration**: Earn micro-rewards for quality inputs
- **Lawyer Curation Hub**: Auto-auction pools to vetted tax lawyers
- **IP-Powered Payouts**: Mint shards as Story narrative tokens with royalty rights
- **Dispute & Tracking**: On-chain forks for IRS appeals

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (App Router) + React + TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: viem + wagmi (Wallet integration)
- **State**: Zustand
- **Blockchain Mock Integrations**:
  - Constellation Network (Metagraph pools)
  - Story Protocol (Narrative token minting)

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── dashboard/          # Dashboard pages
│   │   ├── pools/         # Evidence pools
│   │   ├── upload/        # Upload evidence
│   │   ├── tokens/        # View narrative tokens
│   │   └── auction/       # Lawyer auctions
│   ├── api/               # Mock API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/             # Reusable UI components
│   ├── WalletConnect.tsx
│   ├── PoolCard.tsx
│   ├── ShardUploader.tsx
│   └── TokenViewer.tsx
├── hooks/                  # Custom React hooks
│   ├── useWallet.ts
│   ├── usePools.ts
│   └── useTokens.ts
├── lib/                    # Utility libraries
│   ├── store.ts           # Zustand state management
│   ├── wallet.ts          # Wallet integration
│   ├── constellation.ts   # Constellation mock client
│   ├── story-protocol.ts  # Story Protocol mock client
│   └── utils.ts           # Helper functions
└── types/                  # TypeScript definitions
    └── index.ts
```

## 🔧 How It Works

1. **Connect Wallet**: Use MetaMask to connect anonymously
2. **Join Pool**: Browse and join evidence pools
3. **Upload Evidence**: Drop encrypted shards with ZK-proofs
4. **Mint Tokens**: Receive Story Protocol NFTs for your contribution
5. **Build Strength**: Watch pool strength increase as evidence aggregates
6. **Trigger Auction**: When threshold met, lawyer auction begins
7. **File & Win**: Lawyer files IRS Form 211, awards distributed via smart contracts

## 💰 Bounty Alignment

Built for LegalHack 2025 with focus on:
- **Story Protocol**: Programmable IP transformation via remixable narrative NFTs
- **Constellation Network**: RegTech tool via Metagraph compliance automation

## 🧪 Mock Demo Flow

This is a **48-hour hackathon MVP** with simulated blockchain interactions:

### Constellation Network (Mock)
- Feeless transactions simulated
- Metagraph pool creation
- Evidence aggregation with strength scoring

### Story Protocol (Mock)
- Narrative token minting
- Token remixing into master NFTs
- Royalty distribution on awards

### Demo Script
1. Connect wallet on homepage
2. Navigate to Pools → View mock pools
3. Click "Join Pool" → Redirected to upload
4. Select file → Upload encrypted shard
5. See token minted on Tokens page
6. Go to Auctions → Trigger mock auction
7. See winner selected from lawyer pool

## 🛡 Security & Privacy

- **Client-side encryption** before upload
- **ZK-proofs** for verification
- **Anonymous wallet** connections
- **No server-side storage** of sensitive data

## 📝 Notes

- This is a **hackathon MVP** with mock blockchain integrations
- Real implementations would use actual SDKs from Constellation and Story Protocol
- All transactions are simulated for demo purposes
- Forms and filing are mockups

## 📄 License

MIT License - Built with ❤️ for ethical exposés and tax justice.

## 🤝 Contributing

This is an MVP built for LegalHack 2025. PRs welcome for demo polish!

## ⚠️ Disclaimer

Not legal/financial advice—consult professionals.

---

**Built for LegalHack 2025 | LegalHackathon Submission**