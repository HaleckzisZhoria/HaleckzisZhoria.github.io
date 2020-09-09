var map;
var marker;
var infowindow;
var messagewindow;
var Latitud = document.getElementById("_latitud")
var Longitud = document.getElementById("_longitud")
var arrayMarker = [];

document.getElementById("_submit").addEventListener("click",GuardarDatos);
document.getElementById("map").addEventListener("click",modificar_ubicacion);
document.getElementById("_mostrar").addEventListener("click",mostrarMarkers);
document.getElementById("_ocultar").addEventListener("click",ocultarMarkers);
document.getElementById("_calor").addEventListener("click",toggleHeatmap);
document.getElementById("MOSTRAR").addEventListener("click",mostrar_todo);

var markers =[]



var directionsDisplay, directionsService;
function initMap(){
directionsService = new google.maps.DirectionsService();
directionsDisplay = new google.maps.DirectionsRenderer();

var url = {lat: -15.824301, lng: -70.017904};
//arrayMarker.push(url)
map = new google.maps.Map(document.getElementById('map'), {
  zoom: 14,
  center: url,
  mapTypeId: google.maps.MapTypeId.HYBRID
});

marker = new google.maps.Marker({
  // icon: 'http://maps.google.com/mapfiles/kml/paddle/grn-stars.png',
  animation: google.maps.Animation.DROP,
  position: url,
  draggable: true,
  // animation: google.maps.Animation.DROP,
  map: map
});
marker.addListener('click', animationMarker);

markers.push(marker)

google.maps.event.addListener(map, 'click', function(event) {
  marker = new google.maps.Marker({
    // animation: google.maps.Animation.DROP,
    position: event.latLng,
    animation: google.maps.Animation.DROP,
    draggable: true,
    map: map
  });
  marker.addListener('click', animationMarker);
  markers.push(marker)

});

document.getElementById("_latitud").value = url.lat;
document.getElementById("_longitud").value = url.lng;

}

function animationMarker() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}





function modificar_ubicacion() {
  var latlng = marker.getPosition();
  var url = '&lat=' + latlng.lat() + '&lng=' + latlng.lng();
  // downloadUrl(url, function(data, responseCode) {
  //   if (responseCode == 200 && data.length <= 1) {
  //     infowindow.close();
  //     messagewindow.open(map, marker);
  //   }
  // });
  document.getElementById("_latitud").value = latlng.lat();
  document.getElementById("_longitud").value = latlng.lng();
  Latitud = latlng.lat()
  Longitud = latlng.lng()
}

function downloadUrl(url, callback) {
  var request = window.ActiveXObject ?
      new ActiveXObject('Microsoft.XMLHTTP') :
      new XMLHttpRequest;

  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      request.onreadystatechange = doNothing;
      callback(request.responseText, request.status);
    }
  };

  // request.open('GET', url, true);
  // request.send(null);
}

function doNothing () {
}

function GuardarDatos (){
  var nombre = document.getElementById("nombreEmpresa").value;
  var email = document.getElementById("emailEmpresa").value;
  var telefono = document.getElementById("telefonoEmpresa").value;

  swal("Guardado!", "", "success");
  arrayMarker.push({
    lat: parseFloat(Latitud),
    lng: parseFloat(Longitud)
  })
  console.log(arrayMarker)
  console.log(typeof(arrayMarker[0].lat,arrayMarker[0].lng))
}


function onMapReady(map) {
    map.addMarker(new MarkerOptions()
        .position(new LatLng(-15.8342926805404, -70.0260579154053))
        .title("Hello world"));
}

// MOSTRAR MARKADORES
function mostrarMarkers(){
  setMapOnAll(map);
}
// FIN DE MOSTRAR MARKADORES

// OCULTAR MARKADORES
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    console.log(markers[i].internalPosition.lat)
    animation: google.maps.Animation.DROP;
  }
}
function ocultarMarkers(){
    setMapOnAll(null);
}
// FIN DE OCULTAR MARKADORES

