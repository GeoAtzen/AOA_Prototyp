var express = require("express");
var router = express.Router();
const decompress = require("decompress");

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
  
  try {
const files = decompress("./public/uploads/usertrainingsdatagpkg.zip", "./public/uploads", {
         map: file => {
             file.path = `usertrainingspolygone.gpkg`;
             return file;
         }
     });
     console.log("done!");
 } catch (error) {
    console.log(error);
}

  
  res.render("ergebnisseite", { title: "Ergebnisseite", ueblink: "http://localhost:8000/tiffgpkg" })
  
});

router.post("/ergebnisseiteshape", function (req, res, next) {
  // Code zum ausführen des R Skripts

  
  res.render("ergebnisseite", { title: "Ergebnisseite", ueblink: "http://localhost:8000/tiffshape" })
  
});



module.exports = router;
