exports.handler = (event, context, callback) => {
    callback(null, {
        statusCode: '200',
        body: `Hello World, I'm your updated serverless application!`,
    });
};
