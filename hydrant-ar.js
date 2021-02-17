let hydrantContext = {
  userLocation: {
    latitude: 0,
    longitude: 0,
    accuracy: 0,
  },
  hydrants: [],
};

function sortByDistance(myLatitude, myLongitude, data, amount) {
  let locations = [];
  for (let i = 0; i < data.length; i++) {
    let location = data[i];
    let distance = Math.sqrt(
      Math.pow(myLatitude - location.latitude, 2) +
        Math.pow(myLongitude - location.longitude, 2)
    );
    locations.push({ ...location, distance: distance });
  }
  locations.sort(function (a, b) {
    return a.distance - b.distance;
  });
  const sortedLocations = locations.slice(0, amount);
  return sortedLocations;
}

function getAPIData() {
  // console.log('getAPIData --------------------------------------------');
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (location) {
      fetch(
        `https://data.edmonton.ca/resource/x4n2-2ke2.json?$where=within_circle(location,${location.coords.latitude},${location.coords.longitude},500)`
      )
        .then((response) => response.json())
        .then((data) => {
          const sortedData = sortByDistance(
            location.coords.latitude,
            location.coords.longitude,
            data,
            10
          );
          hydrantContext = {
            userLocation: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              accuracy: location.coords.accuracy,
            },
            hydrants: [...sortedData],
          };
          renderHydrants(hydrantContext.hydrants, hydrantContext.userLocation);
        });
    });
  } else {
    document.getElementById('gps-accuracy').innerHTML =
      'Your device does not support GPS locations';
  }
}

function renderHydrants(hydrants, location) {
  // console.log('renderHydrants --------------------------------------------');
  document.getElementById('gps-latitude-data').innerHTML =
    Math.round(location.latitude * 100000) / 100000;
  document.getElementById('gps-longitude-data').innerHTML =
    Math.round(location.longitude * 100000) / 100000;
  document.getElementById('gps-accuracy-data').innerHTML =
    Math.round(location.accuracy * 100) / 100 + 'm';

  let scene = document.querySelector('a-scene');
  hydrants.forEach((hydrant) => {
    let latitude = hydrant.latitude;
    let longitude = hydrant.longitude;

    let model = document.createElement('a-entity');
    model.setAttribute('class', '#hydrant-model');
    model.setAttribute('gltf-model', '3d-models/fire-hydrant.gltf');
    model.setAttribute(
      'gps-entity-place',
      `latitude: ${latitude}; longitude: ${longitude};`
    );
    model.setAttribute('scale', { x: 1, y: 1, z: 1 });
    model.setAttribute('hydrantHandler');
    scene.appendChild(model);
  });
}
