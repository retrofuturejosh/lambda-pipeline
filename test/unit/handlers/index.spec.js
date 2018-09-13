const expect = require('chai').expect;

const { getHandler } = require('../../../src/handlers/helloWorld');

describe('Hello World Lambda', () => {
  it('returns correct JSON', () => {
    expect(getHandler()).to.deep.equal({
      statusCode: 200,
      body: `Hello World, I'm your serverless application!`
    });
  });
});
