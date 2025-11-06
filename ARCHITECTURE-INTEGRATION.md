# How Story Protocol & Constellation Network Work Together in WhistleBack

*Generated: 2025-11-06*
*Understanding the dual-blockchain architecture*

---

## Architecture Overview

**WhistleBack uses BOTH networks for different purposes:**

```
┌─────────────────────────────────────────────────────────────────┐
│                    WhistleBack Application                      │
└────────────────────┬────────────────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
         ▼                       ▼
┌─────────────────┐   ┌────────────────────────┐
│  Constellation  │   │     Story Protocol     │
│    Network      │   │                        │
│                 │   │                        │
│  • Evidence     │   │  • Narrative Tokens   │
│  • Pools        │   │  • IP Assets          │
│  • Shards       │   │  • NFTs               │
│  • Feeless Tx   │   │  • Royalties          │
└─────────────────┘   └────────────────────────┘
         │                       │
         │                       │
         ▼                       ▼
   Metagraph DAG          Ethereum L2
   (DAG-based)           (Blockchain)
```

---

## How They're Used Together

### Evidence Upload Flow

When you upload a file in WhistleBack:

```
1. User selects file
   ↓
2. File encrypted & hashed (SHA-256)
   ↓
3. Two parallel operations:
   ┌─────────────────────┬─────────────────────┐
   ▼                     ▼                     │
Constellation          Story Protocol         │
   │                     │                     │
   • Create shard        • Mint NFT            │
   • Add to pool         • Register IP Asset   │
   • Store metadata      • Attach royalty      │
   │                     │                     │
   └─────────┬───────────┴─────────────┬───────┘
             │                       │
             ▼                       ▼
        Evidence stored        Token represents
        on Constellation       ownership on Story
             │                       │
             └───────┬───────────────┘
                     │
                     ▼
              Complete upload!
```

**Both need wallet connection!**

---

## Why Both Networks?

### Constellation Network - "The Evidence Layer"

**Purpose**: Store and validate evidence
**Benefits**:
- ✅ **Feeless transactions** (no gas fees!)
- ✅ **DAG-based** (faster than blockchain)
- ✅ **Custom Metagraphs** (tailored logic for evidence)
- ✅ **Good for data** (evidence storage, pool management)

**What it does in WhistleBack**:
- Creates evidence pools
- Stores encrypted evidence shards
- Manages pool strength & thresholds
- Coordinates lawyer auctions
- Feeless data operations

### Story Protocol - "The Ownership Layer"

**Purpose**: Represent ownership with NFTs
**Benefits**:
- ✅ **Ethereum ecosystem** (uses MetaMask)
- ✅ **IP-friendly** (designed for IP assets)
- ✅ **Composable NFTs** (can remix, fork, license)
- ✅ **Royalty system** (built-in revenue sharing)

**What it does in WhistleBack**:
- Mints narrative tokens for each evidence shard
- Creates master NFTs when pool is complete
- Tracks ownership & royalties
- Enables token remixing & forking
- Distributes awards to contributors

---

## Do You Need a Wallet?

### **YES - Both networks require wallets**

#### For Story Protocol:
- **Wallet**: MetaMask (works perfectly!)
- **Purpose**: Sign transactions, pay gas fees
- **Setup**: Add Story TestNet to existing MetaMask

#### For Constellation Network:
- **Wallet**: Stargazer (different wallet!)
- **Purpose**: Sign transactions, send data
- **Setup**: Install Stargazer browser extension or mobile app

---

## Current Implementation Status

### What's Real vs Mock

| Feature | Story Protocol | Constellation |
|---------|---------------|---------------|
| **Current Status** | Mock by default | Mock by default |
| **When Real Mode** | With STORY_MODE=real | Not yet implemented |
| **Wallet Required** | Yes (MetaMask) | Yes (Stargazer) |
| **Tokens Needed** | IP + STORY tokens | Feeless, but may need for metagraph |
| **Complexity** | Easy (10 min setup) | Hard (30+ min) |

---

## Integration in Code

### File: `src/components/ShardUploader.tsx:34-72`

```typescript
const handleUpload = async () => {
  // Step 1: Upload to Constellation (evidence storage)
  const shard = await uploadShard(poolId, file, address);
  // ↑ Uses Constellation network

  // Step 2: Mint token on Story (ownership)
  const tokenId = await mintToken(shard.hash, poolId, address);
  // ↑ Uses Story Protocol
};
```

### File: `src/hooks/usePools.ts:44-82`

```typescript
const uploadShard = useCallback(async (
  poolId: string,
  file: File,
  uploader: string  // Wallet address
) => {
  // Constellation operations
  const hash = await sha256(file);
  const shard = await constellationClient.addShard(poolId, {
    hash,
    uploader,  // Wallet address required
    // ...
  });
  return shard;
}, [addShard]);
```

### File: `src/hooks/useTokens.ts:41-72`

```typescript
const mintToken = useCallback(async (
  shardHash: string,
  poolId: string,
  owner: string  // Wallet address
) => {
  // Story Protocol operations
  const tokenId = await storyClient.instance.mintNarrative(
    shardHash,
    poolId,
    { /* metadata */ },
    owner  // Wallet address required
  );
  return tokenId;
}, []);
```

---

## Wallet Requirements Summary

### Story Protocol (Ethereum L2)

**Wallet**: Your existing MetaMask ✅
**Setup**:
1. Add Story network to MetaMask (5 min)
2. Get test tokens from faucet (2 min)
3. Extract private key (1 min)
4. Enable with `export STORY_MODE=real`

