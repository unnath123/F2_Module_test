let apiKey = "f69f977d811962fcf158f19d470b2960";

let element_lat = document.getElementById("latitud");
let element_long = document.getElementById("longitud");

async function fetchResults() {
  try {
    await navigator.geolocation.getCurrentPosition(getlocation, permissionDenied, {
      enableHighAccuracy: true,
    });
    // await display_Map();
  } catch (error) {
    console.log("something went wrong");
  }
}

async function getlocation(position) {
  //console.log(position);
  var lat = await position.coords.latitude;
  var long = await position.coords.longitude;

  element_lat.innerText = "Lat: " + lat;
  element_long.innerText = "Long: " + long;

  console.log("latitude" + lat);
  console.log("longitude" + long);

  display_weather(lat,long);
  display_Map(lat,long)
}
function permissionDenied(error) {
  alert("Permission Denied");
}

function display_Map(lat,long) {
  const container1 = document.getElementById("cont1");
  const iframe_div = document.createElement("div");

  iframe_div.className = "Map_Cont";
    let url=`https://maps.google.com/maps?q=${lat},${long}&z=15&output=embed`;
  iframe_div.innerHTML = `
    <iframe src="${url}" width="100%" height="600" frameborder="0" style="border:0"></iframe>`;

  container1.appendChild(iframe_div);
}

async function display_weather(lat,long) {
  const latt=lat;
  const longg=long;
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latt}&lon=${longg}&appid=${apiKey}`
  );
  let data = await response.json();
  console.log(data);
renderData(data);
}

function renderData(arr){
    let location=document.getElementById("w-block1");
    location.innerText = arr.name;

    let wind_speed=document.getElementById("w-block2");
    wind_speed.innerText = arr.wind.speed+"kmph";

    let humidity = document.getElementById("w-block3");
    humidity.innerText = arr.main.humidity;

    let timeZone = document.getElementById("w-block4");
    timeZone.innerText = arr.timezone;

    let pressure = document.getElementById("w-block5");
    pressure.innerText = arr.main.pressure;

    let windDirection = document.getElementById("w-block6");
    let direction;
    if(arr.wind.deg==0){
        direction="East";
    }
    else if(arr.wind.deg>0 && arr.wind.deg<90){
        direction="North East"
    }
    else if(arr.wind.deg==90){
        direction="North";
    }
    else if(arr.wind.deg> 90 && arr.wind.deg<180){
        direction="North West";
    }
    else if(arr.wind.deg==180){
        direction="West";
    }
    else if(arr.wind.deg>180 && arr.wind.deg<270){
        direction="South West";
    }
    else if(arr.wind.deg==270){
        direction="South";
    }
    else{
        direction="South East";
    }
    windDirection.innerText=direction;

    let UVIndex=document.getElementById("w-block7");
    // UVIndex.innerText=arr.

    let feelLike=document.getElementById("w-block8");
    feelLike.innerText=arr.main.feels_like;

    
}

window.onload = async function () {
    await fetchResults();
     
//   let obj1 = await display_weather();
    //console.log(obj1)
};
