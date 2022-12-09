###############################################################################
rm(list=ls())
# Packages einladen
library(plumber)
library(mapview)
library(terra)
library(caret)
library(raster)
library(RCurl)
library(tiff)
library(sf)
library(randomForest)

###############################################################################
#* @apiTitle Plumber Example API
#* @apiDescription Plumber example description.
#* Echo back the input
#* @param msg The message to echo
#* @get /echo
function(msg = "") {
  
  list(msg = paste0("The message is: '", msg, "'"))
  
}


#* Calculates LULC Classification
#* @serializer png
#* @get /tiffgpkg
function(){
  
  # Tif herunterladen und einfügen
  url <- ("http://localhost:3000/uploads/usersentineldata.tif")
  geotiff_file <- tempfile(fileext='.tif')
  httr::GET(url,httr::write_disk(path=geotiff_file))
  sentinel <- rast(geotiff_file)
  
  
  # Geopackage als Zip herunterladen und eingefügt
  download.file("http://localhost:3000/uploads/usertrainingsdata.zip", destfile="Classification.zip")
  system("unzip Classification.zip")
  
  Referenzdaten <- st_read("Trainingspolygone_Warendorf_EPSG_4326_layer1.gpkg")
  
  # Predictors setzen
  predictors <- names(sentinel)
  
  Referenzdaten <- st_transform(Referenzdaten, crs(sentinel))
  
  extr <- extract(sentinel, Referenzdaten)
  head(extr)
  
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
  prediction <- predict(as(sentinel,"Raster"),model)
  prediction_terra <- as(prediction,"SpatRaster")
  
  plot(prediction_terra, axes=FALSE, frame.plot=FALSE)
  
}

#* Calculates LULC Classification
#* @serializer png
#* @get /tiffshape
function(){
  
  url <- ("http://localhost:3000/uploads/usersentineldata.tif")
  geotiff_file <- tempfile(fileext='.tif')
  httr::GET(url,httr::write_disk(path=geotiff_file))
  sentinel <- rast(geotiff_file)
  
  
  
  download.file("http://localhost:3000/uploads/usertrainingsdata.zip", destfile = "Classification.zip")
  system("unzip Classification.zip")
  
  Referenzdaten <- st_read("Trainingspolygone_warendorf.shp")
  
  predictors <- names(sentinel)
  
  Referenzdaten <- st_transform(Referenzdaten, crs(sentinel))
  
  
  extr <- extract(sentinel, Referenzdaten)
  
  
  Referenzdaten$PolyID <- 1:nrow(Referenzdaten)
  
  extr <- merge(extr,Referenzdaten,by.x="ID",by.y="PolyID")
  TrainIDs <- createDataPartition(extr$ID,p=0.3,list=FALSE)
  TrainDat <- extr[TrainIDs,]
  
  TrainDat <- TrainDat[complete.cases(TrainDat[,predictors]),]
  model <- train(TrainDat[,predictors],
                  TrainDat$Label,
                  method="rf",
                  importance=TRUE,
                  ntree=50)
  
  prediction <- predict(as(sentinel,"Raster"),model)
  prediction_terra <- as(prediction,"SpatRaster")
  
  plot(prediction_terra, axes=FALSE, frame.plot=FALSE)
}



#* Calculates LULC Classification
#* @serializer png
#* @get /tiffmodel
function(){
  
  # 
  url <- ("http://localhost:3000/uploads/usersentineldata.tif")
  geotiff_file <- tempfile(fileext='.tif')
  httr::GET(url,httr::write_disk(path=geotiff_file))
  sentinel <- rast(geotiff_file)
  
  
  y <- ("http://localhost:3000/uploads/usertrainedmodel")
  model <- readRDS(url(y))
  
  prediction <- predict(as(sentinel,"Raster"),model)
  prediction_terra <- as(prediction,"SpatRaster")
  
  plot(prediction_terra, axes=FALSE, frame.plot=FALSE)
}

# Programmatically alter your API
#* @plumber
function(pr) {
  pr %>%
    # Overwrite the default serializer to return unboxed JSON
    pr_set_serializer(serializer_unboxed_json())
}
