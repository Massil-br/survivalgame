class Monster {
    randomPosition(center) {
        return Math.random(0,mapHeight) ;
    }
    
    

    constructor(player) {
        this.x = this.randomPosition(player.x);
        this.y = this.randomPosition(player.y);
        this.level = 1;
        this.maxHealth = 3;
        this.health = this.maxHealth;
        this.damage = 10;
        this.defense = 1;
        this.speed = 20;
        this.attackRange = 2 * tileSize;
        this.attackCoolDown = 5 * 60; // 10 secondes * 60 FPS = 600 frames
        this.cooldown = 0; // Cooldown initialisé à 0
        this.skin = null;
        this.checkLevelUp(player);
        this.dead = false;
        this.player = player; // Ajout de la référence du joueur pour ajouter de l'XP
        this.moveCooldown = 1;
    }

    update() {
        if (this.cooldown > 0) {
            this.cooldown--; // Décrémenter le cooldown à chaque frame
        }
            this.moveRandomly();
    }

    moveRandomly() {
        if (this.moveCooldown > 0) {
            this.moveCooldown--;
        } else {
            let distanceToPlayer = this.dist(this.x, this.y, this.player.x, this.player.y);
            if (distanceToPlayer < 5 * tileSize) {
                // Se rapprocher du joueur
                let angle = Math.atan2(this.player.y - this.y, this.player.x - this.x);
                this.x += Math.cos(angle) * this.speed * 0.1; // Déplacement plus fluide
                this.y += Math.sin(angle) * this.speed * 0.1; // Déplacement plus fluide
            } else {
                // Mouvement aléatoire
                this.x += (Math.random() - 0.5) * this.speed * 0.1; // Déplacement plus fluide
                this.y += (Math.random() - 0.5) * this.speed * 0.1; // Déplacement plus fluide
            }
            this.moveCooldown = 1; // Réinitialiser le cooldown pour un mouvement continu
        }
    }
    dist(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
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
        if (!this.dead) {
            this.update();
            this.checkDeath();
            this.drawMonster();
            this.attackPlayer(this.player);
        }
    }

    checkDeath() {
        if (this.health <= 0 && !this.dead) {
            this.health = 0;
            this.dead = true;
            this.player.gainXp(this.player.xpMultiplier); // Ajouter 5 XP au joueur
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