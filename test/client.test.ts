import KaiBaseClient from '../src';

describe('Unit test', () => {
  let client: KaiBaseClient

  beforeAll(() => {
    client = new KaiBaseClient({
      kaibaseEndpoint: 'kaibase-qc.kardiachain.io',
      clientId: process.env.CLIENT_ID || '',
      clientSecret: process.env.CLIENT_SECRET || '',
      chainId: 242
    })
  })

  it('Should login successfully', async () => {
    const rs = await client.auth.login({username: 'account_for_demo_dapp', password: 'abcdef@123123!'})
    expect(rs).toBeDefined();
  })

  it('Should register successfully', async () => {
    const userData = {username: 'account_for_demo_dapp', password: 'abcdef@123123!', email: 'account_for_demo_dapp@gmail.com', firstName: 'Account', lastName: 'Test'}
    const rs = await client.auth.register(userData)
    expect(rs).toBeDefined();
  })

  it.only('Should send tx successfully', async () => {
    const rs = await client.auth.login({username: 'account_for_demo_dapp', password: 'abcdef@123123!'})
    const token = rs.access_token;
    const txData = {
      "gas": 100000,
      "gasPrice": 2000000000,
      "data": "0x0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002",
      "to": "0xBf991B0089809E07d3657eB8BDBB64F86672f6cF",
      "value": 0
    }
    const tx = await client.transaction.signAndSendTransaction(txData, token)
    expect(tx).toBeDefined();
    expect(tx.error).toBeUndefined();
  })

  it('Should get user info successfully', async () => {
    const username = 'account_for_demo_dapp'
    const rs = await client.auth.login({username, password: 'abcdef@123123!'})
    const token = rs.access_token;

    client.user.setUserToken(token);
    const userData = await client.user.getUserInfo();

    expect(userData).toBeDefined();
    expect(userData.username).toEqual(username);
  });
});
