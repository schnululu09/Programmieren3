// LivingCreature.js
class LivingCreature {
    constructor(color, energy) {
        this.stepCount = frameCount + 1; // Jede Kreatur braucht diese Zeile
        this.color = color; // Jede Kreatur braucht eine Farbe
        this.energy = energy; // Jede Kreatur braucht Energie
    }

    multiply(newCreatureClass, energyCost) {
        let emptyFields = findNeighbourPositions(this.row, this.col, 1, Empty);
        if (emptyFields.length > 0) {
            let randomEmptyField = random(emptyFields);
            let row = randomEmptyField[0];
            let col = randomEmptyField[1]
            matrix[row][col] = new newCreatureClass();
            this.energy = energyCost;
        }
    }
}

export { LivingCreature };
