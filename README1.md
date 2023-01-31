# Area of Application by GeoAtzen
A Tool to calculate the Area of Applicability (Initial Paper by Meyer, H. and Pebesma, E.)
<h2> Getting Started</h2>
We used Docker to ensure an easy deployment.

<h3>Frontend</h3>
Clone the Repository and save it locally. Open the `frontend_entwurf` and in your IDE and enter following commands into your terminal:

```$ npm install```
```$ npm start```

The website should then be available under [http://localhost:3000/](http://localhost:3000/)

<h3>R-Plumber Backend</h3>


Öffnen Sie die Datei "startAPI.R" in RStudio und ändern dort in der 3. Zeile den Pfad zum workdirectory auf den Pfad zum Ordner "backend_entwurf" dieses Repositories
<br>
<br>
Führen Sie dann (vorrausgesetzt alle Packages aus der "plumber.R" Datei sind installiert) alle Zeilen der "startAPI.R" Datei aus.<br> <br>
Falls alles geklappt hat, öffnet sich ein neues RStudio Fenster mit der Plumber API und sie können über http://localhost:8000/ 
auf diese Zugreifen.
<br>
<br>
Testen Sie die Funktionalität auf der Seite:<br>
http://localhost:8000/echo
<br><br>

<h3>Docker</h3>
Gerade nicht verfügbar:
Docker: <br>
Wenn Sie Docker installiert haben, ist es möglich über den simplen Befehl <br>
$ docker-compose up
<br>
Die Anwendung zu starten. <br>
Die Website ist dann erreichbar unter:<br>
http://localhost:3000/
<br>

<h2>Prerequisites</h2>

<h2>Usage</h2>

<h2>License</h2>

<h2>Acknowledgments</h2>