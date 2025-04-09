// MeatEater.js - Fleischfresser-Klasse
import { LivingCreature } from './LivingCreature.js';
import { Grass } from './Grass.js';
import { GrassEater } from './GrassEater.js';
import { Empty } from './Empty.js';
import { matrix } from '../script.js';

import { updateCreaturePosition, findNeighbourPositions, random } from '../utils.js';

export class MeatEater extends LivingCreature {
    constructor() {
        super("red", 100);
    }

    step() {
        this.trytoEat();
        if (this.energy >= 120) {
            this.multiply();
            this.energy -= 100;
        } else if (this.energy <= 0) {
            matrix[this.row][this.col] = new Empty();
        }
    }

    trytoEat() {
        let preyFields = findNeighbourPositions(this.row, this.col, 1, GrassEater);
        if (preyFields.length > 0) {
            let randomGrassField = random(preyFields);
            updateCreaturePosition(this, randomGrassField);
            this.energy += 10;
        } else {
            this.energy--;
        }
    }

    multiply() {
        let freeFields = findNeighbourPositions(this.row, this.col, 1, Empty);
        if (freeFields.length > 0) {
            let randomFreeField = random(freeFields);
            let row = randomFreeField[0];
            let col = randomFreeField[1];
            matrix[row][col] = new MeatEater();
        }
    }
}


