const tilesProvider = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

let myMap = L.map('myMap').setView([-14.068362, -70.430895], 17)

L.tileLayer(tilesProvider, {
    maxZoom: 25,
}).addTo(myMap)

let marker = L.marker([-14.068362, -70.430895]).addTo(myMap)