// Importiere die Kreaturen-Klassen aus dem "Lebewesen"-Unterordner
import { Grass } from './Lebewesen/Grass.js';
import { GrassEater } from './Lebewesen/GrassEater.js';
import { MeatEater } from './Lebewesen/MeatEater.js';
import { Empty } from './Lebewesen/Empty.js';


// Importiere die Utility-Funktionen aus der utils.js Datei
import { createAndFillMatrix } from './matrix.js';  // Matrix-Erstellungsfunktion importieren

// Größe der Matrix (Anzahl der Zellen in Breite und Höhe)
export let matrixSize = 50;

// Wahrscheinlichkeit, mit der jede Kreatur erstellt wird
let creatureProbabilities = [
    [Grass, 0.25],    // Gras: 25% Wahrscheinlichkeit
    [GrassEater, 0.05],  // Grasfresser: 5% Wahrscheinlichkeit
    [MeatEater, 0.02],  // Fleischfresser: 2% Wahrscheinlichkeit
];



// Initialisierung der Matrix
export let matrix;

let spielzustand = [matrix]; //  2D Array
function collectStatistics(spielzustand, frameCounter) {
    let lebendeZellen = 0;
    let toteZellen = 0;

    for (let i = 0; i < spielzustand.length; i++) {
        for (let j = 0; j < spielzustand[i].length; j++) {
            if (spielzustand[i][j] === 1) {
                lebendeZellen++;
            } else {
                toteZellen++;
            }
        }
    }

    return {
        lebendeZellen,
        toteZellen,
        frame: frameCounter
    };
}

let frameCounter = 0;

//--------//

function spielSchleife() {
    frameCounter++;
    
    // Sammle die Statistik
    const statistik = collectStatistics(spielzustand, frameCounter);
    
    // Alle 60 Frames an den Server senden
    if (frameCounter % 60 === 0) {
        sendtoserver(statistik);
    }
}

// Beispielhafte Spielschleife mit `requestAnimationFrame` (echtzeit-Frames)
function loop() {
    spielSchleife();
    requestAnimationFrame(loop); // Wiederhole die Schleife
}

loop(); // Starte die Schleife

function sendtoserver(statistik) {
    fetch('http://deinserver.de/api/statistik', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(statistik)
    })
    .then(response => response.json())
    .then(data => console.log('Erfolgreich gesendet:', data))
    .catch((error) => console.error('Fehler beim Senden:', error));
}

// Frame-Count für das Tracking der Frames
export let frameCount = 0;

// Setup-Funktion wird einmal zu Beginn ausgeführt
export function setup() {
    matrix = createAndFillMatrix(matrixSize, creatureProbabilities);
    // Hier entfernen wir `createCanvas()` und machen es mit reinem HTML
    // Canvas und Kontext sind bereits oben definiert.
}


// Draw-Funktion wird in jedem Frame aufgerufen
export function draw() {
   
    for (let row = 0; row < matrixSize; row++) {
        for (let col = 0; col < matrixSize; col++) {
            let obj = matrix[row][col]; // Objekt an der aktuellen Position
            
            // Leere Zellen überspringen
            if (obj instanceof Empty) continue;
            
            // Zeile und Spalte der Kreatur setzen
            obj.row = row;
            obj.col = col;
            
            // Verhindert, dass neu erstellte Kreaturen im gleichen Schritt aktualisiert werden
            if (obj.stepCount === frameCount) {
                obj.step(); // Kreatur führt ihren Schritt aus
                obj.stepCount++; // Erhöhe den Step-Zähler
            }
        }
    }
    frameCount++;
}
