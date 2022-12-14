rm(list=ls())
library(plumber)
library(mapview)
library(terra)
library(caret)
library(raster)
library(RCurl)
library(tiff)
library(sf)
library(randomForest)

################################################################################
################################################################################

# Diese Funktion nimmt Referenzdaten entgegen, die sowohl vom Typ GeoJson,
# Geopackage oder Shapefile schon weiterverarbeitet wurden und trainiert 
# nun mit dem Tif ein Model
trainModel <- function(Referenzdaten){
  url <- ("http://localhost:3000/uploads/usersentineldata.tif")
  geotiff_file <- tempfile(fileext='.tif')
  httr::GET(url,httr::write_disk(path=geotiff_file))
  sentinel <- rast(geotiff_file)
  predictors <- names(sentinel)
  
  Referenzdaten <- st_transform(Referenzdaten, crs(sentinel))
  extr <- extract(sentinel, Referenzdaten)
  Referenzdaten$PolyID <- 1:nrow(Referenzdaten)
  extr <- merge(extr,Referenzdaten,by.x="ID",by.y="PolyID")
  TrainIDs <- createDataPartition(extr$ID,p=0.05,list=FALSE)
  TrainDat <- extr[TrainIDs,]
  TrainDat <- TrainDat[complete.cases(TrainDat[,predictors]),]
  model <- train(TrainDat[,predictors],
                 TrainDat$Label,
                 method="rf",
                 importance=TRUE,
                 ntree=50)
  
  calculatePrediction(sentinel, model)
}

################################################################################
################################################################################

# Diese Funktion erhält ein Tif und ein trainiertes Modell und kann damit die
# Prediction erstellen, welche dann auf den Server geschrieben wird.
calculatePrediction <- function(sentinel, model){
  prediction <- predict(as(sentinel,"Raster"),model)
  prediction_terra <- as(prediction,"SpatRaster")
  
  writeRaster(prediction_terra, "E:/Uni/5. Semester/AOA_Prototyp/AOA_Prototyp/frontend_entwurf/public/downloads/test.tif", overwrite=TRUE)
  plot(prediction_terra)
}

#* Calculates LULC Classification
#* @serializer png
#* @get /tiffgjson
function(){
  Referenzdaten <- st_read("http://localhost:3000/uploads/usertrainingspolygonegjson.geojson")
  trainModel(Referenzdaten)
}

#* Calculates LULC Classification
#* @serializer png
#* @get /tiffgpkg
function(){
  Referenzdaten <- st_read("http://localhost:3000/uploads/usertrainingspolygonegpkg.gpkg")
  trainModel(Referenzdaten)
}

#* Calculates LULC Classification
#* @serializer png
#* @get /tiffshape
function(){
  download.file("http://localhost:3000/uploads/usertrainingsdatashp.zip", destfile = "Classification.zip")
  system("unzip Classification.zip")
  Referenzdaten <- st_read("usertrainingspolygoneshp.shp")
  trainModel(Referenzdaten)
}

#* Calculates LULC Classification
#* @serializer png
#* @get /tiffmodel
function(){
  url <- ("http://localhost:3000/uploads/usersentineldata.tif")
  geotiff_file <- tempfile(fileext='.tif')
  httr::GET(url,httr::write_disk(path=geotiff_file))
  sentinel <- rast(geotiff_file)
  
  model_download <- ("http://localhost:3000/uploads/usertrainedmodel")
  model <- readRDS(url(model_download))
  
  calculatePrediction(sentinel, model)
}

# Programmatically alter your API
#* @plumber
function(pr) {
  pr %>%
    # Overwrite the default serializer to return unboxed JSON
    pr_set_serializer(serializer_unboxed_json())
}
