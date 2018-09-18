const expect = require('chai').expect;
const { stub } = require('sinon');
const aws = require('aws-sdk');

const apigateway = new aws.APIGateway({ region: 'us-east-1' });

const { fetchEndpoint, getEndpoint } = require('../integration/utils/getEndpoint');

// stub service
let apigatewayStub = stub(apigateway, 'getRestApis');
apigatewayStub.returns({
  promise: () => {
    return Promise.resolve({
      items: [
        {
          id: 'testId',
          name: 'testAPIName',
          description: 'an API',
          createdDate: '2018-08-08T15:38:38.000Z',
          apiKeySource: 'HEADER',
          endpointConfiguration: {}
        },
        {
          id: 'wrongId',
          name: 'NOTright',
          createdDate: '2018-09-14T14:25:46.000Z',
          apiKeySource: 'HEADER',
          endpointConfiguration: {}
        }
      ]
    });
  }
});

describe('API Integration getEndpoint function', () => {
  it('fetchEndpoint() should return the correct endpoint', async () => {
    let res = await fetchEndpoint('testAPIName', 'us-east-1', 'dev', apigateway);
    expect(res).to.equal(
      'https://testId.execute-api.us-east-1.amazonaws.com/dev'
    );
  });
  it('getEndpoint() should return local host if environment is local', async () => {
    let endpoint = await getEndpoint();
    expect(endpoint).to.equal('http://localhost:3000');
  })
});
