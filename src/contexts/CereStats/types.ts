export interface ActiveEraData {
  era: number;
  reward_point: RewardPoint; // You might want to change `any` to a more specific type if possible
}

export interface RewardPoint {
  era: number;
}

export interface CereStatsContextInterface {
  fetchEraPoints: (v: string, e: number) => Promise<ActiveEraData[]>;
  payouts: any;
  // The Cere Stats does not currently support `poolClaims`.
  // We need it to maintain consistency with the `useSubscan` hook and for possible future support of `poolClaims`.
  poolClaims: [];
  unclaimedPayouts: [];
}
