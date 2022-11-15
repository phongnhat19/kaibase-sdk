import Auth from "./auth";
import { ChainId } from "./constant/chain";
import KaibaseTransaction from "./transaction";

interface KaiBaseClientProps {
  kaibaseEndpoint: string;
  clientId: string;
  clientSecret: string;
  chainId?: number;
}

class KaiBaseClient {
  public chainId = ChainId.MAINNET
  private kaibaseEndpoint = ''
  private clientId = ''
  private clientSecret = ''

  public auth: Auth
  public transaction: KaibaseTransaction

  constructor(options: KaiBaseClientProps) {
    this.kaibaseEndpoint = options.kaibaseEndpoint;
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;

    this.auth = new Auth({
      fullEndpoint: `https://${this.clientId}:${this.clientSecret}@${this.kaibaseEndpoint}`
    })

    this.transaction = new KaibaseTransaction({
      fullEndpoint: `https://${this.clientId}:${this.clientSecret}@${this.kaibaseEndpoint}`
    });

    if (options.chainId) {
      this.chainId = options.chainId;
    }
  }

}

export default KaiBaseClient;