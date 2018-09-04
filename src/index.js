exports.handler = (event, context, callback) => {
    callback(null, {
        statusCode: '200',
        body: `Hello World, I'm the new version of your serverless application!`,
    });
};
