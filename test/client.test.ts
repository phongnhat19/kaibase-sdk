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
    const rs = await client.auth.login({username: 'account_for_demo_dapp', password: '111'})
    console.log(rs)
    expect(rs).toBeDefined();
  })

  it('Should register successfully', async () => {
    const userData = {username: 'account_for_demo_dapp', password: 'abcdef@123123!', email: 'account_for_demo_dapp@gmail.com', firstName: 'Account', lastName: 'Test'}
    const rs = await client.auth.register(userData)
    console.log(rs)
    expect(rs).toBeDefined();
  })

  it.only('Should send tx successfully', async () => {
    const rs = await client.auth.login({username: 'account_for_demo_dapp', password: 'abcdef@123123!'})
    const token = rs.access_token;
    const txData = {
      // "gas": 29000,
      // "gasPrice": 1000000000,
      "data": "",
      "to": "0xbF46aF4370890fdCf04690Ae5845b19300dA7e09",
      "value": 10000000000000000,
    }
    const tx = await client.transaction.signAndSendTransaction(txData, token)
    console.log(tx)
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
