export enum ChainId {
  MAINNET = 24,
  TESTNET = 242
}

export enum NetworkId {
  MAINNET = 0,
  TESTNET = 69
}

export const RPC_ENDPOINT: Record<number, string> = {
  [ChainId.MAINNET]: 'https://rpc.kardiachain.io',
  [ChainId.TESTNET]: 'https://dev.kardiachain.io'
}
