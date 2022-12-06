library(plumber)

setwd("D:/Uni/5. Semester/Geosoft2/AOA_Prototyp/backend_entwurf")
pr("plumber.R") %>%
  pr_run(port=8000)
