class Player {
    constructor() {
        this.x = mapWidth/2;
        this.y = mapHeight/2 ;
        this.speed = 10; // Vitesse de déplacement
        this.skin = null;
        this.maxHealth = 20;
        this.health = this.maxHealth;
        this.maxXp = 20;
        this.xp = 0;
        this.level = 1;
        this.damage = 10;
        this.attackRange = 5*tileSize;
        this.attackCoolDown = 3*60; // Cooldown en frames (3 secondes à 60 FPS)
        this.cooldown = 0; // Initialement, pas de cooldown
        this.defense = 1;
        this.dead = false;
        this.deadSkin = null;
        this.moveX = 0;
        this.moveY = 0;
        this.lastDirection = "right"; // Direction initiale par défaut
        this.projectiles = [];
    }

    update(){
        if (this.cooldown > 0){
            this.cooldown--;
        }
        this.projectiles = this.projectiles.filter(projectile => projectile.active);
        this.projectiles.forEach(projectile => {
            projectile.update();
            monsters.forEach(monster => {
                if (dist(projectile.x, projectile.y, monster.x, monster.y) < tileSize / 2) {
                    monster.health -= this.damage;
                    projectile.active = false; // Désactiver le projectile après avoir touché un monstre
                }
            });
        });
    }

    shootProjectile(targetX, targetY) {
        if (!this.dead && this.cooldown === 0) {
            let angle = Math.atan2(targetY - this.y, targetX - this.x);
            let speed = 10; // Vitesse de la flèche
            let projectile = new Projectile(this.x, this.y, angle, speed*0.5 , this.attackRange);
            this.projectiles.push(projectile);
            this.cooldown = this.attackCoolDown; // Réinitialiser le cooldown
        }
    }

    preload() {
        this.skin = loadImage("./Assets/Player/GIF_/player_idle.gif"); 
        this.deadSkin = loadImage("./Assets/Player/PNG_/07-Dead/Dead10.png")
        this.runinverted = loadImage("./Assets/Player/GIF_/player_run.gif");
        this.run = loadImage("./Assets/Player/GIF_/inverted_player_run.gif");
    }

    handleInput() {
        this.moveX = 0;
        this.moveY = 0;
    
        if (keyIsDown(90) && !this.dead) { // Z
            this.moveY -= this.speed;
        }
        if (keyIsDown(81) && !this.dead) { // Q
            this.moveX -= this.speed;
            this.lastDirection = "left";
        }
        if (keyIsDown(83) && !this.dead) { // S
            this.moveY += this.speed;
        }
        if (keyIsDown(68) && !this.dead) { // D
            this.moveX += this.speed;
            this.lastDirection = "right";
        }
    
        // Appliquer les mouvements tout en respectant les limites de la carte
        if (this.moveX !== 0 && this.moveY !== 0) {
            // Correction pour le mouvement diagonal
            this.moveX *= Math.sqrt(2) / 2;
            this.moveY *= Math.sqrt(2) / 2;
        }
    
        this.x = constrain(this.x + this.moveX, 0, mapWidth);
        this.y = constrain(this.y + this.moveY, 0, mapHeight);
        }


    play() {
        this.update();
        this.handleInput();
        this.checkLevelUp();
        this.checkDeath();
        this.drawPlayer();
        this.drawHealthBar(); // Dessiner la barre de santé
        this.drawCooldownBar(); // Dessiner la barre de cooldown
    }

    drawPlayer() {
        let newWidth = tileSize;  // Largeur de la tuile
        let newHeight = tileSize; 
    
 
        if (this.skin&& !this.dead && this.moveX == 0 && this.moveY == 0) {
        
            image(this.skin, this.x - newWidth / 2, this.y - newHeight / 2, newWidth, newHeight);
        }else if (this.deadSkin && this.dead){
             image(this.deadSkin, this.x - newWidth / 2, this.y - newHeight / 2, newWidth, newHeight);
        }else if  (this.run && this.moveX > 0 )  {
            image(this.run, this.x - newWidth / 2, this.y - newHeight / 2, newWidth, newHeight);
        }else if (this.runinverted  && this.moveX < 0 ){
            image(this.runinverted, this.x - newWidth / 2, this.y - newHeight / 2, newWidth, newHeight);
        }else if (this.moveY != 0) {
            if (this.lastDirection == "right") {
                image(this.run, this.x - newWidth / 2, this.y - newHeight / 2, newWidth, newHeight);
            } else {
                image(this.runinverted, this.x - newWidth / 2, this.y - newHeight / 2, newWidth, newHeight);
            }
        }
        this.projectiles.forEach(projectile => projectile.draw());
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

    drawCooldownBar() {
        // Sauvegarder l'état actuel du système de coordonnées
        push();
        // Réinitialiser la transformation pour dessiner la barre de cooldown en coordonnées absolues de l'écran
        resetMatrix();

        let barWidth = 200; // Largeur de la barre de cooldown
        let barHeight = 20; // Hauteur de la barre de cooldown
        let cooldownRatio = (this.attackCoolDown - this.cooldown) / this.attackCoolDown; // Ratio du cooldown actuel

        // Dessiner le fond de la barre de cooldown
        fill(0, 0, 0); // Couleur noire pour le fond
        rect(20, 50, barWidth, barHeight); // Position et dimensions du fond

        // Dessiner la barre de cooldown actuelle
        fill(0, 0, 255); // Couleur bleue pour le cooldown
        rect(20, 50, barWidth * cooldownRatio, barHeight); // Ajuster la largeur selon le cooldown actuel

        // Restaurer l'état précédent du système de coordonnées
        pop();
    }
}
