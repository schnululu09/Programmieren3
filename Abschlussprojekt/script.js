// Importiere die Kreaturen-Klassen aus dem "Lebewesen"-Unterordner
import { Grass } from './Lebewesen/Grass.js';
import { GrassEater } from './Lebewesen/GrassEater.js';
import { MeatEater } from './Lebewesen/MeatEater.js';
import { Empty } from './Lebewesen/Empty.js';
import { zündeBombe } from './Lebewesen/Events.js';


// Importiere die Utility-Funktionen aus der utils.js Datei
import { createAndFillMatrix } from './matrix.js';  // Matrix-Erstellungsfunktion importieren

// Größe der Matrix (Anzahl der Zellen in Breite und Höhe)
export let matrixSize = 50;
export let frameCount = 0;

// Wahrscheinlichkeit, mit der jede Kreatur erstellt wird
let creatureProbabilities = [
    [Grass, 0.25],    // Gras: 25% Wahrscheinlichkeit
    [GrassEater, 0.05],  // Grasfresser: 5% Wahrscheinlichkeit
    [MeatEater, 0.02],  // Fleischfresser: 2% Wahrscheinlichkeit
];

// Initialisierung der Matrix
export let matrix;

export let spielStatistiken = {
    Gewachsenes_Gras: 0,
    Gegessenes_Gras: 0,
    Getötete_Grass_Eater: 0,
    Events_gezündet: 0,
};


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

