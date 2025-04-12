import { Empty } from "./Empty.js";
import { matrix, matrixSize } from "../script.js";
import { MeatEater } from "./MeatEater.js";
import { GrassEater } from "./GrassEater.js";
import { Grass } from "./Grass.js";

export function zündeBombe() {
    let maxStart = matrixSize - 6; 
    let startRow = Math.floor(Math.random() * (maxStart + 1));
    let startCol = Math.floor(Math.random() * (maxStart + 1));

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            matrix[startRow + i][startCol + j] = new Empty();
        }
    }

    console.log(`💥 Bombe gezündet bei (${startRow}, ${startCol})`);
}

export function spawnGrassEater() {
    let freieFelder = [];

    for (let row = 0; row < matrixSize; row++) {
        for (let col = 0; col < matrixSize; col++) {
            if (matrix[row][col] instanceof Empty) {
                freieFelder.push([row, col]);
            }
        }
    }

    if (freieFelder.length > 0) {
        let [row, col] = freieFelder[Math.floor(Math.random() * freieFelder.length)];
        matrix[row][col] = new GrassEater();
        console.log(`🟡 GrassEater gespawnt bei (${row}, ${col})`);
    } else {
        console.log("❌ Kein Platz zum Spawnen!");
    }
}

export function spawnMeatEater() {
    let freieFelder = [];

    for (let row = 0; row < matrixSize; row++) {
        for (let col = 0; col < matrixSize; col++) {
            if (matrix[row][col] instanceof Empty) {
                freieFelder.push([row, col]);
            }
        }
    }

    if (freieFelder.length > 0) {
        let [row, col] = freieFelder[Math.floor(Math.random() * freieFelder.length)];
        matrix[row][col] = new MeatEater();
        console.log(`🟡 MeatEater gespawnt bei (${row}, ${col})`);
    } else {
        console.log("❌ Kein Platz zum Spawnen!");
    }
}

export function spawnGrass() {
    let freieFelder = [];

    for (let row = 0; row < matrixSize; row++) {
        for (let col = 0; col < matrixSize; col++) {
            if (matrix[row][col] instanceof Empty) {
                freieFelder.push([row, col]);
            }
        }
    }

    if (freieFelder.length > 0) {
        let [row, col] = freieFelder[Math.floor(Math.random() * freieFelder.length)];
        matrix[row][col] = new Grass();
        console.log(`🟡 Grass gespawnt bei (${row}, ${col})`);
    } else {
        console.log("❌ Kein Platz zum Spawnen!");
    }
}

