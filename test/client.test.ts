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

  it('Should register successfully', async () => {
    const userData = {username: 'account_for_demo_dapp', password: 'abcdef@123123!', email: 'account_for_demo_dapp@gmail.com', firstName: 'Account', lastName: 'Test'}
    const rs = await client.auth.register(userData)
    console.log(rs)
    expect(rs).toBeDefined();
  })

  it('Should send tx successfully', async () => {
    const rs = await client.auth.login({username: 'account_for_demo_dapp', password: 'abcdef@123123!'})
    const token = rs.access_token;
    const txData = {
      "gas": "0x186A0",
      "data": "",
      "to": "0x09616C3d61b3331fc4109a9E41a8BDB7d9776609",
      "value": "0x2386F26FC10000"
    }
    const tx = await client.transaction.signAndSendTransaction(txData, token)
    console.log(tx)
    expect(tx).toBeDefined();
  })

  it.only('Should get user info successfully', async () => {
    const username = 'account_for_demo_dapp'
    const rs = await client.auth.login({username, password: 'abcdef@123123!'})
    const token = rs.access_token;

    client.user.setUserToken(token);
    const userData = await client.user.getUserInfo();

    expect(userData).toBeDefined();
    expect(userData.username).toEqual(username);
  });
});
