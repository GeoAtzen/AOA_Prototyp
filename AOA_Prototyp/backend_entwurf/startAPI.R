library(plumber)

setwd("HIER ANPASSEN AUF EIGENEN PFAD/AOA_Prototyp/backend_entwurf")
pr("plumber.R") %>%
  pr_run(port=8000)
