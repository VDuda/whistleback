import { NextRequest, NextResponse } from 'next/server';
import { getStoryClientForApi } from '@/lib/story-protocol-config';

/**
 * POST /api/story/mint
 * Mint a narrative token for an evidence shard
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mode, shardHash, poolId, metadata, owner } = body;

    if (!shardHash || !poolId || !owner) {
      return NextResponse.json(
        { error: 'Missing required fields: shardHash, poolId, owner' },
        { status: 400 }
      );
    }

    console.log(`📝 Minting token - Mode: ${mode}, Shard: ${shardHash.slice(0, 8)}`);

    // Get the appropriate client (mock or real) based on mode parameter
    const storyClient = await getStoryClientForApi(mode);

    // Mint the token
    const tokenId = await storyClient.mintNarrative(
      shardHash,
      poolId,
      metadata,
      owner
    );

    return NextResponse.json({
      success: true,
      tokenId,
      mode,
    });
  } catch (error) {
    console.error('❌ Error in /api/story/mint:', error);
    return NextResponse.json(
      { error: 'Failed to mint token', details: (error as Error).message },
      { status: 500 }
    );
  }
}
