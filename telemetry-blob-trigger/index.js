const fetch = require("node-fetch");
const { BlobServiceClient } = require("@azure/storage-blob");

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const blobServiceClient = BlobServiceClient.fromConnectionString(
    connectionString
);
const containerName = process.env.CONTAINER_NAME || "images";
const containerClient = blobServiceClient.getContainerClient(containerName);

module.exports = async function (context, myBlob) {
    context.log("JavaScript blob trigger function processed blob \n Blob:", context.bindingData.blobTrigger, "\n Blob Size:", myBlob.length, "Bytes");
    // List the blob(s) in the container.
    var blobs = [];
    for await (const blob of containerClient.listBlobsFlat()) {
        blobs.push(
            {
                name: blob.name,
                props: {
                    lastModified: blob.properties.lastModified,
                }
            });
    }
    blobs = blobs.sort(function (a, b) {
        var aDate = new Date(a.props.lastModified);
        var bDate = new Date(b.props.lastModified);
        return bDate - aDate;
    });

    // context.res = {
    //     status: 200,
    //     body: {
    //         "allBlobs": blobs,
    //         "latestBlob": blobs[0].name
    //     }
    // };

    console.log(blobs[0].name);
    // await fetch("ENDPOINT", {
    //         method: 'POST',
    //         body: blobs[0].name
    //     });
    return
};