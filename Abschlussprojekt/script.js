// Importiere die Kreaturen-Klassen aus dem "Lebewesen"-Unterordner
import { Grass } from './Lebewesen/Grass.js';
import { GrassEater } from './Lebewesen/GrassEater.js';
import { MeatEater } from './Lebewesen/MeatEater.js';
import { Empty } from './Lebewesen/Empty.js';

// Importiere die Utility-Funktionen aus der utils.js Datei
import { fillRandomMatrix, random, findNeighbourPositions, updateCreaturePosition } from './utils.js';

// Größe der Matrix (Anzahl der Zellen in Breite und Höhe)
let matrixSize = 50;

// Anzeigengröße in Pixeln für jede Zelle
let blockSize = 15;

// Matrix zum Speichern der Kreaturen
let matrix = [];

// Wahrscheinlichkeit, mit der jede Kreatur erstellt wird
let creatureProbabilities = [
    [Grass, 0.25],    // Gras: 25% Wahrscheinlichkeit
    [GrassEater, 0.05],  // Grasfresser: 5% Wahrscheinlichkeit
    [MeatEater, 0.02],  // Fleischfresser: 2% Wahrscheinlichkeit
];

// Setup-Funktion wird einmal zu Beginn ausgeführt
function setup() {
    createCanvas(matrixSize * blockSize, matrixSize * blockSize); // Zeichenfläche erstellen
    fillRandomMatrix(matrixSize, creatureProbabilities, matrix); // Matrix zufällig füllen
    noStroke(); // Keine Umrandungen für Rechtecke
    frameRate(30); // Bildrate auf 30 Frames pro Sekunde setzen
}

// Draw-Funktion wird in jedem Frame aufgerufen
function draw() {
    background(200); // Hintergrundfarbe festlegen
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

            // Kreatur zeichnen
            fill(obj.color); // Farbe der Kreatur setzen
            rect(blockSize * obj.col, blockSize * obj.row, blockSize, blockSize); // Rechteck zeichnen
        }
    }
}
