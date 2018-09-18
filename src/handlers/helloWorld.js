const handler = (event, context, callback) => {
  let response = getHandler();
  callback(null, response);
};

const getHandler = event => {
  return {
    statusCode: 200,
    body: `Hello World! I am your serverless application! Pleased to meetcha!`
  };
};

module.exports = {
  handler,
  getHandler
};
