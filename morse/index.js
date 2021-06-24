const morse = require("morse-code-converter");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var plaintext = new String(req.query.plaintext)

    let dot = morse.textToMorse(plaintext)

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: dot
    };
}