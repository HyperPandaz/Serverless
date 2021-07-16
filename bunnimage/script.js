function getImage(event) {
    event.preventDefault();
    var bunniForm = document.getElementById("myform");
    var payload = new FormData(bunniForm);
    console.log(payload);
    var fileInput = document.getElementById("image");
    var fileName = document.getElementById("username");
    const file = fileInput.files[0]; // fileInput is the file upload input element
    payload.append("file", file);

    if (fileName.value.length == 0) {
        alert("No name error.");
        return;
    }
    // if (file == null) {
    //     alert("No file error");
    //     return;
    // }

    try {
        let url = "https://jakub-deployment.azurewebsites.net/api/bunnimage-upload?code=RWVI4br4W7PJHV0ushQLbeX19EtDZPhA7rNG/ruXmPXLXmBQDkp77g==";
        console.log("Image was uploaded, making post request to Azure to upload")
        const response = fetch(url, {
            method: 'POST',
            body: payload,
            headers: { 'codename': fileName.value, }
        });
        $('#output').text("Your image has been stored successfully!");
    } catch (e) {
        $('#output').text(e);
    }
    return;
}

async function downloadImage(event) {
    event.preventDefault();
    var username = document.getElementById("downloadusername");
    console.log(username.value);
    if (username.value.length == 0) {
        alert("No name error.");
        return;
    }
    try {
        let url = "https://jakub-deployment.azurewebsites.net/api/bunnimage-download?code=bw0CZ1shvZtU3MaKweP07BOfoTG5GXzIKCR7cg6aiHwJSWDXwRvrzA==";
        console.log("Making get request to Azure to download")
        const download = await fetch(url, {
            method: 'GET',
            headers: { 'username': username.value }
        })

        let data = await download.json();
        let imageUrl = data.downloadUri;
        console.log("Made get request successfuly");
        console.log(data);
        console.log(imageUrl);
        window.open(imageUrl,"_self");
    } catch (e) {
        $('#output').text(e);
    }
    return;
}