'use strict';
const aws = require('aws-sdk');
const codedeploy = new aws.CodeDeploy({ apiVersion: '2014-10-06' });
const s3 = new aws.S3({ region: 'us-east-1' });

const handler = async (event, context) => {
  return handleLogic(event, codedeploy, s3);
};

const handleLogic = async (event, codedeploy, s3) => {
  console.log('Entering PostTraffic Hook!');
  console.log('Event is \n\n', JSON.stringify(event));

  const deploymentId = event.DeploymentId;
  const lifecycleEventHookExecutionId = event.LifecycleEventHookExecutionId;
  // Prepare the validation test results with the deploymentId and the lifecycleEventHookExecutionId for AWS CodeDeploy.
  let codedeployParams = {
    deploymentId: deploymentId,
    lifecycleEventHookExecutionId: lifecycleEventHookExecutionId,
    status: 'Failed' // status can be 'Succeeded' or 'Failed'
  };

  // pull down results from codebuild integration test
  const params = {
    Bucket: 'sohnserverlessbucket',
    Key: 'integration-tests/results'
  };
  const deploymentResults = await s3
    .getObject(params)
    .promise()
    .then(res => {
      return res.Body.toString('utf8');
    })
    .catch(err => {
      console.log(err);
    });

    console.log('Results from deployment testing are ', deploymentResults)

    if (+deploymentResults < 5) {
      codedeployParams.status = 'Succeeded'
    }

  // Pass AWS CodeDeploy the prepared validation test results.
  return await codedeploy
    .putLifecycleEventHookExecutionStatus(codedeployParams)
    .promise()
    .then(success => {
      console.log('Successfully ran Post Traffic Hook')
      return success;
    })
    .catch(err => {
      throw new Error(err);
    });
};

module.exports = {
  handler,
  handleLogic
};
