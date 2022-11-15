import Auth from "./auth";
import KaibaseTransaction from "./transaction";

interface KaiBaseClientProps {
  kaibaseEndpoint: string;
  clientId: string;
  clientSecret: string;
  chainId?: number;
}

class KaiBaseClient {

  public auth: Auth
  public transaction: KaibaseTransaction

  constructor(options: KaiBaseClientProps) {

    this.auth = new Auth(options)

    this.transaction = new KaibaseTransaction(options);
  }
}

export default KaiBaseClient;