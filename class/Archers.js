class Archers extends Monster {
    constructor(player, boss) {
        super(player);
        this.boss = boss;
        this.arrows = [];
        this.attackCoolDown = 3 * 60; // Cooldown d'attaque des archers
        this.range = 15 * tileSize; // Portée augmentée pour toucher le boss
        this.maxHealth = 10 * player.level; 
        this.health = this.maxHealth; 
    }

    // Méthode pour tirer des flèches
    shootArrow(targetX, targetY) {
        let angle = Math.atan2(targetY - this.y, targetX - this.x);
        let speed = 7; // Ajuster la vitesse de la flèche ici
        let range = this.range; // Utiliser la portée augmentée
        let arrow = new Arrow(this.x, this.y, angle, speed, range);
        this.arrows.push(arrow);
    }

    // Surcharge de la méthode Play pour inclure le dessin des flèches
    Play() {
        if (!this.dead) {
            this.update();
            this.checkDeath();
            this.drawMonster();
            
            // Dessiner la barre de vie si la santé n'est pas au maximum
            if (this.health < this.maxHealth) {
                this.drawHealthBar();
            }

            // Mettre à jour et dessiner les flèches
            this.arrows.forEach(arrow => {
                arrow.update();
                arrow.draw();
            });

            // Supprimer les flèches inactives
            this.arrows = this.arrows.filter(arrow => arrow.active);

            // Tirer des flèches si à proximité du boss
            if (dist(this.x, this.y, this.boss.x, this.boss.y) < this.range && frameCount % 180 === 0) {
                this.shootArrow(this.boss.x, this.boss.y);
            }

            this.moveRandomly();
        }
    }

    // Déplacement aléatoire sur toute la carte du boss
    moveRandomly() {
        if (this.moveCooldown > 0) {
            this.moveCooldown--;
        } else {
            this.x = Math.max(0, Math.min(100 * tileSize, this.x + (Math.random() - 0.5) * this.speed * 0.1)); // Déplacement plus fluide
            this.y = Math.max(0, Math.min(100 * tileSize, this.y + (Math.random() - 0.5) * this.speed * 0.1)); // Déplacement plus fluide
            this.moveCooldown = 1; // Réinitialiser le cooldown pour un mouvement continu
        }
    }

    // Méthode pour dessiner la barre de vie
    drawHealthBar() {
        let barWidth = this.skinWidth; // Largeur de la barre de vie égale à la largeur du skin
        let barHeight = 5; // Hauteur de la barre de vie
        let x = this.x - barWidth / 2;
        let y = this.y - this.skinHeight / 2 - 20; // 20 px au-dessus du monstre

        // Dessiner la barre de fond
        fill(255, 0, 0);
        rect(x, y, barWidth, barHeight);

        // Dessiner la barre de vie actuelle
        let healthWidth = (this.health / this.maxHealth) * barWidth;
        fill(0, 255, 0);
        rect(x, y, healthWidth, barHeight);
    }
}