export const BASE_TOKENS = {
  ETH: { symbol: "ETH", address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", decimals: 18, isNative: true },
  USDC: { symbol: "USDC", address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bDa02913", decimals: 6 },
  DEGEN: { symbol: "DEGEN", address: "0x4ed4E862860beA3e377cD9fD1B8D4F5B9bC5BfA6", decimals: 18 },
  MORPHO: { symbol: "MORPHO", address: "0xBAa9fB316D7F3a1B2f3dE4A2bA3c8B2F0B0F7C13", decimals: 18 },
  VIRTUAL: { symbol: "VIRTUAL", address: "0x0b3aC2f6a55B9A90F5F7A3A6fC9F0dC2b2b1F0F0", decimals: 18 },
  AERO: { symbol: "AERO", address: "0x940181a94A35A4569E4529A3CDfB74e38FD98631", decimals: 18 },
  BRETT: { symbol: "BRETT", address: "0x532f27101965dd16442E59d40670FaF5eBB142E4", decimals: 18 },
  TOSHI: { symbol: "TOSHI", address: "0xAC1BD07e4A42aBd3C6D5D1F52C0dE8dFf0f3A1B6", decimals: 18 },
};

export type TokenKey = keyof typeof BASE_TOKENS;

export const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
];

export const ROUTER_ABI = [
  "function swapWithFeeETH(address zeroXTarget, bytes calldata zeroXData, uint256 feeAmount, uint256 swapValue, address sellToken, address buyToken, uint256 minBuyAmount, bytes32 tradeId) external payable",
  "function swapWithFeeERC20(address sellToken, address buyToken, address zeroXTarget, bytes calldata zeroXData, uint256 feeAmount, uint256 swapAmount, uint256 minBuyAmount, bytes32 tradeId) external",
];

export function isNativeToken(symbol: string): boolean {
  const token = BASE_TOKENS[symbol as TokenKey];
  return token?.isNative || false;
}