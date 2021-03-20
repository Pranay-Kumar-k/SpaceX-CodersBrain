var arr;
window.onload = () => {

//Adding years buttons on the left side panel
    var years = document.getElementById("launch-years");

    for(var i=2006; i<=2020; i++) {
        var button = document.createElement('button');
        var fragment = document.createDocumentFragment();
       
        button.textContent = i;
        button.setAttribute("class","button");
        fragment.append(button);
        years.appendChild(fragment);
    };

    makeApiCall()
}
//Make an api request and get data of programs and rendering it on page in card model

function makeApiCall() {
    var xhr = new XMLHttpRequest()
    xhr.open('GET',"http://api.spaceXdata.com/v3/launches?launch_year=2006");
    xhr.setRequestHeader("Accept","application/json")
    xhr.send();

    xhr.onload = () => {
        if(xhr.status === 200) {
            var response = JSON.parse(xhr.response)
            console.log(response);
            arr = response;
            renderData(arr)
        }
    }
}

function renderData(arr) {
    
    for(var i=0; i<arr.length; i++) {
        console.log(arr[i]);
        renderCard(arr[i]);
    }
}

function renderCard(obj) {
    var rightDiv = document.getElementById("right");
    // console.log(obj.links.mission_patch);

    var card = document.createElement('div');
    var image = document.createElement("img");
    var imageDiv = document.createElement('div');
    var title = document.createElement('h3');
    var missionLaunchYear = document.createElement('h4');
    var launchSuccess = document.createElement("h4");
    var landingSuccess = document.createElement('h4');
    var missions = document.createElement('h4');

    title.textContent = obj.mission_name+"  #"+obj.flight_number;
    missionLaunchYear.innerHTML = `Launch Year : <span class="span">${obj.launch_year}</span>`;
    launchSuccess.innerHTML = `Successful Launch : <span class="span">${obj.launch_success}</span>`;
    
    var landSuccess = obj.rocket.first_stage.cores[0].land_success;
    if(landSuccess === null) {
        landingSuccess.innerHTML = `Successful Landing : <span class="span">Not Available</span>`;
    }
    else {
        landingSuccess.innerHTML = `Successful Landing : <span class="span">${obj.rocket.first_stage.cores[0].land_success}</span>`;
    }

    var missionIds = obj.mission_id;
    if(missionIds.length) {
        var list = document.createElement("ul");
        missions.textContent = 'Mission Ids :';

        for(var j=0; j<missionIds.length; i++) {
            var listElement = document.createElement('li');
            list.append(listElement);
        }
        card.append(list);
    }
    else missions.innerHTML = `Mission Ids : <span class="span">Not Available</span>`;

    card.setAttribute('class', 'card');
    imageDiv.setAttribute('class', "image-div");
    image.src = obj.links.mission_patch;

    imageDiv.append(image);
    card.append(imageDiv);
    card.append(title);
    card.append(missions);
    card.append(missionLaunchYear);
    card.append(launchSuccess);
    card.append(landingSuccess);
    rightDiv.append(card);
}