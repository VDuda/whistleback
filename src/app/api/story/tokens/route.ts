import { NextRequest, NextResponse } from 'next/server';
import { getStoryClientForApi } from '@/lib/story-protocol-config';

/**
 * GET /api/story/tokens
 * Get all narrative tokens
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('mode') as 'mock' | 'real' || 'mock';

    console.log(`📜 Fetching all tokens - Mode: ${mode}`);

    // Get the appropriate client (mock or real) based on mode parameter
    const storyClient = await getStoryClientForApi(mode);

    // Get all tokens
    const tokens = await storyClient.getAllTokens();

    return NextResponse.json({
      success: true,
      tokens,
      count: tokens.length,
      mode,
    });
  } catch (error) {
    console.error('❌ Error in /api/story/tokens:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tokens', details: (error as Error).message },
      { status: 500 }
    );
  }
}
