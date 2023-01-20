var express = require("express");
var router = express.Router();
const decompress = require("decompress");
const multer = require("multer");
const fs = require("fs");
var request = require("request");

// error handler
const handleError = (err, res) => {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
};

const upload = multer({
    dest: "/public"
        // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

/**
 * GET Befehl für die Messungen ansehen Seite
 */
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("anwendungsseite", { title: "Anwendungsseite" });
});

router.post("/ergebnisseitemodel", function (req, res, next) {
  // Code zum ausführen des R Skripts
  let url = "http://localhost:8000/"

  let aoiSplit = "";
  console.log("aoi: " + req.body.aoibbmdl);

  if (req.body.aoibbmdl != "") {
    aoiSplit = req.body.aoibbmdl.split(",");
  }
  aoiSplit != ""
        ? (url +=
            "tiffmodel?ymin=" +
            aoiSplit[2] +
            "&ymax=" +
            aoiSplit[3] +
            "&xmin=" +
            aoiSplit[0] +
            "&xmax=" +
            aoiSplit[1])
        : (url += "tiffmodel");
  console.log(url);

  request(url, { json: true }, (err, res2, body) => {
    if (err) {
      return console.log(err);
    }
    res.render("ergebnisseite", { title: "Ergebnisseite" });
  });

  
  //res.render("ergebnisseite", { title: "Ergebnisseite", ueblink: "http://localhost:8000/tiffmodel" })
  
});

router.post("/ergebnisseitegpkg", function (req, res, next) {

  console.log("aoi: " + req.body.aoibbgpkg);

  res.render("ergebnisseite", { title: "Ergebnisseite", ueblink: "http://localhost:8000/tiffgpkg" })
  
});

router.post("/ergebnisseiteshape", function (req, res, next) {
  // Code zum ausführen des R Skripts
  console.log("aoi: " + req.body.aoibbshp);
  
  res.render("ergebnisseite", { title: "Ergebnisseite", ueblink: "http://localhost:8000/tiffshape" })
  
});

router.post("/ergebnisseitegjson", function (req, res, next) {
  // Code zum ausführen des R Skripts
  console.log("aoi: " + req.body.aoibbgjson);
  
  res.render("ergebnisseite", { title: "Ergebnisseite", ueblink: "http://localhost:8000/tiffgjson" })
  
});

module.exports = router;
