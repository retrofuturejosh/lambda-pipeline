'use strict';
const aws = require('aws-sdk');
const codedeploy = new aws.CodeDeploy({ apiVersion: '2014-10-06' });
const lambda = new aws.Lambda();

exports.handler = async (event, context) => {
  console.log('Entering PreTraffic Hook!');
  console.log('Event is \n\n', JSON.stringify(event));

  //Read the DeploymentId from the event payload.
  const deploymentId = event.DeploymentId;

  //Read the LifecycleEventHookExecutionId from the event payload
  const lifecycleEventHookExecutionId = event.LifecycleEventHookExecutionId;

  //get ARN of lambda function from environment
  const lambdaVersion = process.env.CURRENT_VERSION;
  console.log('lambdaVersion is \n\n', lambdaVersion);

  // Prepare the validation test results with the deploymentId and
  // the lifecycleEventHookExecutionId for AWS CodeDeploy.
  let codedeployParams = {
    deploymentId: deploymentId,
    lifecycleEventHookExecutionId: lifecycleEventHookExecutionId,
    status: 'Failed' // status can be 'Succeeded' or 'Failed'
  };

  const lambdaParams = {
    FunctionName: lambdaVersion /* required */
  };

  let lambdaResponse = await lambda
    .invoke(lambdaParams)
    .promise()
    .then(res => {
      return JSON.parse(res.Payload);
    })
    .catch(err => {
      console.log(err);
    });

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
