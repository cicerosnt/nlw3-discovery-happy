// get values on html
// const lat = document.querySelector('span[data-lat]').dataset.lat;
// const lng = document.querySelector('span[data-lng]').dataset.lng;

const options = {
    dragging: false,
    touchZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    zoomControl: false
};


// create map
const mymap = L.map('mapid', options).setView([-21.133143, -48.974369], 14);


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
    iconAnchor: [18, 30]
});

let marker;  //add marker

//L.marker([-21.142898, -48.975535], {icon}).addTo(mymap);

    //marker.bindPopup(popup).openPopup();

let latSelected = null;
let lngSelected = null;
mymap.on('click', (event) => {  // create and add marker

    latSelected = event.latlng.lat;
    lngSelected = event.latlng.lng;

    document.querySelector('[name=lat]').value = latSelected;
    document.querySelector('[name=lng]').value = lngSelected;

    marker && mymap.removeLayer(marker)  // remove icon

    marker = L.marker([latSelected, lngSelected], {icon: icon}, 15) // add icon layer
    .addTo(mymap);

    alert(`Localização selecionada cordenadas: ${latSelected}, ${lngSelected}`);
})

function addPhotoField() { // add field of pictures

    const container = document.querySelector('#images'); // take the container of pictures
    
    const fieldsContainer = document.querySelectorAll('.new-upload'); // take the container for duplicate .new-image
    
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true); // effect the clone of last picture added
    
    const input = newFieldContainer.children[0]; // verifi if the fiels is null, if yes, not add the container of pictures

    if(input.value == "") {
        return;
    }

    input.value = ""; // clean the field first add the container of pictures

    container.appendChild(newFieldContainer); // add container the clone of picture
} 

//delete field picture
function deleteField(event) {

    const span = event.currentTarget; //when

    const fieldsContainer = document.querySelectorAll('.new-upload');

    if(fieldsContainer.length < 2) {
        span.parentNode.children[0].value = "";  // clean the field value
        return;
    }

    span.parentNode.remove();   // delete the field

}

function toggleSelect(event) {   // select yes or no

    document.querySelectorAll('.button-select button')  // retirar a class .active (dos botoes)

    .forEach( function(button) {
        button.classList.remove('active') 
    });

    const button = event.currentTarget //add the class "active" in button
    button.classList.add('active')

    const input = document.querySelector('[name="open_on_weekend"]');  //update input with value updated
    
    input.value = button.dataset.value


    console.log(input.value);
}

function validate(event) {

    if(latSelected == null || lngSelected == null) {  // validate latitude e longitude if not null
        event.preventDefault()
        alert('Selecione a localização no mapa!')
    }
    
}

function maskPhone(o, f) {
    setTimeout(function() {
      var v = phone(o.value);
      if (v != o.value) {
        o.value = v;
      }
    }, 1);
  }
  
  function phone(v) {
    var r = v.replace(/\D/g, "");
    r = r.replace(/^0/, "");
    if (r.length > 10) {
      r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 5) {
      r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
      r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else {
      r = r.replace(/^(\d*)/, "($1");
    }
    return r;
  }