#!/bin/bash

#create CodeBuild resources
echo creating pipeline resources
aws cloudformation create-stack --stack-name serverless-pipeline-resources --template-body file://templates/cloudformation.yml --capabilities CAPABILITY_NAMED_IAM --parameters file://templates/params.json

#wait for resources to be created
echo waiting for successful creation of stack
aws cloudformation wait stack-create-complete --stack-name serverless-pipeline-resources

echo successfully created stack
