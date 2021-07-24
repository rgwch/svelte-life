# Einstieg in Svelte

## Start

````
npx degit sveltejs/tmplate hexagon
cd hexagon
npm i
npm run dev
`````

Richten Sie Ihren Browser auf [http://localhost:5000](), und schon werden Sie mit dem Svelte Startbildschirm belohnt:

![](img/template.jpg)


Da wir lieber in Typescript programmieren möchten, konvertieren wir das Projekt. Stoppen <Sie das laufende Script mit STRG-C und geben Sie ein:

`````
node ./scripts/setupTypeScript.js 
npm i
`````

Das erneute `npm i` ist erforderlich, weil das Konvertieren weitere Abhängigkeiten deklariert hat. Wenn wir jetzt erneut `npm run dev` eingeben, sehen wir im Browser dasselbe, wie vorhin.

Lassen Sie den Browser geöffnet und das Script laufen, und öffnen Sie src/main.ts. Ändern Sie 

````
props: {
  name: 'world'
}
````

in 

````
props:{
  name: 'everybody'
}
````
Speichern Sie und bringen Sie den Browser in den Vordergrund. Wie Sie sehen, wird die Änderung nach einer kurzen Verzögerung umgesetzt, ohne dass Sie explizit neu kompilieren und starten müssen.

Damit sind wir nun gerüstet, um eigene Komponenten zu programmieren. 