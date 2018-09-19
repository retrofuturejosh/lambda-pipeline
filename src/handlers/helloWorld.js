const handler = (event, context, callback) => {
  const response = getHandler();
  callback(null, response);
};

const getHandler = event => {
  return {
    statusCode: 200,
    body: `Hello World, I'm your serverless application!`
  };
};

module.exports = {
  handler,
  getHandler
};
