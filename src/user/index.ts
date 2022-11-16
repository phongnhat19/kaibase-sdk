import fetch from 'cross-fetch';
import { UserModuleParams } from "./interface";

class KaibaseUser {
  private kaibaseEndpoint = '';

  private token = ''

  constructor(options: UserModuleParams) {
    this.kaibaseEndpoint = options.kaibaseEndpoint;
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

  public setUserToken(token: string) {
    this.token = token;
  }

  public async getUserInfo(token?: string) {
    const _token = token || this.token

    if (!_token) {
      throw new Error("Empty token");
    }

    const rs = await this._request({
      method: 'GET',
      path: 'user/me/',
      token: _token
    })

    return rs.json();
  }
}

export default KaibaseUser;