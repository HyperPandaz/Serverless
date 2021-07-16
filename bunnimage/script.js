function getImage(event) {
    event.preventDefault();
    var bunniForm = document.getElementById("myform");
    var payload = new FormData(bunniForm);
    console.log(payload);
    var fileInput = document.getElementById("image");
    var fileName = document.getElementById("name");
    const file = fileInput.files[0]; // fileInput is the file upload input element
    payload.append("file", file);

    if (document.getElementById("name").value.length != 0) {
        try {
            let url = "https://jakub-deployment.azurewebsites.net/api/bunnimage-upload?code=RWVI4br4W7PJHV0ushQLbeX19EtDZPhA7rNG/ruXmPXLXmBQDkp77g==";
            console.log("Image was uploaded, making post request to Azure")
            const response = await fetch(url, {
                method: 'POST',
                body: payload,
                headers: { 'codename': fileName.value, }
            });
            $('#output').text("Your image has been stored successfully!");
        } catch (e) {
            $('#output').text(e);
        }
    } else {
        alert("No name error.");
    }

}