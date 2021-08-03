var fs = require('fs').promises

module.exports = async function (context, req) {
    //const path = context.executionContext.functionDirectory + '/../index.html'
    try {
        var data = await fs.readFile('index/index.html');
        context.res = {
            headers: {
                'Content-Type': 'text/html'
            },
            body: data
        }
        context.done()
    } catch (error) {
        context.log.error(error);
        context.done(error);
    }
}