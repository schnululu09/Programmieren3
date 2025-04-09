import { matrix } from "../script.js";
import { frameCount } from "../script.js";


class LivingCreature {
    constructor(color, energy) {
        this.stepCount = frameCount + 1;
        this.color = color; // Jede Kreatur braucht eine Farbe
        this.energy = energy; // Jede Kreatur braucht Energie
    }

    multiply(newCreatureClass, energyCost) {
        let emptyFields = findNeighbourPositions(this.row, this.col, 1, Empty);
        if (emptyFields.length > 0) {
            let randomEmptyField = emptyFields[Math.floor(Math.random() * emptyFields.length)];
            let row = randomEmptyField[0];
            let col = randomEmptyField[1];
            matrix[row][col] = new newCreatureClass(); // Erstelle eine neue Kreatur
            this.energy = energyCost; // Setze die Energie der Kreatur auf den angegebenen Wert
        }
    }
}

export { LivingCreature };
