const spanLat = document.querySelector('span[data-lat]').dataset.lat;  //get values on html
const spanLng = document.querySelector('span[data-lng]').dataset.lng;   //get values on html

const options = {
    dragging: false,
    touchZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    zoomControl: false
};


// create map
const mymap = L.map('mapid', options).setView([spanLat, spanLng], 14);


//config map
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiY2ljZXJvc250IiwiYSI6ImNrZzhnZno1eDBiYjIydXBmbmF6c202ZW8ifQ.4J2PwgNwNFZ1rShKYrb6mg'
}).addTo(mymap);

const icon = L.icon({
    iconUrl: "images/map-marker.svg",
    iconSize: [30, 30],
    iconAnchor: [18, 30],
    popupAnchor: [130, -5]
})

const popup = L.popup({
    closeButton: false,
    className: 'map-popup',
    minWidht: 240,
    minHeight: 240,
}).setContent(' Lar dos cabritos <a href="./orphanages.html?" class="choose-orphanage"><img src="images/arrow-white.svg" /></a>');

//add marker

L.marker([spanLat, spanLng], {icon: icon}, 15)
    .addTo(mymap);

    //marker.bindPopup(popup).openPopup();


function selectImage(event){

    const button = event.currentTarget;

    const buttons = document.querySelectorAll(".images button"); //remove all class actived
    buttons.forEach(removeClassActive);

    function removeClassActive(button){
        button.classList.remove("active");
    }

    //seleciona a imagem clicada
    const image = button.children[0];
    const imageContainer = document.querySelector(".orphanage-detail > img");
    imageContainer.src = image.src;

    //atalizar o container da imgem a exibir


    //adicionar a classe para o botão clicado
    button.classList.add("active");
}