**Does wallet work? YES!** 🎉

### Constellation Network (DAG)

**Wallet**: Stargazer (new wallet) ⚠️
**Setup**:
1. Install Stargazer browser extension
2. Create new wallet
3. Get test tokens from Constellation faucet
4. Configure private key for metagraph

**Does MetaMask work? NO** ❌

---

## Testing the Integration

### Current Mock Mode (No Wallet Needed for Testing UI)

```bash
npm run dev
```

This works without any wallet because everything is mocked. You can:
- See the UI
- Browse pools
- View mock tokens
- Test all flows

But transactions are fake.

### Real Story Protocol (MetaMask Works!)

```bash
npm install @story-protocol/sdk viem
export STORY_MODE=real
npm run dev
```

With this:
- Real Story Protocol transactions
- MetaMask integration works ✅
- Need Story TestNet tokens

### Real Constellation (Stargazer Required)

Currently **not implemented** in WhistleBack. To implement:
1. Install Stargazer wallet
2. Use metagraph examples: `/metagraph-examples/examples/`
3. Implement real Constellation client
4. Replace mock in `src/lib/constellation.ts`

**MetaMask won't work** - must use Stargazer.

---

## Why This Architecture?

### 1. **Separation of Concerns**
- **Constellation**: Handles evidence (data, storage, validation)
- **Story**: Handles ownership (NFTs, tokens, royalties)

### 2. **Best of Both Worlds**
- **Feeless** evidence uploads (Constellation)
- **Rich** ownership tracking (Story)
- **Composable** tokens (Story)
- **Scalable** data (Constellation DAG)

### 3. **Real-World Fit**
- Evidence needs **secure, feeless storage**
- Ownership needs **Ethereum ecosystem** (MetaMask, exchanges, etc.)
- Royalties need **smart contracts** (Story's built-in royalty module)

---

## Flow Diagram

```
User uploads evidence file
        ↓
┌─────────────────────┐
│  WhistleBack App    │
└──────────┬──────────┘
           │
           ▼
   ┌───────────────┐
   │  Wallet Addr  │ ← User's wallet address
   └───────┬───────┘
           │
           ▼
   ┌───────────────┐
   │  File Hash    │ ← SHA-256
   └───────┬───────┘
           │
   ┌───────┴───────┐
   ▼               ▼
┌─────────┐   ┌──────────────┐
│Constella│   │   Story      │
│tion     │   │  Protocol    │
│         │   │              │
│• Pool   │   │• NFT mint    │
│• Shard  │   │• IP Asset    │
│• Meta   │   │• License     │
│• Feeless│   │• Royalty     │
└────┬────┘   └──────┬───────┘
     │               │
     └───────┬───────┘
             │
             ▼
      Complete Upload!
```

---

## Future Implementation

### Phase 1: Story Protocol (Ready Now ✅)
- [x] Integration complete
- [x] MetaMask support
- [x] TestNet working
- [ ] Production launch

### Phase 2: Constellation (Planned)
- [ ] Real Constellation client
- [ ] Stargazer wallet integration
- [ ] Custom metagraph deployment
- [ ] Feeless evidence uploads
- [ ] Dual-wallet support

---

## Key Files

### Understanding the Architecture
- `src/components/ShardUploader.tsx` - Upload flow (uses both networks)
- `src/lib/constellation.ts` - Constellation client (currently mocked)
- `src/lib/story-protocol-real.ts` - Story client (real implementation ready)
- `src/hooks/usePools.ts` - Pool operations (uses Constellation)
- `src/hooks/useTokens.ts` - Token operations (uses Story)

### Testing
- `TESTING-GUIDE.md` - How to test with real networks
- `SETUP-STORY-TESTNET.md` - Story Protocol setup
- `metagraph-examples/` - Constellation examples

---

## Answer to Your Questions

### Q: Do I need a wallet to interact with Constellation?

**YES** - In production, you need a wallet (Stargazer) to sign transactions.

**BUT** - In WhistleBack's current mock mode, you can test the UI without any wallet.

### Q: How are Story and Constellation built together?

They work in **parallel** during upload:
1. Same wallet address is used for both
2. Same evidence hash is used for both
3. Constellation stores the evidence
4. Story creates the NFT token
5. Both transactions happen when you upload

**In the app**: Both need wallet connection, but MetaMask only works for Story, not Constellation.

### Q: Can you verify how this project is built?

**Current Status**:
- ✅ **Story Protocol**: Fully integrated, can use real TestNet with MetaMask
- ✅ **Constellation**: Fully mocked, ready for real implementation
- ✅ **Integration**: Both work together in the upload flow
- ⚠️ **Constellation Reality**: Requires Stargazer wallet, not MetaMask

**Testing Now**:
- Mock mode works without any wallet
- Story TestNet works with your MetaMask
- Constellation needs Stargazer (not implemented yet)

---

## Summary

**WhistleBack's Dual-Blockchain Architecture**:
- **Constellation**: Evidence storage (feeless, DAG, Stargazer wallet)
- **Story Protocol**: NFT tokens (Ethereum L2, MetaMask wallet)
- **Both**: Require wallet connection
- **Story**: MetaMask works ✅
- **Constellation**: MetaMask doesn't work ❌ (needs Stargazer)

**Ready to test**:
- Start with Story Protocol (your MetaMask works!)
- Add Constellation later (needs Stargazer wallet)

🎯 **Next step**: Test Story Protocol with your MetaMask to see the dual-network flow in action!
