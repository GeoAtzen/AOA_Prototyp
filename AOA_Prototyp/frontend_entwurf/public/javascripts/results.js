// erstellen einer leaflet Karte mit Europa als Startpunkt und mit OSM als Basiskarte
var map = L.map("ergebnismap").setView([51.96, 7.6], 12);

L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

//drawcontrol variables
var drawnItems = new L.FeatureGroup()
var drawControl = new L.Control.Draw({
  draw: {
    marker: false,
    circle: false,
    polyline: false,
    circlemarker: false,
    rectangle: false
  },
  edit: {
    featureGroup: drawnItems
  }
})

// adding drawControl
map.addLayer(drawnItems)
map.addControl(drawControl)


/* adding the drawn rectangle to map via event
map.on(L.Draw.Event.CREATED, (e) => {
  var type = e.layerType;
  var layer = e.layer;
  polygon = layer.toGeoJSON().geometry.coordinates;
  drawnItems.addLayer(layer);
  map.addLayer(layer);
})
*/

// Prototypisches hinzufügen von polygonen und ihrer Einordnung
map.on(L.Draw.Event.CREATED, (e) => {
  var type = e.layerType;
  var layer = e.layer;

  if(type === "polygon"){
    var drawnItem = layer;
    var layer = e.layer;
    polygon = layer.toGeoJSON().geometry.coordinates;
    console.log("created polygon");
    var popupString = `
        <input id="label" label="label" value="" placeholder="Label">
        <input id="classid" label="classid" value="" placeholder="Classid">
        <input type="submit" value="Submit">
    `;
    drawnItems.addLayer(layer);
    map.addLayer(layer);
    layer.bindPopup(popupString).openPopup();
  }
});

// prototypisches Einfügen der Prediction auf der Leaflet Karte

var imageUrl = 'http://localhost:8000/tiffmodel',
imageBounds = [[51, 7], [52, 8]];

L.imageOverlay(imageUrl, imageBounds).addTo(map);