import { NextRequest, NextResponse } from 'next/server';
import { getStoryClientForApi } from '@/lib/story-protocol-config';

/**
 * POST /api/story/remix
 * Remix multiple tokens into a master NFT
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mode, parentTokenIds, metadata, poolId } = body;

    if (!parentTokenIds || !metadata || !poolId) {
      return NextResponse.json(
        { error: 'Missing required fields: parentTokenIds, metadata, poolId' },
        { status: 400 }
      );
    }

    console.log(`🎨 Remixing ${parentTokenIds.length} tokens - Mode: ${mode}`);

    // Get the appropriate client (mock or real) based on mode parameter
    const storyClient = await getStoryClientForApi(mode);

    // Remix the tokens
    const masterTokenId = await storyClient.remixTokens(
      parentTokenIds,
      metadata,
      poolId
    );

    return NextResponse.json({
      success: true,
      masterTokenId,
      mode,
    });
  } catch (error) {
    console.error('❌ Error in /api/story/remix:', error);
    return NextResponse.json(
      { error: 'Failed to remix tokens', details: (error as Error).message },
      { status: 500 }
    );
  }
}
