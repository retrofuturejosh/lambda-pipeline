'use strict';
const aws = require('aws-sdk');
const codepipeline = new aws.CodePipeline({ region: 'us-east-1' });
const s3 = new aws.S3({ region: 'us-east-1' });

const handler = async event => {
  console.log('THIS IS THE MAIN EVENT! ARE YOU READY?', JSON.stringify(event));
  // TODO implement
  const response = await handleLogic(event, codepipeline, s3);
  return response;
};

const handleLogic = async (event, codepipeline, s3) => {
  const jobId = event['CodePipeline.job'].id;
  let pipelineParams = {
    jobId
  };

  let Bucket =
    event['CodePipeline.job'].data.inputArtifacts[0].location.s3Location
      .bucketName;
  let Key =
    event['CodePipeline.job'].data.inputArtifacts[0].location.s3Location
      .objectKey;

  let s3Params = {
    Bucket,
    Key
  };

  console.log('S3 Params are ', s3Params);

  let result = await s3
    .getObject(s3Params)
    .promise()
    .then(res => {
      console.log('S3 Res is ', res.Body);
      return res.Body.toString('utf8');
    })
    .catch(err => {
      console.log(err);
    });

  console.log('RESULT IS ', result);

  // Put job success
  // return await codepipeline
  //   .putJobSuccessResult(pipelineParams)
  //   .promise()
  //   .then(success => {
  //     return success;
  //   })
  //   .catch(err => {
  //     throw new Error(err);
  //   });
};

module.exports = {
  handler,
  handleLogic
};

// let res = {
//   'CodePipeline.job': {
//     id: '8024a8f3-2ac8-4eeb-a70a-cec4f95c11f7',
//     accountId: '940503256434',
//     data: {
//       actionConfiguration: {
//         configuration: {
//           FunctionName: 'APITestOne'
//         }
//       },
//       inputArtifacts: [
//         {
//           location: {
//             type: 'S3',
//             s3Location: {
//               objectKey: 'lambda-pipeline-mast/DevDeployO/1qtPpWg',
//               bucketName: 'sohnserverlessbucket'
//             }
//           },
//           revision: null,
//           name: 'DevDeployOutput'
//         }
//       ],
//       outputArtifacts: [],
//       artifactCredentials: {
//         sessionToken:
//           'AgoGb3JpZ2luEHEaCXVzLWVhc3QtMSKAAho1YqjFjXihiOJYHBS4m44A9bpMlVd23F0U8eVKGX3vYkOjz0AN5wParKdBhXw5VxYsWUf3zXA8BIX331QpxvoviD0DcXylN5LbqIUhg1W+D80yceCMxFiZxgXbbolEa+nXOFQBdRAIPPziWBsxMAKBqP/PYSxlvzgqNPXWRP8WK7f02P2ps1NojULLBwEFE7eggvw6cP3rAqhCLQFm6a1XJYF+9p3X8yxd3dJYmv8hEyG+O1+Mgp4Uc1HpFVwdWAyW8qXOj6gb1VrXnYzYWYcsoiN627mUELHe+Im3c2VDi+FyJYqbWX3cxv1qCYW6RtpqOKjd0BWwRH+H8kQdvL4qgQUIl///////////ARAAGgw5NDA1MDMyNTY0MzQiDPPAPER/vtWg6mTdlSrVBL/WaltuZShsHzBI7oSgRXnmiLm7nhDjYmnhN4DPuvgqgBTSRd/f4EqBc6OUh4gEwEfmbvSYriuel4g9pYOY8YSm5KD5hy5GRhX+CpBBVh+wjuFc/+MV5ORu5YGTrPOUJxe5mA3Nus6r5nYKYSFBeSaD3cWC/k9mzSaqfWfK++bF+PNWz2+wSYc/xEJWfO/ObjJF/zamCC9nl8oD5ua4g8fRItgI4hOSfJyXlhltXciiMgI9SpfNp1qJXVI6ECXadkul26jfw4G6KarMQRneZwjDLa+gXxO8Aoeg0VgrDuJsQqduFwW0rWS6Tkyds/JxezVt0w70vS8mXXVcNnD0TcqY091RQdQXpA8+FwK07dyR0RFhipy8Pl+dCAtIAGjUTXRO2jzLOWpGqRf/KZgRWx8fErmwetf568Tp7rRLB6guoU3zg1keKS/nBNSUDd/YlfckmBnwEhF/7iqagX6olREQclm6D8QDm1Vm7RTA+dUa/hQMNIpgnAQ/rRnxIowHUGAcNsNBi28TrOlg5heBi2OIrD1BT3iWKHFM8zmJVvueMDyKQ3zc9HmrevHN65YwRcBya66gaNdonnH539H5WTfyFFx7DqfHhtdFQhT6lkJqd23XYJSAsltdD5Ji6Ia5Yplxh8Swpi57X8DC1mAU7tc1QUzZRLQJog0y9E40ppq3D0DMybb7a12/mDAwTeiH3HvFV9o9Vzw04Y3QVH1Y4LDwB0jtVyas8kH2SESJ5Jx8nahOPqpgjwVQkOYe4QGPk2A3a/5gf0MvvpRAEmbpIz4C0BPWBDCOsevcBQ==',
//         secretAccessKey: 'YL1y4S+oZDscF74DlNDLhuDytVoLqpIPiYgzAh4Z',
//         accessKeyId: 'ASIA5V6S4ZVZOIY73AXR'
//       }
//     }
//   }
// };
