const expect = require('chai').expect;
const axios = require('axios');
const aws = require('aws-sdk');

const apiGateway = new aws.APIGateway({ region: 'us-east-1' });

const { getEndpoint } = require('../../utils/getEndpoint');

describe('/HelloWorld API Route', () => {
  let endpoint;

  before(async () => {
    endpoint = await getEndpoint();
    console.log('Endpoint is ', endpoint);
  })

  it('should return the correct text', async () => {
    const res = await axios.get(`${endpoint}/HelloWorld`);
    expect(res.data).to.equal(
      `Hello World, I'm your serverless application!`
    );
  }).timeout(5000);
});
