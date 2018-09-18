const expect = require('chai').expect;
const { stub } = require('sinon');
const aws = require('aws-sdk');

const codedeploy = new aws.CodeDeploy({ apiVersion: '2014-10-06' });
const lambda = new aws.Lambda();

const { handleLogic } = require('../../../src/handlers/preTrafficHook');

//stub services
let codeDeployStub = stub(codedeploy, 'putLifecycleEventHookExecutionStatus');
codeDeployStub.returns({
  promise: () => {
    return Promise.resolve({
      success: 'yay'
    });
  }
});
//format return of stub
let lambdaStub = stub(lambda, 'invoke');
lambdaStub.returns({
  promise: () => {
    return Promise.resolve({
      Payload: JSON.stringify({
        statusCode: 200
      })
    });
  }
});

//test
describe('PreTraffic Lambda', () => {
  beforeEach(() => {
    process.env['CURRENT_VERSION'] = 'currentVersion';
  });

  it('verifies that lambda executed and notifies codedeploy', async () => {
    console.log = () => {};
    let event = {
      DeploymentId: '123',
      LifecycleEventHookExecutionId: '1234'
    };
    let res = await handleLogic(event, codedeploy, lambda);
    delete console.log;
    expect(res.success).to.equal('yay');
  });
});
