var multipart = require('parse-multipart');
const fetch = require('node-fetch');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // here's your boundary:
    var boundary = multipart.getBoundary(req.headers['content-type']);
    // TODO: assign the body variable the correct value
    var body = req.body;
    // parse the body
    var parts = multipart.Parse(body, boundary);

    var imageData = parts[0].data;

    var result = await analyzeImage(imageData);

    let emotions = result[0].faceAttributes.emotion;

    let objects = Object.values(emotions);
    // What your array could look like: [0.01, 0.34, .....]
    const main_emotion = Object.keys(emotions).find(key => emotions[key] === Math.max(...objects));
    //module.exports function
    //analyze the image

    var gif = await findGifs(main_emotion);


    context.res = {
        // status: 200, /* Defaults to 200 */
        body: gif
    };
    console.log(result)
    context.done();

}

async function analyzeImage(img) {
    const subscriptionKey = process.env.SUBSCRIPTIONKEY;
    const uriBase = process.env.ENDPOINT + '/face/v1.0/detect';

    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnfaceAttributes': 'emotion'
    })

    let resp = await fetch(uriBase + '?' + params.toString(), {
        method: 'POST',  //WHAT TYPE OF REQUEST?
        body: img,  //WHAT ARE WE SENDING TO THE API?

        //ADD YOUR TWO HEADERS HERE
        headers: {
            'Content-type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': subscriptionKey
        }
    })

    let data = await resp.json();
    return data;
}

async function findGifs(emotion) {
    const giphyKey = process.env.GIPHYKEY;

    let params = new URLSearchParams({
        'api_key': giphyKey,
        's': emotion
    })

    let apiResult = await fetch("https://api.giphy.com/v1/gifs/translate?" + params.toString())

    let jsonResult = await apiResult.json();
    return jsonResult.data.url;
}
