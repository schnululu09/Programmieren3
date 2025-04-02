// MeatEater.js
import { LivingCreature } from './Lebewesen/LivingCreature.js'; // Importiert LivingCreature
import { Emtpy } from './Lebewesen/Empty.js';

class MeatEater extends LivingCreature {
    constructor() {
        super("red", 100); // Setzt die Farbe auf rot und die Anfangsenergie auf 100
    }

    step() {
        this.trytoEat();
        if (this.energy >= 120) {
            this.multiply();
            this.energy -= 100; // Reduziert die Energie nach Fortpflanzung
        } else if (this.energy <= 0) {
            matrix[this.row][this.col] = new Empty(); // Setzt das Feld auf leer, wenn die Energie <= 0 ist
        }
    }

    trytoEat() {
        // Suche nach Grasfressern in der Umgebung
        let preyFields = findNeighbourPositions(this.row, this.col, 1, GrassEater);
        if (preyFields.length > 0) {
            let randomGrassEaterField = random(preyFields);
            updateCreaturePosition(this, randomGrassEaterField); // Bewegt den Fleischfresser auf das Feld des Grasfressers
            this.energy += 15; // Der Fleischfresser gewinnt 15 Energiepunkte durch das Fressen
        } else {
            this.energy--; // Wenn kein Grasfresser gefunden wird, verliert der Fleischfresser Energie
        }
    }

    multiply() {
        let freeFields = findNeighbourPositions(this.row, this.col, 1, Empty);
        if (freeFields.length > 0) {
            let randomFreeField = random(freeFields);
            let row = randomFreeField[0];
            let col = randomFreeField[1];
            matrix[row][col] = new MeatEater(); // Erstelle einen neuen Fleischfresser an einem leeren Feld
        }
    }
}

export { MeatEater };
