async function y1k3s(event){
    // event.preventDefault();
     var text = document.getElementById("text");
     let url = "https://cataas.com/cat/fun/says/" + text.value + "";
    // console.log(text.value);
    // console.log(url);
    // let resp = await fetch(url, {
    //     method: 'GET'
    // });
    // console.log("request was made");
    document.getElementById("image").src = url;

}