# Serverless Lambda/API Gateway CodePipeline Example

This is an example CI/CD pipeline, deploying a Lambda/API Gateway serverless project. This example uses CodePipeline, CodeBuild, CodeDeploy, CloudFormation, AWS SAM, and GitHub.

## Deploying Pipeline
#### Prerequisites
1. AWS CLI - [Installation Docs](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)
2. Node.js - [Download/Install](https://nodejs.org/en/download/)
3. GitHub Access Token - [Creating a personal access token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)
#### Step One: Add params.json
Add a file `params.json` to the `/templates` folder with the required ParameterValues.
```
[
  {
    "ParameterKey": "GitHubToken",
    "ParameterValue": "<YOUR GITHUB TOKEN>"
  },
  {
    "ParameterKey": "GitHubRepoOwner",
    "ParameterValue": "<YOUR GITHUB USERNAME>"
  },
  {
    "ParameterKey": "GitHubRepoName",
    "ParameterValue": "<NAME OF REPO>"
  },
  {
    "ParameterKey": "GitHubBranch",
    "ParameterValue": "<NAME OF BRANCH>"
  },
  {
    "ParameterKey": "S3Bucket",
    "ParameterValue": "<UNIQUE BUCKET NAME (cannot already exist)>"
  }
]
```
#### Step Two: Change Bucket Name in `buildspec.yml`
In `buildspec.yml`, change the name of the bucket in the `aws cloudformation package` command on line 6. Any versioned bucket will work, but it's advisable to use the same bucket you passed as a value to `./templates/params.json`.
```
- aws cloudformation package --template-file ./templates/samTemplate.yml --s3-bucket <YOUR BUCKET NAME> --output-template-file outputSamTemplate.yml
```


#### Step Three: Deploy Pipeline
```
npm run deploy-pipeline
```
CodePipeline revision will trigger after CloudFormation successfully builds stack. After pipeline completes deployment, API route `https://<UNIQUE-ENDPOINT>/v1/HelloWorld` should return `"Hello World, I'm your serverless application!"`

## Useful Docs
- [CodePipeline Docs](https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html)
- [CodeBuild Docs](https://docs.aws.amazon.com/codebuild/latest/userguide/welcome.html)
- [CodeDeploy Docs](https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html)
- [CloudFormation Docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html)
- [AWS SAM Docs](https://github.com/awslabs/serverless-application-model)
- [CodePipeline CloudFormation Resource](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-codepipeline-pipeline.html)
- [CodeBuild CloudFormation Resource](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-codebuild-project.html)
