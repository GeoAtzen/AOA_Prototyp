var express = require("express");
var router = express.Router();
const decompress = require("decompress");
const multer = require("multer");
const fs = require("fs");

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

  
  res.render("ergebnisseite", { title: "Ergebnisseite", ueblink: "http://localhost:8000/tiffmodel" })
  
});

router.post("/ergebnisseitegpkg", function (req, res, next) {

  res.render("ergebnisseite", { title: "Ergebnisseite", ueblink: "http://localhost:8000/tiffgpkg" })
  
});

router.post("/ergebnisseiteshape", function (req, res, next) {
  // Code zum ausführen des R Skripts

  
  res.render("ergebnisseite", { title: "Ergebnisseite", ueblink: "http://localhost:8000/tiffshape" })
  
});

router.post("/ergebnisseitegjson", function (req, res, next) {
  // Code zum ausführen des R Skripts

  
  res.render("ergebnisseite", { title: "Ergebnisseite", ueblink: "http://localhost:8000/tiffgjson" })
  
});


module.exports = router;
