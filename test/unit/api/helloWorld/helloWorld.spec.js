const expect = require('chai').expect;
const axios = require('axios');
const fs = require('fs');

console.log(__dirname)
var file = fs.readFileSync(path.join(__dirname, '../templates') + '/my-template.html', 'utf8');

// let file = fs.readFileSync(__dirname);
// console.log(file);


// let apiEndpoint = (process.env.NODE_ENV === 'local-test') ? 'http://localhost:3000' : JSON.parse(fs.readFileSync('../../utils/endpoint.JSON')).endpoint;

describe('/HelloWorld API Route', () => {
  it('should return the correct text', async () => {
    const res = await axios.get('http://localhost:3000/HelloWorld');
    expect(res.data).to.equal(`Hello World, I'm your serverless application!`);
  }).timeout(3000);
});
