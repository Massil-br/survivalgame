let monsters = [];
let spawnCooldDown = 0;
let showMenu = true;
let gameOver = false;
let gameOverCooldown = 0;

function preload() {

    window.player = new Player();
    window.player.preload();

    // Précharger les skins des monstres
    monsters.forEach(monster => {
        monster.preload();
    });
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
    textSize(20);
    textAlign(CENTER, CENTER);

    text("Game Over", width / 2, height / 2 - 60);
    text("Jouer", width / 2, height / 2);
    text("Commandes", width / 2, height / 2 + 40);
    text("Règles", width / 2, height / 2 + 80);
}

function setup() {
    createCanvas(1280, 720);
    frameRate(60);
    noStroke();
    background(0, 0, 0);
    noiseDetail(5, 0.5);
    setMapSize(600, 600);
    spawnMonsters(20);
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
            gameOverCooldown = 3*60; // Par exemple, 3 fois 60 frames de cooldown (3 seconde à 60 FPS)
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
    player.reset(); // Assurez-vous que la méthode reset() existe dans la classe Player pour réinitialiser l'état du joueur
}