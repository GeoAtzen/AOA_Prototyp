// erstellen einer leaflet Karte mit Europa als Startpunkt und mit OSM als Basiskarte
var map = L.map("anwendungsmap").setView([52, 7.8], 12);

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

var googlesat = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}');

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

/* geht nicht da .tif statt .png
var imageUrl = '/uploads/usersentineldata.png',
imageBounds = [[51.5, 7], [52, 7.5]];
L.imageOverlay(imageUrl, imageBounds).addTo(map); */

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
var geojsondata = new L.GeoJSON.AJAX("/uploads/usertrainingsdatagjson.geojson", {
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
        geotiffdata.addTo(map);

        map.fitBounds(geotiffdata.getBounds());
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
    "GeoJSON": geojsondata
};

var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);