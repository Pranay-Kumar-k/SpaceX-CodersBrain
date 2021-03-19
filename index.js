window.onload = () => {

//Adding years buttons on the left side panel
    var years = document.getElementById("launch-years")
    for(var i=2006; i<=2020; i++) {
        var button = document.createElement('button');
        button.textContent = i
        button.setAttribute("class","button")
        var fragment = document.createDocumentFragment();
        fragment.append(button)
        years.appendChild(fragment)
    }

//Make an api request and get data of programs and rendering it on page in card model

    var xhr = new XMLHttpRequest()
    xhr.open('GET',"http://api.spaceXdata.com/v3/launches?launch_year=2006");
    xhr.setRequestHeader("Accept","application/json")
    xhr.send();

    xhr.onload = () => {
        if(xhr.status === 200) {
            var response = JSON.parse(xhr.response)
            console.log(response);
        }
    }
}