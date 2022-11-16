import Auth from "./auth";
import KaibaseTransaction from "./transaction";
import KaibaseUser from "./user";

interface KaiBaseClientProps {
  kaibaseEndpoint: string;
  clientId: string;
  clientSecret: string;
  chainId?: number;
}

class KaiBaseClient {

  public auth: Auth
  public transaction: KaibaseTransaction
  public user: KaibaseUser

  constructor(options: KaiBaseClientProps) {

    this.auth = new Auth(options)
    this.transaction = new KaibaseTransaction(options);
    this.user = new KaibaseUser(options)
  }
}

export default KaiBaseClient;