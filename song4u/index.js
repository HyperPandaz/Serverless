const querystring = require('querystring');
const fetch = require('node-fetch');


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const queryObject = querystring.parse(req.body);

    const songs = {
        "GenZ": "https://open.spotify.com/track/0SIAFU49FFHwR3QnT5Jx0k?si=1c12067c9f2b4fbf",
        "GenY": "https://open.spotify.com/track/1Je1IMUlBXcx1Fz0WE7oPT?si=a04bbdf6ec4948b9",
        "GenX": "https://open.spotify.com/track/4Zau4QvgyxWiWQ5KQrwL43?si=790d9e3ef2ed408d",
        "BabyBoomers": "https://open.spotify.com/track/4gphxUgq0JSFv2BCLhNDiE?si=1abb329f2dc24f50",
        "Unknown": "https://open.spotify.com/track/5ygDXis42ncn6kYG14lEVG?si=84b49b41d09d4d11"
    }

    let resp = await fetch(queryObject.MediaUrl0, {
        /*The await expression causes async function execution to pause until a Promise is settled 
        (that is, fulfilled or rejected), and to resume execution of the async function after fulfillment. 
        When resumed, the value of the await expression is that of the fulfilled Promise*/
        method: 'GET',
    })

    // receive the response
    let imageData = await resp.arrayBuffer()
    // we are receiving it as a Buffer since this is binary data
    var result = await analyzeImage(imageData);

    let age = result[0].faceAttributes.age;

    if (age >= 5 && age <= 25) {
        id = "GenZ"
    }
    else if (age >= 26 && age <= 41) {
        id = "GenY"
    }
    else if (age >= 42 && age <= 57) {
        id = "GenX"
    }
    else if (age >= 58 && age <= 76) {
        id = "BabyBoomers"
    }
    else { id = "Unknown" }

    let value = songs[id];

    let string = "We guessed you're part of this generation: ${id}! Happy listening! ${value}"


    context.res = {
        // status: 200, /* Defaults to 200 */
        body: string
    };
}

async function analyzeImage(img) {
    const subscriptionKey = process.env.SUBSCRIPTIONKEY;
    const uriBase = process.env.ENDPOINT + '/face/v1.0/detect';

    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnfaceAttributes': 'age'
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
