function readData() {
    var data = document.getElementById("textAreaJsonData").value;
    var jsonObject = JSON.parse(data);

    alert(jsonObject);
};