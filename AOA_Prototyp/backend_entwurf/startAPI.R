library(plumber)

setwd("E:/Uni/5. Semester/AOA_Prototyp/AOA_Prototyp/backend_entwurf")
pr("plumber.R") %>%
  pr_run(port=8000)
