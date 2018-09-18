const expect = require('chai').expect;
const axios = require('axios');
const fs = require('fs');

describe('/HelloWorld API Route', () => {
  it('should return the correct text', async () => {
    const res = await axios.get('http://localhost:3000/HelloWorld');
    expect(res.data).to.equal(`Hello World! I am your serverless application! Pleased to meetcha!`);
  }).timeout(3000);
});
