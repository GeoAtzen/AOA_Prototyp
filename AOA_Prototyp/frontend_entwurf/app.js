var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const fs = require("fs");
const http = require("http");
const multer = require("multer");
const decompress = require("decompress");

var app = express();

// Uploading data handler for Sentinel 2 tif here

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

app.post(
  "/uploadsentinel",
  upload.single("file"),
  (req, res) => {

    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "public/uploads/usersentineldata.tif");

    if (path.extname(req.file.originalname).toLowerCase() === ".tif") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res
        .status(200)
        .render("fileupload", { title: "Fileupload" });

      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .render("fileuploaderror", { title: "Uploadfehler" });
          
      });
    }
  }
);

// Uploading data handler for trainingsdata here (gpkg as .zip)

app.post(
  "/uploadtrainingsdatagpkg",
  upload.single("file"),
  (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "public/uploads/usertrainingsdatagpkg.zip");

    if (path.extname(req.file.originalname).toLowerCase() === ".zip") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res
          .status(200)
          .render("fileupload", { title: "Fileupload" })
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .render("fileuploaderror", { title: "Uploadfehler" });
      });
    }
    // decompressing .zip to .gpkg
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
  }
);

// Uploading data handler for trainingsdata as shapefile (.zip)
app.post(
  "/uploadtrainingsdatashp",
  upload.single("file"),
  (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "public/uploads/usertrainingsdatashp.zip");

    if (path.extname(req.file.originalname).toLowerCase() === ".zip") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res
          .status(200)
          .render("fileupload", { title: "Fileupload" })
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .render("fileuploaderror", { title: "Uploadfehler" });
      });
    }
  }
);

// Uploading data handler for trainingsdata as geojson (.json)
app.post(
  "/uploadtrainingsdatagjson",
  upload.single("file"),
  (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "public/uploads/usertrainingsdatagjson.geojson");

    if (path.extname(req.file.originalname).toLowerCase() === ".geojson") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res
          .status(200)
          .render("fileupload", { title: "Fileupload" })
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .render("fileuploaderror", { title: "Uploadfehler" });
      });
    }
  }
);


// Uploading data handler for trained model here
app.post(
  "/uploadmodel",
  upload.single("file"),
  (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "public/uploads/usertrainedmodel");

    if (path.extname(req.file.originalname).toLowerCase() === "") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res
          .status(200)
          .render("fileupload", { title: "Fileupload" })
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .render("fileuploaderror", { title: "Uploadfehler" });
      });
    }
  }
);

app.post("/anwendungsseite", function (req, res, next) {
  res.render("anwendungsseite", { title: "Anwendungsseite" });
});

var startRouter = require("./routes/start");
app.use("/", startRouter);
//var ergebnisseiteRouter = require("../ergebnisseite");
var anwendungsseiteRouter = require("./routes/anwendungsseite");
var impressumRouter = require("./routes/impressum");


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


//app.use("/ergebnisseite", ergebnisseiteRouter);
app.use("/anwendungsseite", anwendungsseiteRouter);
app.use("/impressum", impressumRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});



module.exports = app;
