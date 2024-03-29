# Webanwendung-Schwachstellen
Entwickelte Webanwendung im Modul IT-Sicherheit. Sie enthält bewusst typische Schwachstellen von Webanwendungen. Nur zur Demonstration.

## Entwicklung
### Client/Frontend
Der Client wird mit React entwickelt und befindet sich im Ordner "/client". Als Programmiersprache wird JavaScript verwendet.

Beim ersten Start ist zu dem das installieren aller verwendeten Bibliotheken nötwendig:
```
npm install
```
Zum Starten im Entwicklungsmodus:
```
npm start
```

### Server/Backend
Serverseitig kommt NodeJs mit dem Express Framework zum Einsatz. Das Backend befindet sich im Ordner "/server" Als Programmiersprache wird auch hier JavaScript verwendet.
Beim ersten Start ist zu dem das installieren aller verwendeten Bibliotheken nötwendig:
```
npm install
```
Zum Starten im Entwicklungsmodus:
```
npm start
```

### Datenbank
Eine Datenbank kann über docker aus dem root-Verzeichnis gestartet werden:
```
docker compose up -d db
```
Beim erstmaligen Starten der Datenbank ist das Anlegen der Tabellen via SQL notwendig. Das SQL-Skript befindet sich im Repository.

## Produktion
Das Bauen der Anwendung für die Produktion geschieht mit docker.
Folgender Befehl im root-Verzeichnis baut die Images:
```
docker compose build
```
Und mit folgendem Befehl werden die Container mit den Images gestartet:
```
docker compose up -d
```
