// GrassEater.js
import { LivingCreature } from './Lebewesen/LivingCreature.js';
import { Grass } from './Lebewesen/Grass.js';
import { Emtpy } from './Lebewesen/Empty.js';

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
            let randomGrassField = random(grassFields);
            updateCreaturePosition(this, randomGrassField); // Bewege den Grasfresser auf das Gras
            this.energy++; // Grasfresser gewinnt Energie
        } else {
            let emptyFields = findNeighbourPositions(this.row, this.col, 1, Empty);
            if (emptyFields.length > 0) {
                let randomEmptyField = random(emptyFields);
                updateCreaturePosition(this, randomEmptyField); // Bewege den Grasfresser auf ein leeres Feld
            }
            this.energy--; // Wenn kein Gras gefunden wird, verliert der Grasfresser Energie
        }
    }

    multiply() {
        let freeFields = findNeighbourPositions(this.row, this.col, 1, Empty);
        if (freeFields.length > 0) {
            let randomFreeField = random(freeFields);
            let row = randomFreeField[0];
            let col = randomFreeField[1];
            matrix[row][col] = new GrassEater(); // Erstelle einen neuen Grasfresser
        }
    }
}

export { GrassEater };
