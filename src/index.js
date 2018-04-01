require('./styles/application.scss');

const Elm = require('./app/Main.elm');
const app = Elm.Main.embed(document.querySelector('#app'));

const mapMarkers = [],
      infoWindows = [],
      bounds = new google.maps.LatLngBounds();

const clearMarkers = () => {
  mapMarkers.forEach(marker => marker.setMap(null));
  mapMarkers.length = 0;
}

const createMarker = (d) => {
  const position = new google.maps.LatLng({
    lat: parseInt(d.latitude),
    lng: parseInt(d.longitude)
  });

  const content = `
    <div>
      <h2>${d.name}</h2>
      <h3>${d.city}, ${d.country}</h3>
    </div>
  `;

  const infoWindow = new google.maps.InfoWindow({ content });
  infoWindows.push(infoWindow);

  const marker = new google.maps.Marker({
    position,
    map: window.googleMap,
    title: d.name,
  });

  marker.addListener('click', () => {
    // Close other open windows
    infoWindows.forEach((i) => i.close());
    window.googleMap.panTo(position);
    infoWindow.open(window.googleMap, marker);
  });
  mapMarkers.push(marker);
  bounds.extend(position);
  window.googleMap.fitBounds(bounds);
}

const filterMarkers = (str) => {
  clearMarkers();
  window.data
    .filter((d) => d.name.toLowerCase().indexOf(str.toLowerCase()) !== -1)
    .forEach((d) => createMarker(d, window.googleMap));
}

// Subscriptions

app.ports.initializeMap.subscribe((pos) => {
    const mapDiv = document.getElementById('map');
    window.googleMap = new google.maps.Map(mapDiv, { zoom: 2, center: new google.maps.LatLng(pos) });

    // Add markers
    window.data.forEach((d) => createMarker(d));
});

app.ports.filterOn.subscribe((str) => filterMarkers(str));

fetch('/data/data.json')
  .then((response) => response.json())
  .then((myJson) => {
    window.data = myJson;
    app.ports.receiveData.send(null)
  });
