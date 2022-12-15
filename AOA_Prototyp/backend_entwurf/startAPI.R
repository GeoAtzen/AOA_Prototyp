rm(list=ls())
library(plumber)

plumb("plumber.R")$run(port=8000)
