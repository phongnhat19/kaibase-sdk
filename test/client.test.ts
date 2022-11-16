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
      "gas": 1000000,
      // "gasPrice": 1000000000,
      "data": "0x000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000001",
      "to": "0x617c0B8778fD94031bc945cf03B9E4074AA5f946",
      "value": 0,
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
