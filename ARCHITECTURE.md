# 🏗️ WhistleBack Architecture

## Overview

WhistleBack is a decentralized whistleblowing platform built for LegalHack 2025. It enables anonymous evidence aggregation through blockchain-powered pools with lawyer auction system.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Web3:** viem + wagmi
- **Blockchain Integrations:**
  - Constellation Network (feeless transactions, Metagraphs)
  - Story Protocol (programmable IP, narrative tokens)

## Architecture Patterns

### 1. Component Architecture
- **UI Components** - Presentational only, no business logic
- **Custom Hooks** - Encapsulate business logic and side effects
- **Store** - Centralized state management (Zustand)
- **Services** - Blockchain integrations and API calls

### 2. Data Flow
```
UI Component → Custom Hook → Store → Service Layer → Blockchain/Mock API
```

### 3. State Management (Zustand)

```typescript
// Global store structure
interface AppState {
  // Wallet state
  address: string | null;
  isConnected: boolean;

  // Pool state
  pools: Pool[];
  currentPool: Pool | null;

  // Auction state
  auctions: Auction[];
  lawyers: Lawyer[];

  // Actions
  setAddress: (address: string | null) => void;
  addPool: (pool: Pool) => void;
  // ... more actions
}
```

### 4. Custom Hooks Pattern

```typescript
// Example: usePools.ts
export function usePools() {
  const { pools, addPool, updatePool } = useStore();

  const uploadShard = useCallback(async (poolId, file, uploader) => {
    // Business logic here
    // Call constellationClient
    // Update store
  }, [addPool]);

  return { pools, uploadShard };
}
```

## Blockchain Integrations

### Constellation Network

**Current Implementation:** Mock client

The production implementation will use:
- `@constellation-labs/sdk` for Metagraph deployment
- Custom DAG structure for evidence pools
- Feeless transactions for shard uploads

**Mock Structure:**
```typescript
class ConstellationClient {
  async createPool(poolId: string, creator: string)
  async addShard(poolId: string, shard: Shard)
  async getPoolState(poolId: string)
  async submitTransaction(data: any)
}
```

### Story Protocol

**Current Implementation:** Mock tokens

Production will use:
- Story Protocol SDK for IP asset creation
- Narrative token minting
- Royalty distribution

**Mock Structure:**
```typescript
class StoryProtocolClient {
  async mintNarrativeToken(shardHash: string, metadata)
  async getTokensByOwner(address: string)
  async getRoyaltyInfo(tokenId: string)
}
```

## Key Components

### WalletConnect
- MetaMask integration
- Auto-reconnection on page refresh
- Address and connection state

### ShardUploader
- File selection with drag-drop
- Client-side encryption (AES-256)
- SHA-256 hash generation
- Mock ZK-proof generation

### PoolCard
- Evidence strength meter
- Contributor count
- Pool threshold visualization
- Join pool action

### TokenViewer
- Grid display of minted NFTs
- Metadata viewer
- Royalty information
- Pool ownership percentage

## Security Considerations

### Current Implementation (MVP)
- Client-side SHA-256 hashing
- Mock encryption (`encrypted-${hash}`)
- Mock ZK-proofs
- Anonymous wallet-only identification

### Production Requirements
- Real zero-knowledge proofs (snarkjs)
- AES-256 encryption with user key
- Secure metadata storage
- Privacy-preserving aggregation

## State Flow Examples

### 1. Upload Evidence Flow
```
1. User selects file
2. Calculate SHA-256 hash
3. Generate mock ZK-proof
4. Create encrypted payload
5. Call constellationClient.addShard()
6. Update Zustand store
7. Update pool strength
```

### 2. Auction Flow
```
1. Pool strength reaches threshold
2. System triggers auction
3. Lawyers submit bids (fee %)
4. Select winner (lowest fee + highest rating)
5. Winner receives case details
6. File IRS Form 211
7. Smart contract escrow setup
```

## API Routes

### Mock Auction Endpoint
```typescript
// app/api/mock-auction/route.ts
POST /api/mock-auction
Body: { poolId: string }
Response: { winner: Lawyer, bid: number }
```

### Mock Filing Endpoint
```typescript
// app/api/mock-filing/route.ts
POST /api/mock-filing
Body: { poolId: string, lawyerId: string }
Response: { filingId: string, status: 'submitted' }
```

## Performance Optimizations

### Current
- Static generation for public pages
- Client-side state management
- Optimized bundle size (148 kB first load)

### Planned
- Image optimization for lawyer profiles
- Lazy loading for pools
- Virtual scrolling for large token lists
- Service worker for offline support

## Testing Strategy

### Current
- Manual end-to-end testing
- TypeScript type checking
- ESLint compliance

### Planned
- Unit tests for hooks (Vitest)
- Integration tests for store
- E2E tests with Playwright
- Smart contract tests (Foundry/Hardhat)

## Deployment

### Current
- Local development: `pnpm dev` (port 3000)
- Build: `pnpm build` (static export ready)

### Production
- Vercel deployment (recommended for Next.js)
- Environment variables:
  - `NEXT_PUBLIC_RPC_URL`
  - `NEXT_PUBLIC_CONSTELLATION_ENDPOINT`
  - `NEXT_PUBLIC_STORY_PROTOCOL_ADDRESS`

## Limitations & Known Issues

1. **Mock Integrations** - Both blockchain clients are mocked
2. **No Persistence** - State lost on refresh (except wallet)
3. **Limited Error Handling** - Basic error states only
4. **No Authentication** - Wallet-only identification
5. **File Size Limits** - Not implemented (browser dependent)

## Future Enhancements

### Phase 2
- Real Constellation Metagraph deployment
- Actual Story Protocol integration
- Persistent storage (PostgreSQL + Prisma)
- Real-time WebSocket updates

### Phase 3
- Mobile app (React Native)
- Multi-signature wallet support
- Advanced ZK-proofs
- DAO governance for lawyer selection

## Development Workflow

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev

# Type check
pnpm type-check

# Lint
pnpm lint

# Build
pnpm build

# Preview production build
pnpm preview
```

## Code Style Guide

- **TypeScript:** Strict mode, no `any` types
- **Naming:** camelCase for variables/functions, PascalCase for components
- **Components:** Functional components with hooks
- **Hooks:** Custom hooks for business logic
- **Store:** Zustand with TypeScript
- **Imports:** Absolute imports with `@/` alias

## Security Best Practices

### Current Implementation
1. No sensitive data in localStorage
2. Wallet-only identification (no KYC)
3. Client-side encryption (basic)
4. Mock data only

### Production Checklist
- [ ] Audit smart contracts
- [ ] Real ZK-proof implementation
- [ ] Secure key management
- [ ] Rate limiting on uploads
- [ ] Virus scanning for uploads
- [ ] Encrypted metadata storage
- [ ] Regular security audits

---

**Built for LegalHack 2025**
Story Protocol + Constellation Network Bounty Submission
