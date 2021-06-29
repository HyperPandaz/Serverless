var multipart = require('parse-multipart');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // here's your boundary:
    var boundary = multipart.getBoundary(req.headers['application/json']);

    // TODO: assign the body variable the correct value
    var body = {
        "url": "https://user-images.githubusercontent.com/69332964/98884689-91687580-245e-11eb-98d7-6461ac79e02a.jpg"
    }

    // parse the body
    var parts = multipart.Parse(body, boundary);


    context.res = {
        // status: 200, /* Defaults to 200 */
        body: parts
    };
}