
// erstellen einer leaflet Karte mit Europa als Startpunkt und mit OSM als Basiskarte


var map = L.map("anwendungsmap").setView([52, 7.8], 12);

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
    polygon: false
  },
  edit: {
    featureGroup: drawnItems
  }
})

// adding drawControl
map.addLayer(drawnItems)
map.addControl(drawControl)


// adding the drawn rectangle to map via event
map.on(L.Draw.Event.CREATED, (e) => {
  var type = e.layerType;
  var layer = e.layer;
  rectangle = layer.toGeoJSON().geometry.coordinates;
  console.log(rectangle)
  drawnItems.addLayer(layer);
  map.addLayer(layer);

map.on("draw:deleted", function (e) {
  map.removeControl(drawControl);
  map.addControl(drawControl);
});
})

// geht nicht da .tif statt .png
var imageUrl = '/uploads/usersentineldata.tif',
imageBounds = [[51.5, 7], [52, 7.5]];
L.imageOverlay(imageUrl, imageBounds).addTo(map);

// Anzeigen der hochgeladenen Shapefile
var usershapefile = new L.Shapefile("/uploads/usertrainingsdata.zip", {
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
                color: "orange"
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
};

var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
