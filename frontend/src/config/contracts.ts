// Contract addresses for Sepolia deployment
export const CONTRACTS = {
  PREDICTION_MARKET: "0xF4B4B18645c810195ef7a9bF768A0242A8325D7c",
  ENCRYPTED_BETTING: "0xB9C509d0aA9ca8B083E73531Ab06Fb81B26DC918", 
  ORACLE_INTEGRATION: "0xc5cb86FfDae958B566E0587B513DC67003fefDa0"
} as const;

export const SEPOLIA_CHAIN_ID = 11155111;

export const NETWORK_CONFIG = {
  chainId: SEPOLIA_CHAIN_ID,
  name: "Sepolia",
  rpcUrl: "https://ethereum-sepolia-rpc.publicnode.com",
  blockExplorer: "https://sepolia.etherscan.io"
};
