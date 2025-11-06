# WhistleBack MVP

![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=flat-square&logo=next.js)
![Status](https://img.shields.io/badge/Status-LegalHack%202025%20Submission-success?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
[![Built for Story Protocol](https://img.shields.io/badge/Story%20Protocol-Programmable%20IP-purple?style=flat-square)](https://storyprotocol.xyz)
[![Built on Constellation](https://img.shields.io/badge/Constellation-Hypergraph%20L0-blueviolet?style=flat-square)](https://constellationnetwork.io)

**Back the whistle—build the bust.**

WhistleBack is a decentralized bounty marketplace for IRS whistleblowers. Built for LegalHack 2025.

**Live Demo:** https://whistleback.vercel.app

**Demo Video:** https://go.diginomad.xyz/legal-hack-demo-video

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

## 💼 What Users Access

WhistleBack provides a **seamless Web3 experience** with minimal wallet friction:

### As a User, You Get:

✅ **Evidence Pools** - Browse and join public pools for tax fraud cases
✅ **Anonymous Uploads** - Submit evidence without revealing identity
✅ **Narrative Tokens** - Receive NFTs for your evidence contributions
✅ **Real-Time Pool Strength** - Watch evidence aggregate in real-time
✅ **Lawyer Auctions** - Automatic bidding when evidence threshold met
✅ **Award Tracking** - Monitor IRS bounty progress and award distribution
✅ **Token Portfolio** - View all your narrative tokens and royalties

### How It Works (User View):

1. **Connect MetaMask** (your only wallet needed!)
2. **Browse Pools** - View active tax fraud evidence pools
3. **Upload Evidence** - Drag & drop documents, logs, communications
4. **Receive Token** - NFT minted on Story Protocol automatically
5. **Track Progress** - See pool strength increase, auction trigger
6. **Claim Award** - Receive share when IRS processes case

### Wallet Requirements:

**Users primarily use MetaMask for Story Protocol, with Constellation handled invisibly by the backend.**

🟢 **MetaMask** (Required for Story Protocol)
- Connects to Story TestNet
- Signs token minting transactions
- Receives narrative NFTs

🔴 **Stargazer** (Optional advanced feature, not required!)
- Not needed for basic use
- Backend handles Constellation interactions
- Future power user option

**This gives you simple UX AND powerful backend - best of both worlds!** 🚀

## 🏗️ Architecture & Network Relationship

WhistleBack uses a **dual-blockchain architecture** that combines the best of both networks:

### The Relationship

```
Story NFT (0xNFT_001)
  └── metadata.hash: "0xabc123..."
       └─→ Points to ←┐
                     │
  Constellation Evidence (DAG_Tx_789)
    └── hash: "0xabc123..." ←┘
```

**They're complementary, not sequential!** 🎉

### What Each Network Does

**Story Protocol (Ethereum L2)**
- ✅ NFT ownership and minting
- ✅ Token remixing and forking
- ✅ Royalty distribution
- ✅ License management
- ✅ MetaMask support

**Constellation Network (DAG)**
- ✅ Feeless evidence storage
- ✅ Large file encryption
- ✅ Custom metagraph logic
- ✅ High-performance DAG consensus
- ✅ Backend handling (invisible to users)

### How They Link

The **SHA-256 hash** of your evidence file is the bridge:
1. Evidence uploaded → Constellation stores encrypted data
2. Hash generated → Story Protocol mints NFT with hash in metadata
3. Both reference the same hash → Cryptographic link established
4. Verification possible → Anyone can confirm NFT matches evidence

This design gives you:
- **Story**: Full Ethereum ecosystem (NFTs, royalties, remix)
- **Constellation**: Scalable, feeless data storage
- **Best of both worlds!** 🌟

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
- **TestNet Integrations**:
  - Constellation Network (Metagraph pools)
  - Story Protocol (Narrative token minting)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Landing page with particle animation
│   ├── layout.tsx         # Root layout
│   ├── how-it-works/      # Comprehensive guide page
│   ├── dashboard/         # Dashboard routes
│   │   ├── layout.tsx     # Dashboard layout with navigation
│   │   ├── pools/         # Evidence pool browser
│   │   ├── upload/        # File upload interface
│   │   │   └── upload-page-client.tsx
│   │   ├── tokens/        # Narrative token viewer
│   │   └── auction/       # Lawyer auction system
│   └── api/               # API endpoints
│       ├── mock-auction/
│       └── mock-filing/
├── components/             # Reusable UI components
│   ├── Header.tsx         # Shared navigation header
│   ├── WalletConnect.tsx  # MetaMask wallet connection
│   ├── PoolCard.tsx       # Pool display component
│   ├── ShardUploader.tsx  # File upload component
│   └── TokenViewer.tsx    # NFT gallery display
├── hooks/                  # Custom React hooks
│   ├── useWallet.ts       # Wallet connection logic
│   ├── usePools.ts        # Pool management
│   └── useTokens.ts       # Token operations
├── lib/                    # Business logic & integrations
│   ├── store.ts           # Zustand state management
│   ├── wallet.ts          # viem wallet integration
│   ├── constellation.ts   # Constellation client
│   ├── story-protocol.ts  # Story Protocol client
│   ├── mock-data.ts       # Test data
│   └── utils.ts           # Helper utilities
└── types/                  # TypeScript definitions
    └── index.ts           # Core interfaces (Pool, Shard, Lawyer)
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

## 🧪 TestNet Demo

This is a **LegalHack 2025 MVP** running on TestNet:

### Constellation Network (TestNet)
- Feeless transactions
- Metagraph pool creation
- Evidence aggregation with strength scoring

### Story Protocol (TestNet)
- Narrative token minting
- Token remixing into master NFTs
- Royalty distribution on awards

### Demo Flow
1. Connect wallet on homepage
2. Navigate to Pools → View evidence pools
3. Click "Join Pool" → Redirected to upload
4. Select file → Upload encrypted shard
5. See token minted on Tokens page
6. Go to Auctions → Trigger auction
7. See winner selected from lawyer pool

## 🛡 Security & Privacy

- **Client-side encryption** before upload
- **ZK-proofs** for verification
- **Anonymous wallet** connections
- **No server-side storage** of sensitive data

## 📝 Notes

- This is a **LegalHack 2025 MVP** running on TestNet
- Integrated with TestNet deployments of Constellation and Story Protocol
- Transactions processed on TestNet for demonstration
- Forms and filing are for demo purposes

## 📚 Sources

- [IRS Annual Report 2024 - Whistleblower Office](https://www.irs.gov/pub/irs-pdf/p5241.pdf)
- [IRS Tax Gap Statistics](https://www.irs.gov/statistics/soi-tax-stats-tax-gap statistics)

## 📄 License

MIT License - Built with ❤️ for ethical exposés and tax justice.

## 👤 Author

**Solo Developer:** [VDuda](https://github.com/VDuda)

Built independently for LegalHack 2025.

## 🤝 Contributing

This is an MVP built for LegalHack 2025. PRs welcome for demo polish!

## ⚠️ Disclaimer

Not legal/financial advice—consult professionals.

---

**Built for LegalHack 2025 | LegalHackathon Submission**