# AOA_Prototyp
<h2>Erklärung</h2>
Der erste Prototyp unser Anwendung!

<h2>Tutorial</h2>
<h4>Node Frontend:</h4>
<br>
Klonen Sie das Repository und speichern es Lokal.<br>
Öffnen Sie den frontend_entwurf Ordner dann in ihrer IDE oder navigieren sie dorthin. Dort geben Sie dann im Terminal folgenden Befehl ein:
<br>
$ npm install <br>
und dann <br>
$ npm start <br>
<br>
Die Website ist dann erreichbar unter:<br>
http://localhost:3000/
<br>
<br>
<h4>R-Plumber backend:</h4>
<br>
Öffnen Sie die Datei "startAPI.R" in RStudio und ändern dort in der 3. Zeile den Pfad zum workdirectory auf den Pfad zum Ordner "backend_entwurf" dieses Repositories
<br>
Führen Sie dann (vorrausgesetzt alle Packages aus der "plumber.R" Datei sind installiert) alle Zeilen der "startAPI.R" Datei aus.<br>
Falls alles geklappt hat, öffnet sich ein neues RStudio Fenster mit der Plumber API und sie können über http://localhost:8000/ 
auf diese Zugreifen.
<br>
Testen Sie die Funktionalität auf der Seite:<br>
http://localhost:8000/echo


Gerade nicht verfügbar:
Docker: <br>
Wenn Sie Docker installiert haben, ist es möglich über den simplen Befehl <br>
$ docker-compose up
<br>
Die Anwendung zu starten. <br>
Die Website ist dann erreichbar unter:<br>
http://localhost:3000/
<br>
