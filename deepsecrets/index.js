const querystring = require('querystring');
const fetch = require('node-fetch');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const queryObject = querystring.parse(req.body);

    context.res = {
        body: queryObject.Body
     };     
}