# Quick Start Guide

## Development (Mock Mode) - No Setup Required

```bash
# Start immediately with mock data
npm run dev
```

Open http://localhost:3000 and you're ready to go!

## Real TestNet Integration

### Step 1: Install Dependencies
```bash
pnpm install @story-protocol/core-sdk viem
```

### Step 2: Setup Wallets

**Story Protocol (MetaMask):**
1. Install MetaMask browser extension
2. Add Story TestNet: https://odyssey.storyscan.xyz/?deployContract=1
3. Get test ETH: https://odyssey.storyscan.xyz/faucet
4. Export private key (starts with `0x`)

**Constellation (Stargazer):**
1. Install Stargazer wallet
2. Switch to testnet in settings
3. Export private key (32-character base58)

### Step 3: Configure Environment
```bash
cp .env.testnet.example .env.testnet
```

Edit `.env.testnet`:
```env
STORY_MODE=real
STORY_PRIVATE_KEY=your_metaMask_private_key_here

CONSTELLATION_MODE=real
CONSTELLATION_PRIVATE_KEY=your_stargazer_private_key_here
```

### Step 4: Run
```bash
npm run dev
```

## What's Working

✅ Story Protocol integration (mint NFTs, manage IP)
✅ Constellation integration (store encrypted evidence)
✅ Hash-based linking between networks
✅ Mock mode (no setup needed)
✅ Real mode (full TestNet)
✅ Seamless configuration switching

## Architecture

```
Story Protocol (L2)        ←→        Constellation (DAG)
  - NFTs/IP Assets                   - Evidence Storage
  - Public Registry                  - Encrypted Data
  - Royalties                        - Feeless TX
  - MetaMask                         - Stargazer (backend)
       ↓                                     ↓
  User Interacts                     Backend Handles
```

## Files Created

**Core Implementation:**
- `src/lib/story-protocol-config.ts` - Configuration
- `src/lib/story-protocol-real.ts` - Real client
- `src/lib/constellation.ts` - Dual-mode client
- `src/lib/constellation-real.ts` - Real DAG client
- `src/types/index.ts` - Type definitions

**Documentation:**
- `SETUP-GUIDE.md` - Detailed setup instructions
- `IMPLEMENTATION-SUMMARY.md` - Complete overview
- `ARCHITECTURE-INTEGRATION.md` - Technical details

## Support

For detailed information, see:
- **Setup**: `SETUP-GUIDE.md`
- **Architecture**: `ARCHITECTURE-INTEGRATION.md`
- **Wallets**: `WALLET-COMPATIBILITY.md`
- **Summary**: `IMPLEMENTATION-SUMMARY.md`
