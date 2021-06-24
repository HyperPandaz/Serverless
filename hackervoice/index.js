module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var password = req.query.password
    var message = "Access denied."
    if (password == "letmein"){
        message = "Access granted."
    }
   
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: message
    };
}