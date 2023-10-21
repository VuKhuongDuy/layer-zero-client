import {createClient, waitForMessageReceived} from '@layerzerolabs/scan-client';

enum Network {
  Ethereum = 101,
  Bnb = 102,
  Avalanche = 106,
  Aptos = 108,
  Polygon = 109,
  Arbitrum = 110,
  Optimism = 111,
  Fantom = 112,
  CoreDAO = 153,
}

const rpcEndpoints = {
  [Network.Optimism]: 'https://optimism.llamarpc.com',
  [Network.Avalanche]: 'https://avax.meowrpc.com'
}

type Message = {
  srcUaAddress: string;
  dstUaAddress: string;
  srcChainId: number;
  dstChainId: number;
  dstTxHash?: string;
  dstTxError?: string;
  srcTxHash: string;
  srcBlockHash: string;
  srcBlockNumber: string;
  srcUaNonce: number;
  status: MessageStatus;
};

enum MessageStatus {
  INFLIGHT = 'INFLIGHT',
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED',
}

const getEventLog = async (rpcEndpoint: string, txHash: string) => {
  // TODO
}

const fetchEventLog = async (message: Message | any) => {
  // Initialize a client with the desired environment
  const {srcChainId, dstChainId, srcTxHash, dstTxHash} = message

  const srcRPCEndpoint = rpcEndpoints[srcChainId]
  const dstRPCEndpoint = rpcEndpoints[dstChainId]

  const srcEventLog = getEventLog(srcRPCEndpoint, srcTxHash)
  const dstEventLog = getEventLog(dstRPCEndpoint, dstTxHash)
}

const getMessage = (srcChainId, srcTxHash) => new Promise((resolve, reject) => {
  waitForMessageReceived(srcChainId, srcTxHash)
  .then((message) => {
    resolve(message)
  })
  .catch((e) => {
    reject(e)
  })
})

const fetchBySourceTxHash = async (srcChainId, srcTxHash) => {
  const message = await getMessage(srcChainId, srcTxHash);
  fetchEventLog(message);
}

fetchBySourceTxHash(Network.Avalanche, '0xb0bdab4227305b951950f740858a10f870932787d1a8489f0784383d3a3757b8')