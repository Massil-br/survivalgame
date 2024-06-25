class Boss extends Monster {
    constructor(player) {
        super(player);
        this.size = 5 * tileSize; // Taille du boss
        this.skin = '/Assets/Monster_rot.png'; // Chemin du skin du boss
    }

    attack() {
        let numArrows = 8;
        let angleStep = (2 * Math.PI) / numArrows;
        for (let i = 0; i < numArrows; i++) {
            let angle = i * angleStep;
            let arrowX = this.x + Math.cos(angle) * 6 * tileSize;
            let arrowY = this.y + Math.sin(angle) * 6 * tileSize;
            this.shootArrow(arrowX, arrowY, angle);
        }
    }

    shootArrow(x, y, angle) {
        // Implémentez la logique pour tirer une flèche
        console.log(`Flèche tirée à (${x}, ${y}) avec un angle de ${angle}`);
    }

    moveRandomly() {
        super.moveRandomly();
        // Ajoutez une condition pour que le boss attaque périodiquement
        if (Math.random() < 0.01) { // Par exemple, 1% de chance d'attaquer à chaque frame
            this.attack();
        }
    }
}