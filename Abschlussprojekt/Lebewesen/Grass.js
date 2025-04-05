import { LivingCreature } from './LivingCreature.js';
import { Empty } from './Empty.js';
import { random, findNeighbourPositions, updateCreaturePosition } from '../utils.js';
class Grass extends LivingCreature {
    constructor() {
        super("green", Math.floor(Math.random() * 3)); // Setzt die Farbe auf grün und die Energie auf einen zufälligen Wert zwischen 0 und 2
    }

    step() {
        this.energy++;

        // Wenn das Gras 7 Energie hat, multipliziere und setze die Energie zurück
        if (this.energy >= 7) {
            this.multiply();
            this.energy = 0;
        }
    }

    multiply() {
        let emptyFields = findNeighbourPositions(this.row, this.col, 1, Empty);

        if (emptyFields.length > 0) {
            let randomEmptyField = emptyFields[Math.floor(Math.random() * emptyFields.length)];
            let row = randomEmptyField[0];
            let col = randomEmptyField[1];
            matrix[row][col] = new Grass();
        }
    }
}

export { Grass };
