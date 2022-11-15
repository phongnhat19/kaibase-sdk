import { TransactionModuleParams } from "./interface";

class KaibaseTransaction {
  private fullEndpoint = '';

  constructor(options: TransactionModuleParams) {
    this.fullEndpoint = options.fullEndpoint;
  }

  private async _request({method, path = '', headers = {}, body, token}: {method: string, path?: string, headers?: Record<string, any>, body: any, token?: string}) {
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

    return fetch(`${this.fullEndpoint}/${path}`, {
      method,
      headers: fullHeader,
      body: formBody
    })
  }

  public async signAndSendTransaction(txData: Record<string, any>, token: string) {
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