const expect = require('chai').expect;
const axios = require('axios');

describe('/HelloWorld API Route', () => {
  it('should return the correct text', async () => {
    const res = await axios.get('http://localhost:3000/HelloWorld');
    expect(res.data).to.equal(`Hello World, I'm your serverless application!`);
  }).timeout(3000);
});
