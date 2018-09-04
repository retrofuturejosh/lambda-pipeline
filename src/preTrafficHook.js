'use strict';
const aws = require('aws-sdk');
const codedeploy = new aws.CodeDeploy({apiVersion: '2014-10-06'});

exports.handler = (event, context, callback) => {

	console.log("Entering PreTraffic Hook!");
	console.log(JSON.stringify(event));

	//Read the DeploymentId from the event payload.
    const deploymentId = event.DeploymentId;
	console.log(`deploymentId is \n\n`, deploymentId);

    //Read the LifecycleEventHookExecutionId from the event payload
	const lifecycleEventHookExecutionId = event.LifecycleEventHookExecutionId;
	console.log(`lifecycleEventHookExecutionId is \n\n`, lifecycleEventHookExecutionId);

	const lambdaVersion = process.env.CURRENT_VERSION;
	console.log('lambdaVersion is \n\n', lambdaVersion);

	/*
		[Perform validation or prewarming steps here]
	*/

	// Prepare the validation test results with the deploymentId and
    // the lifecycleEventHookExecutionId for AWS CodeDeploy.
    const params = {
        deploymentId: deploymentId,
        lifecycleEventHookExecutionId: lifecycleEventHookExecutionId,
        status: 'Succeeded' // status can be 'Succeeded' or 'Failed'
    };

	// Pass AWS CodeDeploy the prepared validation test results.
    codedeploy.putLifecycleEventHookExecutionStatus(params, function(err, data) {
        if (err) {
			// Validation failed.
			console.log('Validation test failed');
			console.log(err);
			console.log(data);
            callback('Validation test failed');
        } else {
			// Validation succeeded.
			console.log('Validation test succeeded');
            callback(null, 'Validation test succeeded');
        }
	});
}
