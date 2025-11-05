import { NextResponse } from 'next/server';
import { mockLawyers } from '@/lib/mock-data';

export async function POST(request: Request) {
  const { poolId } = await request.json();

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Randomly select winner
  const winner = mockLawyers[Math.floor(Math.random() * mockLawyers.length)];

  return NextResponse.json({
    poolId,
    winner: {
      id: winner.id,
      name: winner.name,
      address: winner.address,
      successFee: winner.successFee,
      contract: `contract-${Date.now()}`,
    },
    timestamp: Date.now(),
  });
}