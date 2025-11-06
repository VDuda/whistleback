import { NextRequest, NextResponse } from 'next/server';
import { constellationClient } from '@/lib/constellation';

/**
 * POST /api/constellation/add-shard
 * Add an evidence shard to a pool on Constellation Network
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mode, poolId, shard } = body;

    if (!poolId || !shard) {
      return NextResponse.json(
        { error: 'Missing required fields: poolId, shard' },
        { status: 400 }
      );
    }

    console.log(`🧩 Adding shard to pool on Constellation - Mode: ${mode}, Pool: ${poolId}`);

    // Get the constellation client
    const client = constellationClient.instance;

    // Add the shard
    const shardId = await client.addShard(poolId, shard);

    return NextResponse.json({
      success: true,
      shardId,
      mode,
    });
  } catch (error) {
    console.error('❌ Error in /api/constellation/add-shard:', error);
    return NextResponse.json(
      { error: 'Failed to add shard', details: (error as Error).message },
      { status: 500 }
    );
  }
}
