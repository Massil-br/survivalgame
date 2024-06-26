let monsters = [];
let spawnCooldDown = 0;
let showMenu = true;
let gameOver = false;
let gameOverCooldown = 0;
let gameOverImage;

function preload() {

    window.player = new Player();
    window.player.preload();

    // Précharger les skins des monstres
    monsters.forEach(monster => {
        monster.preload();
    });

    // Charger l'image de game over
    gameOverImage = loadImage('Assets/Player/PNG_/07-Dead/PS_BALD GUY_Dead_008.png');
}

function drawMenu(){
    background(0, 0, 0);
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);

    text("Menu", width / 2, height / 2 - 60);
    text("Jouer", width / 2, height / 2);
    text("Commandes", width / 2, height / 2 + 40);
    text("Règles", width / 2, height / 2 + 80);
}

function drawGameOver(){
    background(0, 0, 0);
    fill(255);
    textSize(50);
    textAlign(CENTER, CENTER);

    text("Game Over", width / 2, height / 2 - 150);

    // Calculer la position y pour centrer l'image entre "Game Over" et "Jouer"
    let imageY = (height / 2 - 150 + height / 2 + 50) / 2 - 100; // 100 est la moitié de la hauteur de l'image

    // Afficher l'image de game over
    if (gameOverImage) {
        image(gameOverImage, (width / 2 - gameOverImage.width / 2)+190, imageY-40, 200, 200);
    }

    textSize(20);
    text("Jouer", width / 2, height / 2 + 50);
    text("Commandes", width / 2, height / 2 + 90);
    text("Règles", width / 2, height / 2 + 130);
}

function setup() {
    createCanvas(1280, 720);
    frameRate(60);
    noStroke();
    background(0, 0, 0);
    noiseDetail(5, 0.5);
    setMapSize(600, 600);
    spawnMonsters(500);
}

function setMapSize(newWidth, newHeight) {
    mapWidth = newWidth * tileSize;
    mapHeight = newHeight * tileSize;
    updateEntitiesPositions();
    makeMap();  // Recréer la carte avec la nouvelle taille
    drawMap();  // Redessiner la carte
}

function updateEntitiesPositions() {
   // pour maintenir  à l'interieur de la map
    window.player.x = Math.min(window.player.x, mapWidth);
    window.player.y = Math.min(window.player.y, mapHeight);

    monsters.forEach(monster => {
        monster.x = Math.min(monster.x, mapWidth);
        monster.y = Math.min(monster.y, mapHeight);
    });
}

function draw() {
    if (showMenu) {
        drawMenu();
    } else if (gameOver) {
        if (gameOverCooldown > 0) {
            gameOverCooldown--;
        } else {
            drawGameOver();
        }
    } else {
        gameLoop();
        if (player.dead) {
            gameOver = true;
            gameOverCooldown = 3*60; // 3 fois 60 frames de cooldown (3 seconde à 60 FPS)
        }
    }
}

function spawnMonsters(numMonsters) {
    for (let i = 0; i < numMonsters; i++) {
        let randomX = Math.random() * mapWidth;
        let randomY = Math.random() * mapHeight;
        let newMonster = new Monster(window.player);
        newMonster.preload(); // Précharger le skin du monstre
        newMonster.x = randomX;
        newMonster.y = randomY;
        monsters.push(newMonster);
        console.log(`Un monstre a été créé. Nombre total de monstres: ${monsters.length}`);
    }
}

function mousePressed() {
    if (showMenu) {
        showMenu = false; // Fermer le menu et commencer le jeu
        setup(); // Initialiser le jeu
    } else if (gameOver && gameOverCooldown === 0) {
        // Réinitialiser le jeu
        resetGame();
        gameOver = false;
        showMenu = false;
        setup(); // Réinitialiser le jeu
    } else {
        // Calculer la translation pour centrer le joueur
        let translateX = width / 2 - player.x;
        let translateY = height / 2 - player.y;

        // Ajuster les coordonnées de la souris en fonction de la translation
        let adjustedMouseX = mouseX - translateX;
        let adjustedMouseY = mouseY - translateY;

        player.shootProjectile(adjustedMouseX, adjustedMouseY);
    }
}

function resetGame() {
    // Réinitialiser les variables de jeu
    monsters = [];
    spawnCooldDown = 0;
    player.reset();
}