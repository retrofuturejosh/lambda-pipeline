const expect = require('chai').expect;
const { stub } = require('sinon');

const aws = require('aws-sdk');
const codedeploy = new aws.CodeDeploy({ apiVersion: '2014-10-06' });
const lambda = new aws.Lambda();

const { handleLogic } = require('../../src/preTrafficHook.js');

let codeDeployStub = stub(codedeploy, 'putLifecycleEventHookExecutionStatus');
codeDeployStub.returns({
  promise: () => {
    return Promise.resolve({
      success: 'yay'
    });
  }
});

let lambdaStub = stub(lambda, 'invoke');
lambdaStub.returns({
  promise: () => {
    return Promise.resolve({
      Payload: JSON.stringify({
        statusCode: '200'
      })
    });
  }
});

describe('PreTraffic Lambda', () => {
  before(() => {
    process.env['CURRENT_VERSION'] = 'currentVersion';
  });

  it('does stuff', async () => {
    let event = {
      DeploymentId: '123',
      LifecycleEventHookExecutionId: '1234'
    };
    let res = await handleLogic(event, codedeploy, lambda);
    expect(res.success).to.equal('yay');
  });
});
