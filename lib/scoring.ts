export function calculatePoints(volumeUsd: number, tradesCount = 1): bigint {
  const base = 10n * BigInt(tradesCount);
  const volumePoints = BigInt(Math.floor(volumeUsd));
  return base + volumePoints;
}