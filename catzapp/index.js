async function y1k3s(event){
    event.preventDefault();
    
    var name1 = document.getElementById('name1').value;
    var name2 = document.getElementById('name2').value;
    var name3 = document.getElementById('name3').value;
    var name4 = document.getElementById('name4').value;
    console.log(name1);
    let url = "https://jakub-deployment.azurewebsites.net/api/twocatz?code=cmmsiNXtnJPDB5tAaIasdWI8bD3GIfuxlHmraXc/vi1lnLFukLOdog==";
    // console.log(text.value);
    // console.log(url);
    // let resp = await fetch(url, {
    //     method: 'GET'
    // });
    // console.log("request was made");
    //document.getElementById("image").src = url;
const resp = await fetch(url + "&name1=" + name1 + "&name2=" + name2 + "&name3=" + name3 +"&name4=" + name4, {
method: 'GET',
});
let data = await resp.json();
console.log(data);
document.getElementById("image1").src = "data:image/png;base64," + data.cat1 + "";
document.getElementById("image2").src = "data:image/png;base64," + data.cat2 + "";
document.getElementById("image3").src = "data:image/png;base64," + data.cat3 + "";
document.getElementById("image4").src = "data:image/png;base64," + data.cat4 + "";
}