// MOSTRAR MAPA DE CALOR
var heatmap;
var condicion = true
function toggleHeatmap() {
  console.log("si entro");
  if (condicion) {

    heatmap = new google.maps.visualization.HeatmapLayer({
      data: getPoints(),
      map: map
    });
    condicion = false;

  }else{
    heatmap.setMap(heatmap.getMap() ? null : map);
    condicion = true;
  }
  
}

function getPoints() {
  var objeto =[];

  objeto.push(new google.maps.LatLng(-15.8243010000000, -70.0179040000000));
  objeto.push(new google.maps.LatLng(-15.8249719444333, -70.0182205006637));
  objeto.push(new google.maps.LatLng(-15.8251474218407, -70.0175928637543));
  objeto.push(new google.maps.LatLng(-15.8249100111943, -70.0182687804260));
  objeto.push(new google.maps.LatLng(-15.8237023092410, -70.0201355979004));
  objeto.push(new google.maps.LatLng(-15.8342926805404, -70.0260579154053));
  objeto.push(new google.maps.LatLng(-15.8407339781970, -70.0280892467946));
  objeto.push(new google.maps.LatLng(-15.8390819059420, -70.0241696402588));

  return objeto
}
// FIN DE MOSTRAR MAPA DE CALOR
// INICIO DE MOSTRAR DE LA BASE DE DATOS
var pasa = true
function mostrar_todo (){
  var xhr = new XMLHttpRequest();
  xhr.open('GET','../consultas/empresas_ubicaciones.php');
  var json;
  xhr.onload = function(){
    if (xhr.status === 200) {
      // console.log(xhr)
      json = JSON.parse(xhr.responseText);
      // console.log(json)
      var lan = parseFloat(json[5].latitud)
      var lon = parseFloat(json[5].longitud)

      for(let k = 0 ; k<json.length ; k++){
            marker = new google.maps.Marker({
              icon: 'http://maps.google.com/mapfiles/kml/paddle/grn-stars.png',
              animation: google.maps.Animation.DROP,
              position: {lat: parseFloat(json[k].latitud) ,lng: parseFloat(json[k].longitud) },
              animation: google.maps.Animation.DROP,
              map: map
          });
      }

    }else{
      console.log("EXISTE UN ERROR DE TIPO"+xhr.status);
    }
  }
  xhr.send(); 
}
// FIN DE MOSTRAR DE LA BASE DE DATOS

// mi ubicacion
document.getElementById("__yo__").addEventListener("click",miUbicacion)
function miUbicacion(){
  console.log("entra")
  //Pedimos los datos de geolocalizacion al navegador
  navigator.geolocation.getCurrentPosition(
    //Si el navegador entrega los datos de geolocalizacion los imprimimos
    function (position) {
        swal("Te encontramos!", "", "success");
        console.log(position.coords.latitude)
        console.log(position.coords.longitude)
        // $("#nlat").text(position.coords.latitude);
        // $("#nlon").text(position.coords.longitude);

        marker = new google.maps.Marker({
          icon: 'http://maps.google.com/mapfiles/kml/shapes/man.png',
          animation: google.maps.Animation.DROP,
          position: {lat: position.coords.latitude, lng: position.coords.longitude},
          map: map
        });
    },
    //Si no los entrega manda un alerta de error
    function () {
        swal("Error", "no se pudo obtener la ubicacion", "error");
    }
  );


  // origen 
  var url = {lat: -15.824301, lng: -70.017904};
  marker = new google.maps.Marker({
    // icon: 'http://maps.google.com/mapfiles/kml/paddle/grn-stars.png',
    animation: google.maps.Animation.DROP,
    position: url,
    draggable: true,
    // animation: google.maps.Animation.DROP,
    map: map
  });
  marker.addListener('click', animationMarker);
}
initMap();