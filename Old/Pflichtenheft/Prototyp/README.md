# yourChoice &middot; GUI - Prototyp

## Installation und Starten des Projektes

### Installation

```bash
$ git clone https://github.com/haussjonas/your-choice-prototype # Projekt von Github laden und lokal speichern
$ cd your-choice-prototype                                      # In das heruntergeladene Verzeichnis wechseln
$ npm install                                                   # Abhängigkeiten der Anwendung installieren
```

### Starten des Entwicklungsservers

```bash
$ npm start                                                     # Enwicklungsserver starten
```

Nach einem erfolgreichen Start des Servers, sollte die IP-Adresse des soeben gestarteten Servers im Terminal ausgegeben werden:

```bash
$ npm run start

> your-choice-prototype@0.1.0 start H:\projects\your-choice-prototype
> react-app-rewired start

Starting the development server...

Compiled successfully!

You can now view your-choice-prototype in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://XXX.XXX.XXX.XXX:3000/

Note that the development build is not optimized.
To create a production build, use npm run build.
```

---

## Benötigte Software

### [Node](https://nodejs.org/)

Node.js ist eine JavaScript Laufzeitumgebung. Hauptsächlich in der Entwicklung von Backend-Systemen wird Node.js eingesetzt, aber auch für allgemeine Scripting Angelegenheiten bietet sich der Einsatz von Node.js an. Im Rahmen dieser Frontend-Anwendung wird Node.js für eine Handvoll von Aufgaben eingesetzt: z.B. dem Linting, dem Testing und dem Zusammenfügen einzelner Dateien.

Installationsdateien können auf der Homepage heruntergeladen werden. Windows und Linux Nutzer sollten darauf achten, die 64-bit Versionen zu installieren. Für macOS wird nur die 64-bit Version zur Verfügung gestellt.

Nach der Installation von Node kann in einem Terminal mit dem Befehl `node -v` die installierte Version von Node.js überprüft werden.

### [NPM](https://www.npmjs.com/)

NPM ist der standard Packetmanager für Node. Bei der Installation von Node wird npm automatisch mitinstalliert. Packetmanager werden dazu verwendet, Code-Module (vom Entwickler selbst oder von anderen Entwicklern) zu installieren und zu verwalten. In dieser Anwendung werden einige Pakete verwendet, weswegen sich der Gebrauch einer Verwaltung anbietet damit der Entwickler diese nicht von Hand verwalten muss.

Die aktuelle LTS Version von Node.js ist **8.9.3** und beinhaltet npm **5.5.1**. In allen weiteren Schritten wird mindestens von dieser Node.js und npm Version ausgegangen. Ältere Versionen werden unter Umständen nicht mehr von allen verwendeten Paketen unterstützt.

Ebenfalls kann die Version von npm in einem Terminal mit `npm -v` überprüft werden.

Node Projekte werden über eine `package.json` konfiguriert werden. npm oder auch andere Paketverwaltungen tragen in dieser Datei die Programm-Abhängigkeiten ein. Zusätzlich können sogenannte Tasks in die Konfigurationsdatei eingetragen werden. Über Tasks können verschiedene Aufgaben ausgeführt werden. Zum Beispiel das Starten des Entwicklungsservers oder das Ausführen von Tests.

### [Git Bash](https://git-scm.com/downloads)

