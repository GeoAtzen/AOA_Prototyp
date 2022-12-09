// erstellen einer leaflet Karte mit Europa als Startpunkt und mit OSM als Basiskarte
var map = L.map("ergebnismap").setView([52, 7.8], 12);

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
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
imageBounds = [[51.5, 7], [52, 7.5]];

var predictionimage = L.imageOverlay(imageUrl, imageBounds).addTo(map);


// Anzeigen der hochgeladenen Shapefile mit popup
var usershapefile = new L.Shapefile("/uploads/usertrainingsdata.zip", {
        onEachFeature: function(feature, layer) {
            if (feature.properties) {
                layer.bindPopup(Object.keys(feature.properties).map(function(k) {
                    return k + ": " + feature.properties[k];
                }).join("<br />"), {
                    maxHeight: 200
                });
            }
        }
    });

// Anzeigen des hochgeladenen geopackages
// Anmerkung: Layer MUSS layer1 heißen
var usergeopackage = new L.geoPackageFeatureLayer([], {
     geoPackageUrl: '/uploads/usertrainingspolygone.gpkg',
     layerName: 'layer1',
     onEachFeature: function(feature, layer) {

      
            if (feature.properties) {
                layer.bindPopup(Object.keys(feature.properties).map(function(k) {
                    return k + ": " + feature.properties[k];
                }).join("<br />"), {
                    maxHeight: 200
                });
            }
        },
        style: function(feature) {
            return {
                opacity: 1,
                fillOpacity: 0.7,
                radius: 6,
                color: "green"
            }
        }
      });

      
// Layer Control
var baseMaps = {
    "OpenStreetMap": osm
};

var overlayMaps = {
    "Shapefile": usershapefile,
    "Geopackage": usergeopackage,
    "Prediction Image": predictionimage
};

var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
