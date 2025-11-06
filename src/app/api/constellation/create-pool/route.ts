import { NextRequest, NextResponse } from 'next/server';
import { constellationClient } from '@/lib/constellation';

/**
 * POST /api/constellation/create-pool
 * Create an evidence pool on Constellation Network
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mode, poolId, creator, company, name, description, threshold } = body;

    if (!poolId || !creator || !company || !name) {
      return NextResponse.json(
        { error: 'Missing required fields: poolId, creator, company, name' },
        { status: 400 }
      );
    }

    console.log(`🏊 Creating pool on Constellation - Mode: ${mode}, Pool: ${poolId}`);

    // Get the constellation client
    const client = constellationClient.instance;

    // Create the pool
    const txId = await client.createPool(
      poolId,
      creator,
      company,
      name,
      description,
      threshold
    );

    return NextResponse.json({
      success: true,
      txId,
      mode,
    });
  } catch (error) {
    console.error('❌ Error in /api/constellation/create-pool:', error);
    return NextResponse.json(
      { error: 'Failed to create pool', details: (error as Error).message },
      { status: 500 }
    );
  }
}
