//#region Main
let images = [];
let placedImages = [];
let map = new Map(); // Utiliser une Map pour suivre les zones générées
let tileSize = 32;
let mapWidth = 5000;
let mapHeight = 5000;
let tileset;

function preload() {
    window.player = new Player();
    window.player.preload();
    images.push({ img: loadImage("assets/bush.png"), chance: 5 });
    images.push({ img: loadImage("assets/grass1.png"), chance: 20 });
    images.push({ img: loadImage("assets/grass2.png"), chance: 20 });
    images.push({ img: loadImage("assets/tree.png"), chance: 20 });
}

function setup() {
    createCanvas(1500, 1000);
    background(0, 0, 0); // Fond noir
    generateImagesAroundPlayer();
}

function draw() {
    clear();
    background(0, 55, 0); // Fond vert

    // Calculer la translation pour centrer le joueur
    let translateX = constrain(width / 2 - player.x, -mapWidth * tileSize + width, 0);
    let translateY = constrain(height / 2 - player.y, -mapHeight * tileSize + height, 0);
    translate(translateX, translateY);

    // Dessiner les images placées
    for (let img of placedImages) {
        image(img.img, img.x, img.y);
    }

    // Mettre à jour et dessiner le joueur
    window.player.play();
    generateImagesAroundPlayer(); // Générer des images si nécessaire lors du déplacement
}

function generateImagesAroundPlayer() {
    let range = 1250; // Moitié de 2500 pour centrer autour du joueur
    let minX = Math.floor((player.x - range) / tileSize) * tileSize;
    let maxX = Math.floor((player.x + range) / tileSize) * tileSize;
    let minY = Math.floor((player.y - range) / tileSize) * tileSize;
    let maxY = Math.floor((player.y + range) / tileSize) * tileSize;

    for (let x = minX; x <= maxX; x += tileSize) {
        for (let y = minY; y <= maxY; y += tileSize) {
            let key = `${x},${y}`;
            if (!map.has(key) && Math.random() < 0.3) { // Seulement 30% de chance de tenter de placer une image
                let img = randomImage();
                if (img) {
                    placedImages.push({ img: img.img, x, y });
                    map.set(key, true); // Marquer la zone comme générée
                }
            }
        }
    }
}

function randomImage() {
    let total = 0;
    images.forEach(item => total += item.chance);
    let chanceOfEmpty = 30; // Ajouter une chance de 30% pour une case vide
    total += chanceOfEmpty;
    let rand = Math.floor(Math.random() * total);
    let sum = 0;

    for (let item of images) {
        sum += item.chance;
        if (rand < sum) {
            return item;
        }
    }
    return null; // Retourner null représente une case vide
}
//#endregion



// #region Classe Player
class Player {
    constructor() {
        this.x = 750; // Centre de l'écran en x (pour un canvas de 1500px de large)
        this.y = 500; // Centre de l'écran en y (pour un canvas de 1000px de haut)
        this.worldX = 0; // Position x du monde par rapport au joueur
        this.worldY = 0; // Position y du monde par rapport au joueur
        this.speed = 5; // Vitesse de déplacement
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
        if (keyIsDown(90)) { // Z
            this.y -= this.speed; // Déplacer le monde vers le haut
        }
        if (keyIsDown(81)) { // Q
            this.x -= this.speed; // Déplacer le monde vers la gauche
        }
        if (keyIsDown(83)) { // S
            this.y += this.speed; // Déplacer le monde vers le bas
        }
        if (keyIsDown(68)) { // D
            this.x += this.speed; // Déplacer le monde vers la droite
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
// #endregion   

// #region Classe Monster
class Monster {
    randomPosition(center) {
        let range = 50;
        return Math.random() * (2 * range) + (center - range);
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
        this.move();
        this.attack();
    }

    checkDeath() {
        if (this.health <= 0) {
            this.health = 0;
            this.dead = true;
        }
    }

    preload() {
        this.skin = loadImage("assets/monster.png");
    }

    drawMonster() {
        if (this.skin) {
            let spriteWidth = this.skin.width / 2;
            let spriteHeight = this.skin.height / 5;
            image(this.skin, 0, 0, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
        }
    }
}
// #endregion
