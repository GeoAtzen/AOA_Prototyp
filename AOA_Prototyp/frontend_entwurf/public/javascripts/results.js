// erstellen einer leaflet Karte mit Europa als Startpunkt und mit OSM als Basiskarte
var map = L.map("ergebnismap").setView([52, 7.8], 12);

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
    maxZoom: 19,
}).addTo(map);

var googlesat = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}');

// drawcontrol variables
var drawnItems = new L.FeatureGroup()
map.addLayer(drawnItems)

var drawControl = new L.Control.Draw({
  draw: {
    marker: false,
    circle: false,
    polyline: false,
    circlemarker: false,
    rectangle: false,
    poylgon: true,
  },
  edit: {
    featureGroup: drawnItems
  }
})

// adding drawControl
map.addControl(drawControl)

// Label
var getLabel = function (layer) {
  var label = prompt("Label des Polygons", "Label");
  return label;
};

// ClassID
var getclassID = function (layer) {
  var classID = prompt("ClassID des Polygons", "ClassID");
  return classID;
};

// Global array to store the drawn polygons as GeoJSON
var polygonsgeojson = []; 

// Source: https://stackoverflow.com/questions/29736345/adding-properties-to-a-leaflet-layer-that-will-become-geojson-options
map.on(L.Draw.Event.CREATED, function (e) {
  var layer = e.layer
    feature = layer.feature = layer.feature || {};
    feature.type = feature.type || "Feature";

  var label = getLabel(layer);
  var classID = getclassID(layer);
  var props = (feature.properties = feature.properties || {}); // Intialize feature.properties
  props.label = label;
  props.classID = classID;
  drawnItems.addLayer(layer);

  if (label == "Label") {
    layer.bindPopup("Kein Label angegeben");
  } else if (label == "") {
    layer.bindPopup("Kein Label angegeben");
  } else {
    layer.bindPopup("Label: " + label + "<br>" + "ClassID: " + classID).openPopup();
  }
  drawnItems.addLayer(layer);

  //polygonsgeojson speichern
  polygonsgeojson.push(drawnItems.toGeoJSON());
  
});

/**  
* @function exportGeoJSON
* @description Export to GeoJSON File
* Source: https://stackoverflow.com/questions/58126090/leaflet-draw-saving-data-with-geojson
*/
function exportGeoJSON() {
  
  //test GeoJSON validity
  console.log(drawnItems.toGeoJSON());
  console.log(JSON.stringify(drawnItems.toGeoJSON()));
  
  // save drawn Polygons as JSON in jsonData
  let jsonData = JSON.stringify(drawnItems.toGeoJSON());
  
  // telling javascript to export jsonData as JSON
  let dataUri =
    "data:text/json;charset=utf-8," + encodeURIComponent(jsonData); 
  
  // stating the export name
  let fileexportname = "digitalized_user_trainingspolygons" + ".geojson";
  
  // download
  let linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", fileexportname);

  // if polygon is empty give out error
  let emptypolygon = '{"type":"FeatureCollection","features":[]}';
  if (jsonData == emptypolygon) {
    alert("Sie haben noch keine Polygone gezeichnet!");
  } else {
    linkElement.click();
  }
}


// Anzeigen der hochgeladenen Shapefile
var usershapefile = new L.Shapefile("/uploads/usertrainingsdatashp.zip", {
        onEachFeature: function(feature, layer) {
            if (feature.properties) {
                layer.bindPopup(Object.keys(feature.properties).map(function(k) {
                    return k + ": " + feature.properties[k];
                }).join("<br />"), {
                    maxHeight: 200
                });
            }
        },
        style: function (feature) {
          switch (feature.properties.Label) {
            case "Acker":
              return { color: "#d18b2c" };
            case "Acker_bepflanzt":
              return { color: "#70843a" };
            case "Bahnschiene":
              return { color: "#696969" };
            case "Baumgruppe":
              return { color: "#11671e" };
            case "Binnengewaesser":
              return { color: "#0a1cb1" };
            case "Industrie":
              return { color: "#696969" };
            case "Innenstadt":
              return { color: "#696969" };
            case "Kunstrasen":
              return { color: "#92e597" };
            case "Laubwald":
              return { color: "#11671e" };
            case "Mischwald":
              return { color: "#11671e" };
            case "Parklandschaft":
              return { color: "#92e597" };
            case "Siedlung":
              return { color: "#696969" };
            case "Strand":
              return { color: "#ffff00" };
            case "Versiegelt":
              return { color: "#696969" };
            case "Wiese":
              return { color: "#00FF00" };
            default:
              return { color: "##000000" };
                }
            },
      });

