
import { Empty } from './Lebewesen/Empty.js';

// utils.js - Utility-Funktionen, die von anderen Dateien importiert werden können

// Zufallsgenerator für ein Element aus einem Array
export function random(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Sucht die benachbarten Positionen eines bestimmten Kreaturentypen
// Gibt eine Liste von [row, col]-Positionen zurück
export function findNeighbourPositions(row, col, distance, creatureType, matrixSize, matrix) {
    let positions = [];
    for (let i = row - distance; i <= row + distance; i++) {
        for (let j = col - distance; j <= col + distance; j++) {
            let istInMatrix = i >= 0 && j >= 0 && i < matrixSize && j < matrixSize;

            if (istInMatrix && (i != row || j != col) && matrix[i][j] instanceof creatureType) {
                positions.push([i, j]);
            }
        }
    }
    return positions;
}

// Aktualisiert die Position einer Kreatur in der Matrix
export function updateCreaturePosition(creature, newPos, matrix) {
    if (matrix[creature.row][creature.col] !== creature) {
        let creatureType = creature.constructor.name;
        let message = `Ein ${creatureType}-Kreatur soll bewegt werden, aber befindet sich nicht mehr in der Matrix.`;
        throw new Error(message);
    }
    let newRow = newPos[0];
    let newCol = newPos[1];
    matrix[newRow][newCol] = creature;
    matrix[creature.row][creature.col] = new Empty();
    creature.row = newRow;
    creature.col = newCol;
}

// Funktion, um ein zufälliges Lebewesen basierend auf den Wahrscheinlichkeiten auszuwählen
export function getRandomCreature(creatureProbabilities) {
    let rand = Math.random(); // Zufallszahl zwischen 0 und 1
    let sum = 0;
    for (let i = 0; i < creatureProbabilities.length; i++) {
        let creatureClass = creatureProbabilities[i][0];
        let probability = creatureProbabilities[i][1];
        sum += probability; // Summiert die Wahrscheinlichkeiten
        if (rand < sum) {
            return new creatureClass();
        }
    }
    return new Empty(); // Wenn keine andere Bedingung zutrifft, wird ein leeres Feld zurückgegeben
}

// Funktion zum zufälligen Auffüllen der Matrix mit Kreaturen
export function fillRandomMatrix(matrixSize, creatureProbabilities, matrix) {
    for (let i = 0; i < matrixSize; i++) {
        matrix.push([]);
        for (let j = 0; j < matrixSize; j++) {
            matrix[i][j] = getRandomCreature(creatureProbabilities);
        }
    }
}
