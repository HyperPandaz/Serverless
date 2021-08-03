var multipart = require("parse-multipart")
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const { BlobServiceClient } = require("@azure/storage-blob");
const { default: fetch } = require("node-fetch");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    //var name = req.body;
    //var url = "https://jakubstorage.blob.core.windows.net/images/" + name + "";
    var data = req.rawBody;
    context.log(data);

    // let file = await fetch(url, {
    //     method: 'GET'
    // })
    //var data = await getFile(name);
    //JSON parser object to parse read file
    //  const jsonParser = new JSONParser();
    //  const reader = new FileReader(file) 
    //      //Read JSON file
    //      var obj = jsonParser.parse(reader);   
    //var data = await streamToString(file.readableStreamBody)
    //console.log("file");
    //console.log(file.owner);
    context.bindings.signalRMessages = [{
        "target": "newMessage",
        "arguments": [data]
    }]

    // context.res = {
    //     // status: 200, /* Defaults to 200 */
    //     body: data
    // };
    context.done();
}

async function getFile(name) {
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerName = "data";
    const containerClient = blobServiceClient.getContainerClient(containerName);    // Get a reference to a container

    const blobName = name;    // Create the container
    const blockBlobClient = containerClient.getBlockBlobClient(blobName); // Get a block blob client

    const downloadBlockBlobResponse = await blockBlobClient.download(0);

    //console.log('\nDownloaded blob content...');
    //console.log(await streamToString(downloadBlockBlobResponse.readableStreamBody));
    var data = await streamToString(downloadBlockBlobResponse.readableStreamBody);

    return data;
    //return JSON.parse(data);
}

async function streamToString(readableStream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        readableStream.on("data", (data) => {
            chunks.push(data.toString());
        });
        readableStream.on("end", () => {
            resolve(chunks.join(""));
        });
        readableStream.on("error", reject);
    });
}
