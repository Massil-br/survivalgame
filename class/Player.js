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
        this.attackCoolDown = 3*60;
        this.coolDown = 0;
        this.defense = 1;
        this.dead = false;
        this.deadSkin = null;
        this.moveX = 0;
        this.moveY = 0;
    }

    update(){
        if (this.coolDown > 0){
            this.coolDown--;
        }
    }

    attack(monster){
        if (this.coolDown <=0 && dist(this.x, this.y ,monster.x,monster.y)<=this.attackRange && !this.dead){
            monster.health -= this.damage;
            this.coolDown = this.attackCoolDown;
        }
    }

    preload() {
        this.skin = loadImage("Assets/Player/GIF_/player_idle.gif"); 
        this.deadSkin = loadImage("Assets/Player/PNG_/07-Dead/Dead10.png")
        this.run = loadImage("Assets/Player/GIF_/player_run.gif");
        this.runinverted = loadImage("Assets/Player/GIF_/inverted_player_run.gif");
    }

    handleInput() {
        this.moveX = 0;
        this.moveY = 0;
    
        if (keyIsDown(90) && !this.dead) { // Z
            this.moveY -= this.speed;
            
        }
        if (keyIsDown(81) && !this.dead) { // Q
            this.moveX -= this.speed;
            
        }
        if (keyIsDown(83) && !this.dead) { // S
            this.moveY += this.speed;
            
        }
        if (keyIsDown(68) && !this.dead) { // D
            this.moveX += this.speed;
            
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
    }

    drawPlayer() {
        // Assurez-vous que la skin du joueur est chargée
        if (this.skin&& !this.dead && this.moveX == 0 && this.moveY == 0) {
            // Utiliser tileSize pour définir les nouvelles dimensions
            let newWidth = tileSize;  // Largeur de la tuile
            let newHeight = tileSize; // Hauteur de la tuile

            // Dessiner le GIF avec les nouvelles dimensions
            image(this.skin, this.x - newWidth / 2, this.y - newHeight / 2, newWidth, newHeight);
        }else if (this.deadSkin && this.dead){
             // Utiliser tileSize pour définir les nouvelles dimensions
             let newWidth = tileSize;  // Largeur de la tuile
             let newHeight = tileSize; // Hauteur de la tuile
 
             // Dessiner le GIF avec les nouvelles dimensions
             image(this.deadSkin, this.x - newWidth / 2, this.y - newHeight / 2, newWidth, newHeight);
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