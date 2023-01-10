FROM rstudio/plumber

WORKDIR /usr/src/app

# install the linux libraries needed for plumber
RUN apt-get update -qq && apt-get install -y libcurl4-openssl-dev \
    libssl-dev \
    libjq-dev \
    libprotobuf-dev \
    protobuf-compiler \
    make \
    libgeos-dev \
    libudunits2-dev \
    libgdal-dev \
    gdal-bin \
    libproj-dev \
    libv8-dev

RUN apt-get install -y --no-install-recommends libxt6

RUN R -e "install.packages(c('randomForest', 'terra', 'caret', 'raster', 'RCurl', 'tiff', 'sf','plumber','cowplot','tidyterra'))"
RUN R -e "install.packages('plumber', dependencies=TRUE)"
RUN R -e "install.packages('terra', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('caret', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('raster', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('RCurl', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('tiff', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('sf', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('randomForest', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('cowplot', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('tidyterra', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"

#RUN R -e "install.packages('geojsonR', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
#RUN R -e "install.packages('doParallel', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
#RUN R -e "install.packages('parallel', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
#RUN R -e "install.packages('viridis', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
#RUN R -e "install.packages('latticeExtra', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
#RUN R -e "install.packages('tmap', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
#RUN R -e "install.packages('CAST', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"

# Create an application directory
#RUN mkdir -p /R

# Set /R directory as working directory
#WORKDIR /app

# Copy app code source from our local folder into the docker /R working directory
COPY backend/ /usr/src/app
COPY backend/predictions/ /usr/src/app
COPY . .
COPY . /usr/src/app

# install plumber
#RUN R -e "install.packages(c('randomForest', 'terra', 'caret', 'raster', 'RCurl', 'tiff', 'sf','plumber'))"

# open port 8000 to traffic
EXPOSE 8000

# when the container starts, start the main.R script
#ENTRYPOINT ["Rscript", "startAPI.R"]

CMD ["plumber.R"]