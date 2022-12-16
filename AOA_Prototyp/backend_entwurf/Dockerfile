FROM rocker/r-ver:4.0.2

# install the linux libraries needed for plumber
RUN apt-get -y update && apt-get install -y \
    libudunits2-dev \
    libgdal-dev \
    libgeos-dev \
    libproj-dev \
    libmysqlclient-dev 
    
# create the application folder
RUN mkdir -p ~/application

# copy everything from the current directory into the container
COPY "/" "application/"
WORKDIR "application/" 

# open port 80 to traffic
EXPOSE 8000

# install plumber
RUN R -e "install.packages(c('randomForest', 'terra', 'caret', 'raster', 'RCurl', 'tiff', 'sf','plumber'))"
RUN R -e "install.packages('plumber', dependencies=TRUE)"
RUN R -e "install.packages('terra', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('caret', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('raster', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('RCurl', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('tiff', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('sf', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('randomForest', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"

# when the container starts, start the main.R script
ENTRYPOINT ["Rscript", "startAPI.R"]