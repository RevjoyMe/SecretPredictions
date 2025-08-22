import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { sepolia } from 'wagmi/chains'

// Zama FHEVM runs on Sepolia testnet with FHE capabilities
const chains = [
  sepolia,
  // Add other chains as needed for testing
] as const

export const config = getDefaultConfig({
  appName: 'Secret Predictions',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'default-project-id',
  chains,
  ssr: true, // For Next.js SSR
})

export { chains }
