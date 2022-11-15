import fetch from 'cross-fetch';
import { AuthModuleParams, RegisterUserParams } from "./interface";

class Auth {
  private kaibaseEndpoint = '';
  private clientId = ''
  private clientSecret = ''

  constructor(options: AuthModuleParams) {
    this.kaibaseEndpoint = options.kaibaseEndpoint;
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
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

    return fetch(`https://${this.kaibaseEndpoint}/${path}`, {
      method,
      headers: fullHeader,
      body: formBody
    })
  }

  public async login({username, password, grantType = 'password'}: {username: string, password: string, grantType?: string}) {
    const params: Record<string, any> = {
      username,
      password,
      grant_type: grantType
    }
    
    const rs = await this._request({
      method: 'POST',
      body: params,
      path: 'oauth2/token/',
      headers: {
        'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      }
    })
    
    return rs.json();
  }

  public async register(userData: RegisterUserParams) {
    const params: Record<string, any> = {
      username: userData.username,
      password: userData.password,
      email: userData.email,
      first_name: userData.firstName,
      last_name: userData.lastName
    }

    const rs = await this._request({
      method: 'POST',
      body: params,
      path: 'user/register/',
      headers: {
        'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      }
    })

    return rs.json();
  }
}

export default Auth;