class Monster {
    randomPosition(center) {
        return Math.random(0,mapHeight) ;
    }

    constructor(player) {
        this.x = this.randomPosition(player.x);
        this.y = this.randomPosition(player.y);
        this.level = 1;
        this.maxHealth = 3;
        this.health = 100; // Exemple de valeur de santé
        this.isDead = false;
        this.damage = 10;
        this.defense = 1;
        this.speed = 0.5;
        this.attackRange = 2 * tileSize;
        this.attackCoolDown = 5 * 60; // 10 secondes * 60 FPS = 600 frames
        this.cooldown = 0; // Cooldown initialisé à 0
        this.skin = null;
        this.checkLevelUp(player);
    }

    update() {
        if (this.cooldown > 0) {
            this.cooldown--; // Décrémenter le cooldown à chaque frame
        }
        if (this.health <= 0) {
            this.isDead = true;
        }
    }

    attackPlayer(player) {
        if (dist(this.x, this.y, player.x, player.y) < this.attackRange && this.cooldown <= 0 && !this.dead) {
            player.health -= this.damage;
            this.cooldown = this.attackCoolDown; // Réinitialiser le cooldown
        }
    }

    checkLevelUp(player) {
        let multiplier = 1.2;
        this.level = player.level;
        this.maxHealth = this.maxHealth * (multiplier * this.level);
        this.health = this.maxHealth * (multiplier * this.level);
        this.damage = this.damage * (multiplier * this.level);
        this.defense = this.defense * (multiplier * this.level);
        this.speed = this.speed * (multiplier * this.level);
        this.attackCoolDown = this.attackCoolDown - (multiplier * this.level);
    }

    Play() {
        if (!this.isDead) {
            this.update();
            this.checkDeath();
            this.drawMonster();
            this.attackPlayer(player);
        }
    }

    checkDeath() {
        if (this.health <= 0) {
            this.health = 0;
            this.dead = true;
        }
    }

    preload() {
        this.skin = loadImage("Assets/slime_monster_spritesheet.png");
    }

    drawMonster() {
        if (this.skin && !this.dead) {
            let spriteWidth = 24; // Largeur originale du sprite dans le spritesheet
            let spriteHeight = 24; // Hauteur originale du sprite dans le spritesheet
            let cols = 3; // Nombre de colonnes dans le spritesheet
            let rows = 3; // Nombre de lignes dans le spritesheet

            // Calculer la position de la 7ème image
            let frameIndex = 6; // 7ème image, indexation à partir de 0
            let col = frameIndex % cols;
            let row = Math.floor(frameIndex / cols);

            // Coordonnées du sprite à découper dans le spritesheet
            let sx = col * spriteWidth;
            let sy = row * spriteHeight;

            // Coordonnées où le sprite doit être dessiné sur le canevas
            let dx = this.x - tileSize / 2;
            let dy = this.y - tileSize / 2;

            // Dessiner le sprite redimensionné à tileSize
            image(this.skin, dx, dy, tileSize, tileSize, sx, sy, spriteWidth, spriteHeight);
        }
    }
}