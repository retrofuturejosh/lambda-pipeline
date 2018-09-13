'use strict';
const aws = require('aws-sdk');
const codedeploy = new aws.CodeDeploy({ apiVersion: '2014-10-06' });
const lambda = new aws.Lambda();

const handler = async (event, context) => {
  return handleLogic(event, codedeploy, lambda);
};

const handleLogic = async (event, codedeploy, lambda) => {
  console.log('Entering PreTraffic Hook!');
  console.log('Event is \n\n', JSON.stringify(event));

  const deploymentId = event.DeploymentId;
  const lifecycleEventHookExecutionId = event.LifecycleEventHookExecutionId;

  const lambdaVersion = process.env.CURRENT_VERSION;
  console.log('lambdaVersion is \n\n', lambdaVersion);

  // Prepare the validation test results with the deploymentId and the lifecycleEventHookExecutionId for AWS CodeDeploy.
  let codedeployParams = {
    deploymentId: deploymentId,
    lifecycleEventHookExecutionId: lifecycleEventHookExecutionId,
    status: 'Failed' // status can be 'Succeeded' or 'Failed'
  };

  const lambdaParams = {
    FunctionName: lambdaVersion
  };

  // invoke lambda and await payload
  let lambdaResponse = await lambda
    .invoke(lambdaParams)
    .promise()
    .then(res => {
      console.log('res is ', res);
      return JSON.parse(res.Payload);
    })
    .catch(err => {
      console.log(err);
    });

  // test results of lambda here
  // change codeDeploy status to Succeeded if tests pass
  if (lambdaResponse.statusCode === '200') {
    codedeployParams.status = 'Succeeded';
    console.log('Tests Passed');
  } else {
    console.log('Tests Failed');
  }

  // Pass AWS CodeDeploy the prepared validation test results.
  return await codedeploy
    .putLifecycleEventHookExecutionStatus(codedeployParams)
    .promise()
    .then(success => {
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
