function getImage(event){
    event.preventDefault();
    if(document.getElementById("name").value.length == 0){
        alert("No name error.");
        return;
    };
    $('#output').text("Thanks!");
}