// Grass.js
import { LivingCreature } from './Lebewesen/LivingCreature.js';
import { Emtpy } from './Lebewesen/Empty.js';

class Grass extends LivingCreature {
    constructor() {
        super("green", int(random(2))); // Setzt die Farbe auf grün und die Energie auf einen zufälligen Wert zwischen 0 und 2
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
            let randomEmptyField = random(emptyFields);
            let row = randomEmptyField[0];
            let col = randomEmptyField[1];
            matrix[row][col] = new Grass();
        }
    }
}

export { Grass };
