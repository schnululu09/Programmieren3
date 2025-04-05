import { LivingCreature } from './LivingCreature.js';
import { Grass } from './Grass.js';
import { Empty } from './Empty.js';
import { findNeighbourPositions } from '../utils.js';
import { matrix } from '../script.js';

class GrassEater extends LivingCreature {
    constructor() {
        super("yellow", 5); // Setzt die Farbe auf gelb und die Anfangsenergie auf 5
    }

    step() {
        this.trytoEat();
        if (this.energy >= 10) {
            this.multiply();
            this.energy -= 7;
        } else if (this.energy <= 0) {
            matrix[this.row][this.col] = new Empty();
        }
    }

    trytoEat() {
        // Suche nach Gras in der Umgebung
        let grassFields = findNeighbourPositions(this.row, this.col, 1, Grass);
        if (grassFields.length > 0) {
            let randomGrassField = grassFields[Math.floor(Math.random() * grassFields.length)];
            updateCreaturePosition(this, randomGrassField); // Bewege den Grasfresser auf das Gras
            this.energy++; // Grasfresser gewinnt Energie
        } else {
            let emptyFields = findNeighbourPositions(this.row, this.col, 1, Empty);
            if (emptyFields.length > 0) {
                let randomEmptyField = emptyFields[Math.floor(Math.random() * emptyFields.length)];
                updateCreaturePosition(this, randomEmptyField); // Bewege den Grasfresser auf ein leeres Feld
            }
            this.energy--; // Wenn kein Gras gefunden wird, verliert der Grasfresser Energie
        }
    }

    multiply() {
        let freeFields = findNeighbourPositions(this.row, this.col, 1, Empty);
        if (freeFields.length > 0) {
            let randomFreeField = freeFields[Math.floor(Math.random() * freeFields.length)];
            let row = randomFreeField[0];
            let col = randomFreeField[1];
            matrix[row][col] = new GrassEater(); // Erstelle einen neuen Grasfresser
        }
    }
}

export { GrassEater };
