class Player {
    constructor() {
        this.x = 750; // Centre de l'écran en x (pour un canvas de 1500px de large)
        this.y = 500; // Centre de l'écran en y (pour un canvas de 1000px de haut)
        this.worldX = 0; // Position x du monde par rapport au joueur
        this.worldY = 0; // Position y du monde par rapport au joueur
        this.speed = 3; // Vitesse de déplacement
        this.skin = null;
        this.maxHealth = 10;
        this.health = this.maxHealth;
        this.maxXp = 20;
        this.xp = 0;
        this.level = 1;
        this.damage = 1;
        this.attackRange = 3;
        this.attackSpeed = 1.5;
        this.defense = 1;
        this.dead = false;
    }

    preload() {
        this.skin = loadImage("Assets/Player/GIF_/player_idle.gif"); 
    }

    handleInput() {
        let moveX = 0;
        let moveY = 0;

        if (keyIsDown(90)) { // Z
            moveY -= 1; // Déplacer le monde vers le haut
        }
        if (keyIsDown(81)) { // Q
            moveX -= 1; // Déplacer le monde vers la gauche
        }
        if (keyIsDown(83)) { // S
            moveY += 1; // Déplacer le monde vers le bas
        }
        if (keyIsDown(68)) { // D
            moveX += 1; // Déplacer le monde vers la droite
        }

        // Calculer si le mouvement est diagonal
        if (moveX !== 0 && moveY !== 0) {
            this.x += moveX * this.speed;
            this.y += moveY * this.speed;
            
        } else {
            this.x += moveX * this.speed * Math.sqrt(2);
            this.y += moveY * this.speed * Math.sqrt(2);
           
        }
    }

    play() {
        this.handleInput();
        this.checkLevelUp();
        this.checkDeath();
        this.drawPlayer();
        this.drawHealthBar(); // Dessiner la barre de santé
    }

    drawPlayer() {
        // Dessiner le joueur au centre de l'écran
        if (this.skin) {
            let spriteWidth = this.skin.width;  // Largeur originale du GIF
            let spriteHeight = this.skin.height;  // Hauteur originale du GIF

            // Définir les nouvelles dimensions souhaitées
            let newWidth = spriteWidth * 0.1;  // Réduire la largeur de 50%
            let newHeight = spriteHeight * 0.1;  // Réduire la hauteur de 50%

            // Dessiner le GIF avec les nouvelles dimensions
            image(this.skin, this.x - newWidth / 2, this.y - newHeight / 2, newWidth, newHeight);
        }
    }

    checkLevelUp() {
        if (this.xp >= this.maxXp) {
            let m = 1.5;
            this.level++;
            this.xp -= this.maxXp;
            this.maxXp *= m;
            this.maxHealth *= m;
            this.health = this.maxHealth;
            this.damage *= m;
            this.defense *= m;
            this.speed *= m;
            this.attackSpeed *= m;
        }
    }

    checkDeath() {
        if (this.health <= 0) {
            this.health = 0;
            this.dead = true;
        }
    }

    drawHealthBar() {
        // Sauvegarder l'état actuel du système de coordonnées
        push();
        // Réinitialiser la transformation pour dessiner la barre de santé en coordonnées absolues de l'écran
        resetMatrix();

        let barWidth = 200; // Largeur de la barre de santé
        let barHeight = 20; // Hauteur de la barre de santé
        let healthRatio = this.health / this.maxHealth; // Ratio de la santé actuelle par rapport à la santé maximale

        // Dessiner le fond de la barre de santé
        fill(0, 0, 0); // Couleur noire pour le fond
        rect(20, 20, barWidth, barHeight); // Position et dimensions du fond

        // Dessiner la barre de santé actuelle
        fill(255, 0, 0); // Couleur rouge pour la santé
        rect(20, 20, barWidth * healthRatio, barHeight); // Ajuster la largeur selon la santé actuelle

        // Restaurer l'état précédent du système de coordonnées
        pop();
    }
}