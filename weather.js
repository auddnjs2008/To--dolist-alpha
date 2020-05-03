const weather = document.querySelector(".a-weather");
const API_KEY = "c4e9570113deee53fd79eee810aab0e5";
const COORDS = "coords";

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      // 서버가 데이터를 다 받아올때 까지 기다린다.
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `temperature: ${temperature} @ Place: ${place}`;
    });
}

function saveCoords(corrdsObj) {
  localStorage.setItem(COORDS, JSON.stringify(corrdsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude: latitude,
    longitude: longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handlegeoError() {
  console.log("cant access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handlegeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
