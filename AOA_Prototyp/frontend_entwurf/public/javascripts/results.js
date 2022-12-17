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

// assigning a label to the drawn Polygon via prompt
var getLabel = function(layer) {
    var label = prompt("Label des Polygons", "Label");
    return label;
};

// assigning a ClassID to the drawn Polygon via prompt
var getclassID = function(layer) {
    var classID = prompt("ClassID des Polygons", "ClassID");
    return classID;
};

// Global array to store the drawn polygons as GeoJSON
var polygonsgeojson = [];

// Source: https://stackoverflow.com/questions/29736345/adding-properties-to-a-leaflet-layer-that-will-become-geojson-options
// Declaring your own features for the drawn polygon to safe them in the geojson
map.on(L.Draw.Event.CREATED, function(e) {
    var layer = e.layer
    feature = layer.feature = layer.feature || {};
    feature.type = feature.type || "Feature";

    var label = getLabel(layer);
    var classID = getclassID(layer);
    // assining the attributes entered in the prompt to be the features of the geojson
    var props = (feature.properties = feature.properties || {}); // Intialize feature.properties
    props.label = label;
    props.classID = classID;

    // adding the drawn polygons to the layer
    drawnItems.addLayer(layer);

    if (label == "Label") {
        layer.bindPopup("Kein Label angegeben");
    } else if (label == "") {
        layer.bindPopup("Kein Label angegeben");
    } else {
        layer.bindPopup("Label: " + label + "<br>" + "ClassID: " + classID).openPopup();
    }
    drawnItems.addLayer(layer);

    // converting the drawn poylgons to geojson and pushing them to the global array
    polygonsgeojson.push(drawnItems.toGeoJSON());

});

/**  
 * @function exportGeoJSON
 * @description Export drawn polygons to a valid GeoJSON File
 * Source: https://stackoverflow.com/questions/58126090/leaflet-draw-saving-data-with-geojson
 */
function exportGeoJSON() {

    // test GeoJSON validity by logging the data to the console for chacking it 
    console.log(drawnItems.toGeoJSON());
    console.log(JSON.stringify(drawnItems.toGeoJSON()));

    // save drawn Polygons as GeoJSON in drawnpolygonsjson
    let drawnpolygonsjson = JSON.stringify(drawnItems.toGeoJSON());

    // telling javascript to export drawnpolygonsjson as JSON format
    let dataUri =
        "data:text/json;charset=utf-8," + encodeURIComponent(drawnpolygonsjson);

    // declaring the export name
    let fileexportname = "digitalized_usertrainingspolygons" + ".geojson";

    // download via DOM
    let linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", fileexportname);

    // if polygon is empty give out error
    let emptypolygon = '{"type":"FeatureCollection","features":[]}';
    if (drawnpolygonsjson == emptypolygon) {
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
    style: function(feature) {
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
    style: function(feature) {
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
var geodrawnpolygonsjson = new L.GeoJSON.AJAX("/uploads/usertrainingspolygonegjson.geojson", {
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

            // https://github.com/GeoTIFF/georaster-layer-for-leaflet-example/blob/master/examples/separated.html#L45
            const pixelValuesToColorFn = ([red, green, blue]) => {
                let mins = georaster.mins;
                red = Math.round(
                    (255 / (4000 - mins[0])) * (red - mins[0])
                );
                green = Math.round(
                    (255 / (4000 - mins[1])) * (green - mins[1])
                );
                blue = Math.round(
                    (255 / (4000 - mins[2])) * (blue - mins[2])
                );

                // make sure no values exceed 255
                red = Math.min(red, 255);
                green = Math.min(green, 255);
                blue = Math.min(blue, 255);

                // treat all black as no data
                if (red === 0 && green === 0 && blue === 0) return null;

                return `rgb(${blue}, ${green}, ${red})`;
            };

            var geotiffdata = new GeoRasterLayer({
                georaster: georaster,
                pixelValuesToColorFn,
                resolution: 512,
            });
            // direktes hinzufügen zur Karte
            geotiffdata.addTo(map);

            map.fitBounds(geotiffdata.getBounds());

            // Asynchrones hinzufügen des Layer zur Layerkontrollfunktion von Leaflet
            layerControl.addOverlay(geotiffdata, 'Satelliten Bild');
        });
    });

// hinzufügen des Prediction .tif via georaster plugin: https://github.com/GeoTIFF/georaster und https://github.com/GeoTIFF/georaster-layer-for-leaflet
function loadprediction() {
    fetch("/downloads/test.tif")
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => {
            parseGeoraster(arrayBuffer).then((georaster) => {
                console.log("georaster:", georaster);

                var predictiongeotiffdata = new GeoRasterLayer({
                    georaster: georaster,
                    //pixelValuesToColorFn,
                    resolution: 512
                });
                // direktes hinzufügen zur Karte
                predictiongeotiffdata.addTo(map);

                map.fitBounds(predictiongeotiffdata.getBounds());

                // Asynchrones hinzufügen des Layer zur Layerkontrollfunktion von Leaflet
                layerControl.addOverlay(predictiongeotiffdata, 'Prediction');
            });
        });
}
// Layer Control
var baseMaps = {
    "OpenStreetMap": osm,
    "Google Satellite": googlesat
};

var overlayMaps = {
    "Shapefile": usershapefile,
    "Geopackage": usergeopackage,
    "GeoJSON": geodrawnpolygonsjson,
    "Eigene Polygone": drawnItems
};

var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);