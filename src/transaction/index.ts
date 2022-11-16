import fetch from 'cross-fetch';
import Web3 from 'web3';
import { RPC_ENDPOINT } from '../constant/chain';
import { TransactionModuleParams } from "./interface";

class KaibaseTransaction {
  private kaibaseEndpoint = '';
  private clientId = ''
  private clientSecret = ''
  private chainId = 24

  constructor(options: TransactionModuleParams) {
    this.kaibaseEndpoint = options.kaibaseEndpoint;
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;

    if (options.chainId) {
      this.chainId = options.chainId
    }
  }

  public getClientHeader() {
    return {
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
    }
  }

  private async _request({method, path = '', headers = {}, body = {}, token}: {method: string, path?: string, headers?: Record<string, any>, body?: any, token?: string}) {
    const formBody = Object.keys(body).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key])).join('&');

    const fullHeader: Record<string, any> = {
      ...{
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      ...headers
    }

    if (token) {
      fullHeader['Authorization'] = `Bearer ${token}`
    }

    return fetch(`https://${this.kaibaseEndpoint}/${path}`, {
      method,
      headers: fullHeader,
      body: method === 'GET' ? undefined : formBody
    })
  }

  private async getUserInfo(token: string) {

    if (!token) {
      throw new Error("Empty token");
    }

    const rs = await this._request({
      method: 'GET',
      path: 'user/me/',
      token: token
    })

    return rs.json();
  }

  public async signAndSendTransaction(txData: Record<string, any>, token: string) {
    // Validate tx data
    if (!txData.to) {
      throw new Error('Invalid txData')
    } 

    // Get user wallet address
    const userData = await this.getUserInfo(token);
    if (!userData || !userData.wallet) {
      throw new Error('Invalid token')
    }
    const walletAddress = userData.wallet.wallet_address
    txData.from = walletAddress

    // Get address's nonce
    const httpProvider = new Web3.providers.HttpProvider(RPC_ENDPOINT[this.chainId], { timeout: 10000 })
    const web3 = new Web3(httpProvider)
    const nonce = await web3.eth.getTransactionCount(walletAddress)

    const estimatedGas = await web3.eth.estimateGas({...txData})
    console.log(estimatedGas)
    // Parse tx data
    txData.nonce = nonce;
    if (!txData.gasPrice) {
      txData.gasPrice = 1000000000
    }
    if (!txData.gas) {
      txData.gas = estimatedGas
    }

    console.log('final tx data', txData)

    const rs = await this._request({
      method: 'POST',
      body: {
        raw_data: JSON.stringify(txData)
      },
      path: 'user/send-transaction/',
      token
    })

    return rs.json();
  }
}

export default KaibaseTransaction;