// Anzeigen des hochgeladenen geopackages
// Anmerkung: Layer MUSS layer1 heißen
var usergeopackage = new L.geoPackageFeatureLayer([], {
     geoPackageUrl: '/uploads/usertrainingspolygonegpkg.gpkg',
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
        style: function (feature) {
          switch (feature.properties.Label) {
            case "Acker":
              return { color: "#d18b2c" };
            case "Acker_bepflanzt":
              return { color: "#70843a" };
            case "Bahnschiene":
              return { color: "#696969" };
            case "Baumgruppe":
              return { color: "#11671e" };
            case "Binnengewaesser":
              return { color: "#0a1cb1" };
            case "Industrie":
              return { color: "#696969" };
            case "Innenstadt":
              return { color: "#696969" };
            case "Kunstrasen":
              return { color: "#92e597" };
            case "Laubwald":
              return { color: "#11671e" };
            case "Mischwald":
              return { color: "#11671e" };
            case "Parklandschaft":
              return { color: "#92e597" };
            case "Siedlung":
              return { color: "#696969" };
            case "Strand":
              return { color: "#ffff00" };
            case "Versiegelt":
              return { color: "#696969" };
            case "Wiese":
              return { color: "#00FF00" };
            default:
              return { color: "##000000" };
                }
            },
          });

// add GeoJSON to map
var geojsondata = new L.GeoJSON.AJAX("/uploads/usertrainingspolygonegjson.geojson", {
  onEachFeature: function(feature, layer) {
            if (feature.properties) {
                layer.bindPopup(Object.keys(feature.properties).map(function(k) {
                    return k + ": " + feature.properties[k];
                }).join("<br />"), {
                    maxHeight: 200
                });
            }
        },
        style: function (feature) {
          switch (feature.properties.Label) {
            case "Acker":
              return { color: "#d18b2c" };
            case "Acker_bepflanzt":
              return { color: "#70843a" };
            case "Bahnschiene":
              return { color: "#696969" };
            case "Baumgruppe":
              return { color: "#11671e" };
            case "Binnengewaesser":
              return { color: "#0a1cb1" };
            case "Industrie":
              return { color: "#696969" };
            case "Innenstadt":
              return { color: "#696969" };
            case "Kunstrasen":
              return { color: "#92e597" };
            case "Laubwald":
              return { color: "#11671e" };
            case "Mischwald":
              return { color: "#11671e" };
            case "Parklandschaft":
              return { color: "#92e597" };
            case "Siedlung":
              return { color: "#696969" };
            case "Strand":
              return { color: "#ffff00" };
            case "Versiegelt":
              return { color: "#696969" };
            case "Wiese":
              return { color: "#00FF00" };
            default:
              return { color: "##000000" };
                }
            },
      });

// hinzufügen des .tif via georaster plugin: https://github.com/GeoTIFF/georaster und https://github.com/GeoTIFF/georaster-layer-for-leaflet
fetch("/uploads/usersentineldata.tif")
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => {
      parseGeoraster(arrayBuffer).then((georaster) => {
        console.log("georaster:", georaster);

        var geotiffdata = new GeoRasterLayer({
          georaster: georaster,
          resolution: 256,
          pixelValuesToColorFn: (values) => {
            let maxs = georaster.maxs;
            let mins = georaster.mins;

            values[0] = Math.round(
              (255 / (4000 - mins[0])) * (values[0] - mins[0])
            );
            values[1] = Math.round(
              (255 / (4000 - mins[1])) * (values[1] - mins[1])
            );
            values[2] = Math.round(
              (255 / (4000 - mins[2])) * (values[2] - mins[2])
            );

            // make sure no values exceed 255
            values[0] = Math.min(values[0], 255);
            values[1] = Math.min(values[1], 255);
            values[2] = Math.min(values[2], 255);

            // treat all black as no data
            if (values[0] === 0 && values[1] === 0 && values[2] === 0)
              return null;

            return `rgb(${values[2]}, ${values[1]}, ${values[0]})`;
          },
        });
        // direktes hinzufügen zur Karte
        geotiffdata.addTo(map);

        map.fitBounds(geotiffdata.getBounds());

        // Asynchrones hinzufügen des Layer zur Layerkontrollfunktion von Leaflet
        layerControl.addOverlay(geotiffdata, 'Satelliten Bild');
      });
    });

// Layer Control
var baseMaps = {
    "OpenStreetMap": osm,
    "Google Satellite": googlesat
};

var overlayMaps = {
    "Shapefile": usershapefile,
    "Geopackage": usergeopackage,
    "GeoJSON": geojsondata,
    "Eigene Polygone": drawnItems
};

var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
