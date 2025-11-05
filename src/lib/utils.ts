import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Shard } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export function calculateCredibilityScore(shard: Shard, poolShards: Shard[]): number {
  // Simple scoring based on:
  // - Recency (newer is better)
  // - Verification (has ZK proof)
  // - Cross-validation (matches other shards)

  let score = 0;

  // Recency score (0-40 points)
  const hoursOld = (Date.now() - shard.timestamp) / (1000 * 60 * 60);
  score += Math.max(0, 40 - (hoursOld / 24) * 5);

  // Verification score (0-30 points)
  if (shard.proof) score += 30;

  // Cross-validation score (0-30 points)
  const matchingShards = poolShards.filter(s =>
    s.hash !== shard.hash && s.poolId === shard.poolId
  ).length;
  score += Math.min(30, matchingShards * 10);

  return Math.round(score);
}