const aws = require('aws-sdk');
const fs = require('fs');
const apigateway = new aws.APIGateway({ region: 'us-east-1' });

/**
 * Returns an API Gateway endpoint
 * @param {String} apiName - name of desired API
 * @param {String} region - name of AWS region, e.g. 'us-east-1'
 * @param {String} stageName - name of desired stage
 * @param {Service} apigateway - instance of aws.APIGateway()
 */
async function fetchEndpoint(apiName, region, stageName, apigateway) {
  /**
   * returns list of APIs in account
   */
  const listApis = async () => {
    return await apigateway.getRestApis().promise();
  };

  /**
   * filters result of getRestAPIs call for desired API
   * @param {Array} apiList - returned from getRestAPIs called
   * @param {String} apiName - name of desired API
   */
  const getApiInfo = (apiList, apiName) => {
    return apiList.filter(api => {
      if (api.name === apiName) return true;
      return false;
    })[0];
  };

  try {
    let apiList = await listApis();
    let apiInfo = getApiInfo(apiList.items, apiName);
    // console.log(apiInfo);
    //format results into endpoint
    return `https://${
      apiInfo.id
    }.execute-api.${region}.amazonaws.com/${stageName}`;
  } catch (err) {
    console.log('error is :', err);
    throw new Error('Problem fetching API endpoint', err);
  }
}

function getEndpoint() {
  return process.env.NODE_ENV === 'integration'
    ? fetchEndpoint('HelloWorldAPI', 'us-east-1', 'dev', apigateway)
    : 'http://localhost:3000';
}

module.exports = {
  fetchEndpoint,
  getEndpoint
};
