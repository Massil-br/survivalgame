class Boss extends Monster {
    constructor(player) {
        super(player);
        this.size = 5 * tileSize; // Taille du boss
        this.maxHealth = 1000; // Santé maximale très élevée
        this.health = this.maxHealth;
        this.damage = 50; // Dégâts très élevés
        this.defense = 20; // Défense très élevée
        this.speed = 10; // Vitesse réduite pour un boss géant
        this.attackRange = 3 * tileSize; // Portée d'attaque augmentée
        this.attackCoolDown = 2 * 60; // Cooldown d'attaque réduit
        this.arrows = []; // Liste des flèches tirées par le boss
        this.skin = loadImage('./Assets/Monster_rot.png', () => {
            console.log("Image du boss chargée");
        }, () => {
            console.error("Erreur de chargement de l'image du boss");
        });
    }

    // Méthode pour dessiner le boss
    drawBoss() {
        if (this.skin && !this.dead) {
            let spriteWidth = this.skin.width; // Largeur originale du sprite
            let spriteHeight = this.skin.height; // Hauteur originale du sprite

            // Coordonnées où le sprite doit être dessiné sur le canevas
            let dx = this.x - this.size / 2;
            let dy = this.y - this.size / 2;

            // Dessiner le sprite redimensionné à la taille du boss
            image(this.skin, dx, dy, this.size, this.size);
        }
    }

    // Méthode pour vérifier les collisions avec un projectile
    checkCollisionWithProjectile(projectile) {
        let halfSize = this.size / 2;
        return (
            projectile.x > this.x - halfSize &&
            projectile.x < this.x + halfSize &&
            projectile.y > this.y - halfSize &&
            projectile.y < this.y + halfSize
        );
    }

    // Méthode pour tirer des flèches
    shootArrow(targetX, targetY) {
        let angle = Math.atan2(targetY - this.y, targetX - this.x);
        let speed = 5; // Ajuster la vitesse de la flèche ici
        let range = 10 * tileSize; // Ajuster la portée de la flèche ici
        let arrow = new Arrow(this.x, this.y, angle, speed, range);
        this.arrows.push(arrow);
    }

    // Surcharge de la méthode Play pour inclure le dessin du boss et des flèches
    Play() {
        if (!this.dead) {
            this.update();
            this.checkDeath();
            this.drawBoss();

            // Mettre à jour et dessiner les flèches
            this.arrows.forEach(arrow => {
                arrow.update();
                arrow.draw();
            });

            // Supprimer les flèches inactives
            this.arrows = this.arrows.filter(arrow => arrow.active);

            // Tirer des flèches périodiquement
            if (frameCount % 120 === 0) { // Par exemple, tirer une flèche toutes les 120 frames
                this.shootArrow(player.x, player.y);
            }

            this.attackPlayer(this.player);
        }
    }
}