Git Bash ist eine Bash-Anwendung mit vorinstalliertem [Git-Versionskontroll-System](https://rogerdudler.github.io/git-guide/index.de.html) für Windows. Zudem beinhaltet es Bash (eine Shell-Befehlszeile) mit einer Sammlung von weiteren separaten \*nix Tools - z.B. `ssh, scp, cat`.

Windows Benutzer können nun mit einer Bash wie z.B. unter Ubuntu arbeiten. Die schließt größten Teils die Lücke der unterschiedlichen Betriebsystem-Plattformen. Unter Windows werden nun die gleichen Befehle zugänglich gemacht wie sie bereits aus \*nix oder macOS bekannt sind.

### [Visual Studio Code](https://code.visualstudio.com/)

VS Code ist ein schlanker Codeeditor von Microsoft. Der Editor läuft plattformunabhängig und wird in dieser Webanwendung als IDE eingesetzt. Mit ein paar wenigen Erweiterungen bietet sich VS Code als Entwicklungsumgebung für den Frontend-Prototypen an.

Nach der Installation der benötigten Plugins, müssen kleinere Anpassungen an Visual Studio Code angepasst werden, damit der Code automatisch beim Speichern formatiert werden kann und die richtige Shell, in diesem Fall Git Bash unter Windows, verwendet wird.

Folgende Einstellungen werden zu den Benutzereinstellungen in VS Code hinzugefügt

```json
{
  "terminal.integrated.shellArgs.windows": [
    "--command=usr/bin/bash.exe",
    "-l",
    "-i"
  ],
  "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\git-cmd.exe",
  "editor.formatOnSave": true,
  "javascript.format.enable": false,
  "prettier.eslintIntegration": true
}
```

`"terminal.integrated.shell.windows"` wird in diesem Fall auf den Standard-Installationspfad von Git Bash gesetzt. Unter Umständen muss dieser Pfad angepasst werden, damit VS Code auch tatsächlich die `git-cmd.exe` findet.

Nach einem Neustart sollte VS Code nun Git Bash als integriertes Terminal verwenden.

### [React Food Truck Plugin](https://marketplace.visualstudio.com/items?itemName=burkeholland.react-food-truck)

Eine erlesene Auswahl von VS Code Plugins die viele Funktionalitäten rund um die React-Entwicklung mit sich bringt. Insbesondere sind die erweiterte Autovervollständigung, das Linting und die automatische Codeformatierung sehr nützlich.

### [EditorConfig Plugin](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

EditorConfig ist ein Tool um einheitliche Dateiformatierungen zwischen einzelnen Editoren und IDE's zu definieren. Mit dem entsprechenden Plugin für Visual Studio Code werden die zu bearbeitenden Dateien automatisch nach der Konfiguration formatiert.

In diesem Projekt wird die Konfiguration dazu verwendet, den Code mit Spaces anstatt von Tabs einzurücken, des Weiteren werden einheitliche Zeilen- und Dateiendungszeichen festgelegt. Somit wird sichergestellt, dass Git nicht unnötig den Code formatiert und womöglich das Repository unbrauchbar macht, da die falschen Zeichen für neue Zeilen verwendet wurden.

### [Google Chrome Browser](https://www.google.com/chrome/browser/desktop/index.html)

Ein der weltweit am weitest verbreiteten Browser. Der Browser wurde 2008 von Google veröffentlicht und erfreut sich gerade unter Web-Entwicklern höchster Beliebtheit.

### [React Developer Tools für Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

Dieses Plugin erlaubt das Debugging von React-Applikationen. Durch diese Browser-Erweiterung kann die Komponenten-Hierachie problemlos inspiziert werden.

---

## Verwendete Tools & Bibliotheken

### [antd](https://github.com/ant-design/ant-design)

Ein Enterprise-UI-Komponenten Framework.

### [axios](https://github.com/axios/axios)

Ein HTTP Client für den Browser. Diese Bibliothek wird hauptsächlich zur Kommunikation mit dem Backend verwendet. Die Anfragen an das Backend werden mit Axios erstellt, abgeschickt und schlussendlich auch verarbeitet. Axios bietet sehr viele umfangreiche Konfigurationsmöglichkeiten und Features die zur komfortablen Server-Client-Kommunikation eingesetzt werden können.

### [babel](https://github.com/babel/babel)

Ein JavaScript-Compiler der neue JavaScript-Standards unterstützt und diese einen browser-kompatiblen Syntax übersetzt. Normalerweise müssen Entwickler warten, bis jeder Browser-Hersteller den neuen JavaScript-Standard unterstützt. Da diese Integrationen aber sehr zeitaufwändig sind, gibt es Tools wie Babel. Hiermit wird dieses Problem durch Cross-Kompilierung umgangen. Ein neuer Syntax wird in einen für Browser verständlichen Syntax übersetzt.

### [chart.js](https://github.com/chartjs/Chart.js)

Einfache Sammlung von Diagrammen zur Darstellung unterschiedlichster Datensätze.

### [eslint](https://github.com/eslint/eslint)

Mit ESlint kann Quellcode statisch analysiert werden. Das heißt, es kann nicht sichergestellt werden, ob der Code korrekt abläuft, dennoch wird die Programmanalyse deutlich vereinfacht. Einerseits können nämlich Syntaxfehler und andererseits auch stilistische Schwachstellen und strukturelle Probleme aufgezeigt werden. Diese müssen nicht unbedingt Programmierfehler sein, können aber leicht zu solchen führen. Durch den Einsatz von ESlint wird sichergestellt, dass Code in einem einheitlichen Syntax-Stil mit gewissen Bedingungen und/oder Regeln geschrieben wird.

### [moment](https://github.com/moment/moment)

Eine sehr umfangreiche Bibliothek zur Manipulation, Validierung und Formatierung von Date-Objekten in JavaScript.

### [less](https://github.com/less/less.js/)

Ein CSS Pre-Prozessor um den eigentlichen CSS-Standard um viele Funktionen zu erweitern. Mit Less können Variablen, Funktionen etc. zur Erstellung von CSS-Dateien verwendet werden. Stylesheets können mit Hilfe von Less einfacher erweitert, erstellt und verwaltet werden. Gerade der Einsatz von Variablen bietet Entwicklern die Möglichkeit flexible und wiederverwendbare Farbschemen zu erstellen.

### [prettier](https://github.com/prettier/prettier)

Mit diesem Tool kann Code nach einem einheitlichen Standard formatiert werden. Zusammen mit ESlint in Visual Studio Code wird jeglicher Code automatisch beim Speichern formatiert und styletechnisch analysiert bzw. optimiert. Prettier selbst schreibt dabei keinen Code um, sondern schlägt alternative Lösungen für einen einheitlichen Code-Style vor.

### [react](https://github.com/facebook/react)

Eine JavaScript Bibliothek zur User-Interface-Erstellung von Facebook. React erlaubt es dem Anwender die Applikation in viele kleine Komponenten aufzuteilen. Jede Komponente ist für sich gekapselt und verwaltet ihren eigenen internen Zustand. Zusammen mit weiteren Komponenten können sehr komplexe UI's aus vielen kleinen und übersichtlichen Bausteinen erstellt werden. React entscheidet wann welche Komponente neu gerendert werden muss und ob weitere Komponenten in der Hierarchie ebenfalls betroffen sind. Diese Überwachung des Renderings erlaubt es sehr schnelle und umfangreiche UI's zu schreiben die in Echtzeit reagieren können.
