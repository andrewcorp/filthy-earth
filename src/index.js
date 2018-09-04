import './main.css';
import { Elm } from './Main.elm';
import registerServiceWorker from './registerServiceWorker';

const app = Elm.Main.init({
  flags: null
});

registerServiceWorker();

const mapMarkers = [],
      infoWindows = [],
      bounds = new google.maps.LatLngBounds();

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
    infoWindows.forEach((i) => i.close());
    window.googleMap.panTo(position);
    infoWindow.open(window.googleMap, marker);
  });
  mapMarkers.push(marker);
  bounds.extend(position);
  window.googleMap.fitBounds(bounds);
}

const updateMarkers = (locations) => {
  mapMarkers.forEach(marker => marker.setMap(null));
  mapMarkers.length = 0;
  locations.forEach((d) => createMarker(d, window.googleMap));
}

// Subscriptions
app.ports.initializeMap.subscribe((data) => {
  const config = {
    center: new google.maps.LatLng({ lat: data.lat, lng: data.lng }),
    zoom: 2,
  },
  mapDiv = document.getElementById('map');

  window.googleMap = new google.maps.Map(mapDiv, config);

  // Add markers
  updateMarkers(data.locations);
});

app.ports.filterOn.subscribe((data) => {
  console.log(data)
  updateMarkers(data)
});
