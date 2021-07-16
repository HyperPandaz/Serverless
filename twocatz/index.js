const fetch = require('node-fetch')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var name1 = new String(req.query.name1);
    var name2 = new String(req.query.name2);
    var name3 = new String(req.query.name3);
    var name4 = new String(req.query.name4);
    
    async function getCat(name) {

        let resp = await fetch("https://cataas.com/cat/says/" + name + "", {
            method: 'GET'
        });

        let data = await resp.arrayBuffer()
        // we need to receive it as a buffer since this is an image we are receiving from the API
        // Buffer?? https://developer.mozilla.org/en-US/docs/Web/API/Blob 


        var base64data = Buffer.from(data).toString('base64')
        //put what you want to turn into base64 inside "originaldata"
        //"originaldata" will be encoded in base64.
        return base64data
    }

    let catpic1 = await getCat(name1);
    let catpic2 = await getCat(name2);
    let catpic3 = await getCat(name3);
    let catpic4 = await getCat(name4);


    context.res = {
        // status: 200, /* Defaults to 200 */
        body: { cat1: catpic1,
                cat2: catpic2,
                cat3: catpic3,
                cat4: catpic4,
               }
    };
}