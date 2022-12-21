FROM rocker/r-ver:4.0.2

# install the linux libraries needed for plumber
RUN apt-get -y update && apt-get install -y \
    libudunits2-dev \
    libgdal-dev \
    libgeos-dev \
    libproj-dev \
    libmysqlclient-dev 

RUN apt-get install -y --no-install-recommends libxt6

RUN R -e "install.packages('plumber', dependencies=TRUE)"
RUN R -e "install.packages('terra', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('caret', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('raster', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('RCurl', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('tiff', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('sf', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('randomForest', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"

#RUN R -e "install.packages('geojsonR', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
#RUN R -e "install.packages('doParallel', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
#RUN R -e "install.packages('parallel', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
#RUN R -e "install.packages('viridis', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
#RUN R -e "install.packages('latticeExtra', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
#RUN R -e "install.packages('tmap', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
#RUN R -e "install.packages('CAST', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"

# create the application folder
#RUN mkdir -p ~/application

# copy everything from the current directory into the container
#COPY "/" "application/"
#WORKDIR "application/" 
WORKDIR /usr/src/app

# Copy app code source from our local folder into the docker /usr/src/app working directory
COPY ./public/uploads/ ./
COPY ./public/R/plumber.R ./
COPY ./public/R/startAPI.R ./

# install plumber
#RUN R -e "install.packages(c('randomForest', 'terra', 'caret', 'raster', 'RCurl', 'tiff', 'sf','plumber'))"

# open port 80 to traffic
EXPOSE 8000

# when the container starts, start the main.R script
ENTRYPOINT ["Rscript", "startAPI.R"]

# CMD ["startAPI.R"]