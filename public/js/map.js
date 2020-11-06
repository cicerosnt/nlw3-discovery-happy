
const mymap = L.map('mapid').setView([-21.133143, -48.974369], 14);  //create map

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {  //config the map
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'token_leaflet_here'
}).addTo(mymap);

const icon = L.icon({
    iconUrl: "images/map-marker.svg",
    iconSize: [30, 30],
    iconAnchor: [18, 30],
    popupAnchor: [135, 23]
});

function addMarker({id, name, lat, lng}){
    const popup = L.popup({
        closeButton: false,
        className: 'map-popup',
        minWidht: 240,
        minHeight: 240,
    }).setContent(`${name} <a href="./orphanage?id=${id}" class="choose-orphanage"><img src="images/arrow-white.svg" /></a>`);

    L.marker([lat, lng], {icon: icon})  //create the marker
        .addTo(mymap) // add marker in the map
        .bindPopup(popup);
}

const orphanagesSpan = document.querySelectorAll('.dataOrphanage span');

orphanagesSpan.forEach(span => {
    const orphanage = {
        id: span.dataset.id,
        name: span.dataset.name,
        lat: span.dataset.lat,
        lng: span.dataset.lng,
    }

    addMarker(orphanage);
});