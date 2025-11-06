import { NextRequest, NextResponse } from 'next/server';
import { getStoryClientForApi } from '@/lib/story-protocol-config';

/**
 * POST /api/story/fork
 * Fork a token (for dispute cases)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mode, tokenId, metadata } = body;

    if (!tokenId || !metadata) {
      return NextResponse.json(
        { error: 'Missing required fields: tokenId, metadata' },
        { status: 400 }
      );
    }

    console.log(`🔀 Forking token ${tokenId.slice(0, 8)} - Mode: ${mode}`);

    // Get the appropriate client (mock or real) based on mode parameter
    const storyClient = await getStoryClientForApi(mode);

    // Fork the token
    const forkTokenId = await storyClient.forkToken(tokenId, metadata);

    return NextResponse.json({
      success: true,
      forkTokenId,
      mode,
    });
  } catch (error) {
    console.error('❌ Error in /api/story/fork:', error);
    return NextResponse.json(
      { error: 'Failed to fork token', details: (error as Error).message },
      { status: 500 }
    );
  }
}
