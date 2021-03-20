var arr, launchYear, url;
url = `http://api.spaceXdata.com/v3/launches`;
window.onload = () => {
    document.querySelectorAll("#launch-years > button").forEach((button, index) => {
        button.onclick = (event) => {
          console.log("You clicked button with text " + event.toElement.innerText);
          launchYear = event.toElement.innerText;
          makeApiCall(url,launchYear)
        }
      })

        makeApiCall(url)
}
//Make an api request and get data of programs and rendering it on page in card model

function makeApiCall(url,launchYear,successfulLaunch, successfulLanding) {

    launchYear = launchYear || 2006;
    successfulLanding = successfulLanding || "";
    successfulLaunch = successfulLaunch || "" ;

    var xhr = new XMLHttpRequest()
    xhr.open('GET',url+"?"+launchYear+"&"+successfulLaunch+"&"+successfulLanding);
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
        // console.log(arr[i]);
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
    var missionsDiv = document.createElement('div');
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
    missions.textContent = 'Mission Ids :';
    // missions.style.float = "left";
    missionsDiv.append(missions);
    
    if(missionIds.length) {
        var list = document.createElement("ul");
        for(var j=0; j<missionIds.length; j++) {
            var listElement = document.createElement('li');
            list.textContent = missionIds[j].toString();
            list.append(listElement);
        }
        missions.append(list)
        missionsDiv.append(missions);
    }
    else missions.innerHTML = `Mission Ids : <span class="span">Not Available</span>`;

    card.setAttribute('id', 'card');
    imageDiv.setAttribute('class', "image-div");
    image.src = obj.links.mission_patch;
    missionsDiv.setAttribute("id","missions");

    imageDiv.append(image);
    missionsDiv.append(missions);
    card.append(imageDiv);
    card.append(title);
    card.append(missionsDiv);
    card.append(missionLaunchYear);
    card.append(launchSuccess);
    card.append(landingSuccess);
    rightDiv.append(card);
}