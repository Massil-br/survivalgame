class Monster {
    randomPosition(center) {
        return Math.random(0,mapHeight) ;
    }

    constructor(player) {
        this.x = this.randomPosition(player.x);
        this.y = this.randomPosition(player.y);
        this.level = 1;
        this.maxHealth = 3;
        this.dead = false;
        this.health = this.maxHealth;
        this.damage = 0.5;
        this.defense = 1;
        this.speed = 0.5;
        this.attackRange = 2;
        this.attackSpeed = 1;
        this.skin = null;
        this.checkLevelUp(player);
    }

    checkLevelUp(player) {
        let multiplier = 1.2;
        this.level = player.level;
        this.maxHealth = this.maxHealth * (multiplier * this.level);
        this.health = this.maxHealth * (multiplier * this.level);
        this.damage = this.damage * (multiplier * this.level);
        this.defense = this.defense * (multiplier * this.level);
        this.speed = this.speed * (multiplier * this.level);
        this.attackSpeed = this.attackSpeed * (multiplier * this.level);
    }

    Play() {
        this.checkDeath();
        this.drawMonster();
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
        if (this.skin) {
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
        } else {
            console.log("Skin not loaded");
        }
    }
}