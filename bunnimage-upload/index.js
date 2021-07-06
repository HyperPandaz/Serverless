var multipart = require("parse-multipart")
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const { BlobServiceClient } = require("@azure/storage-blob");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    var body = req.body;
    if (body == null) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Sorry! No image attached."
        };
        return
    }
    var password = req.headers['codename'];
    var boundary = multipart.getBoundary(req.headers['content-type']);
    var parsedBody = multipart.Parse(body, boundary);

    var filetype = parsedBody[0].type;
    if (filetype == "image/png") {
        ext = "png";
    } else if (filetype == "image/jpeg") {
        ext = "jpeg";
    } else if (filetype == "image/jpg") {
        ext = "jpg"
    } else {
        username = "invalidimage"
        ext = "";
    }

    let message = await uploadFiles(parsedBody, ext, password);
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: message
    };
}

async function uploadFiles(parsedBody, ext, name) {
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerName = "images";
    const containerClient = blobServiceClient.getContainerClient(containerName);    // Get a reference to a container

    const blobName = name + '.' + ext;    // Create the container
    const blockBlobClient = containerClient.getBlockBlobClient(blobName); // Get a block blob client

    const uploadBlobResponse = await blockBlobClient.upload(parsedBody[0].data, parsedBody[0].data.length);

    return "File Saved";
}