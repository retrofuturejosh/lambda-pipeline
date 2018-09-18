const expect = require('chai').expect;
const { stub } = require('sinon');
const aws = require('aws-sdk');

const codedeploy = new aws.CodeDeploy();
const s3 = new aws.S3({ region: 'us-east-1' });

const { handleLogic } = require('../../../src/handlers/postTrafficHook');

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
let s3Stub = stub(s3, 'getObject');
s3Stub.returns({
  promise: () => {
    return Promise.resolve({
      Body: Buffer.from('0', 'utf8')
    });
  }
});

//test
describe('PostTraffic Lambda', () => {
  beforeEach(() => {
    process.env['CURRENT_VERSION'] = 'currentVersion';
  });

  it('verifies that codebuild results passed and notifies codedeploy', async () => {
    console.log = () => {};
    let event = {
      DeploymentId: '123',
      LifecycleEventHookExecutionId: '1234'
    };
    let res = await handleLogic(event, codedeploy, s3);
    delete console.log;
    expect(res.success).to.equal('yay');
  });
});
