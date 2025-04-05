// matrix.js

import { Empty } from './Lebewesen/Empty.js';
import { matrix } from './script.js';
import { getRandomCreature } from './utils.js';  // Importiere die Funktion aus utils.js

// Funktion zum zufälligen Auffüllen der Matrix mit Kreaturen
export function createAndFillMatrix(matrixSize, creatureProbabilities) {
    let matrix = [];
    for (let i = 0; i < matrixSize; i++) {
        matrix.push([]);
        for (let j = 0; j < matrixSize; j++) {
            matrix[i][j] = getRandomCreature(creatureProbabilities);
        }
    }
    return matrix;
}


export function getTransformedMatrix(){
    return matrix.map(row => row.map(elem => elem.color || "white"))
}