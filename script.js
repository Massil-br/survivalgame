let monsters = [];
let spawnCooldDown = 0;
let showMenu = true;
let gameOver = false;
let gameOverCooldown = 0;
let gameOverImage;
let currentLoop = null;
let bossTp = false;
let inBossMap = false;
let victory = false;
let menuBackground;
let gameOverBackground;
let victoryBackground;

function preload() {

    window.player = new Player();
    window.player.preload();

    // Charger l'image de game over
    gameOverImage = loadImage('Assets/Player/PNG_/07-Dead/PS_BALD GUY_Dead_008.png');
    menuBackground = loadImage("Assets/Player/PNG_/Menu.jpg");
    gameOverBackground = loadImage("Assets/Player/PNG_/gameover.jpg");
    victoryBackground = loadImage("Assets/Player/PNG_/victory.jpg");
}

function drawMenu(){
    background(menuBackground);
    fill(0, 255, 255);
    stroke(0);
    strokeWeight(2);
    textSize(50);
    textAlign(CENTER, CENTER);

    text("Menu", width / 2, height / 2 - 150);
    textSize(20);
    text("Cliquer sur l'écran pour jouer", width / 2, height / 2 + 50);
    text("Z : Avancer | Q : Gauche | S : Reculer | D : Droite", width / 2, height / 2 + 90);
    text("", width / 2, height / 2 + 90);
    text("Appuyer sur M pour téléporter au boss", width / 2, height / 2 + 130);
}

function drawGameOver(){
    background(gameOverBackground);
    fill(0, 255, 255);
    stroke(0);
    strokeWeight(2);
    textSize(50);
    textAlign(CENTER, CENTER);

    text("Game Over", width / 2, height / 2 - 150);

    let imageY = (height / 2 - 150 + height / 2 + 50) / 2 - 100;

    // Afficher l'image de game over
    if (gameOverImage) {
        image(gameOverImage, (width / 2 - gameOverImage.width / 2)+190, imageY-40, 200, 200);
    }

    textSize(20);
    text("Cliquer sur l'écran pour jouer", width / 2, height / 2 + 50);
    text("Z : Avancer | Q : Gauche | S : Reculer | D : Droite", width / 2, height / 2 + 90);
    text("Appuyer sur M pour téléporter au boss", width / 2, height / 2 + 130);
}

function drawVictory() {
    background(victoryBackground);
    fill(0, 255, 255);
    stroke(0);
    strokeWeight(2);
    textSize(50);
    textAlign(CENTER, CENTER);

    text("Victoire!", width / 2, height / 2 - 150);
    textSize(20);
    text("Cliquer sur l'écran pour rejouer", width / 2, height / 2 + 50);
}

function setup() {
    createCanvas(1280, 720);
    frameRate(60);
    noStroke();
    background(0, 0, 0);
    noiseDetail(5, 0.5);

    if (window.currentLoop === bossLoop) {
        makeBossMap();
    } else {
        setMapSize(600, 600);
        spawnMonsters(250);
    }
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
    } else if (victory) {
        drawVictory();
    } else {
        if (window.currentLoop) {
            window.currentLoop();
        } else {
            gameLoop();
        }

        if (player.dead) {
            gameOver = true;
            gameOverCooldown = 3 * 60; // 3 fois 60 frames de cooldown (3 secondes à 60 FPS)
        }

        if (window.boss && window.boss.dead) {
            victory = true;
        }
    }
}

function spawnMonsters(numMonsters) {
    for (let i = 0; i < numMonsters; i++) {
        let randomX = Math.random() * mapWidth;
        let randomY = Math.random() * mapHeight;
        let newMonster = new Monster(window.player);
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
    } else if (victory) {
        // Réinitialiser le jeu
        resetGame();
        victory = false;
        showMenu = true;
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
    window.currentLoop = null;
    inBossMap = false;
    bossTp = false;
    victory = false;
}

function teleportToBossMap() {
    console.log("Téléportation vers la carte du boss");
    // Réinitialiser la carte du boss
    makeBossMap();

    // Créer le boss et le positionner au centre de la carte du boss
    window.boss = new Boss(player);
    window.boss.x = 50 * tileSize / 2;
    window.boss.y = 50 * tileSize / 2;

    // Positionner le joueur aléatoirement sur la carte du boss, loin du boss
    let playerX, playerY;
    do {
        playerX = Math.random() * 100 * tileSize;
        playerY = Math.random() * 100 * tileSize;
    } while (dist(playerX, playerY, window.boss.x, window.boss.y) < 10 * tileSize);

    player.x = playerX;
    player.y = playerY;

    // Créer et positionner les archers
    window.archers = [];
    let numArchers = player.level; // Créer un nombre d'archers égal au niveau du joueur
    for (let i = 0; i < numArchers; i++) {
        let archerX, archerY;
        do {
            archerX = Math.random() * 100 * tileSize;
            archerY = Math.random() * 100 * tileSize;
        } while (dist(archerX, archerY, window.boss.x, window.boss.y) < 10 * tileSize);

        let archer = new Archers(player, window.boss);
        archer.x = archerX;
        archer.y = archerY;
        window.archers.push(archer);
    }

    // Changer la boucle de jeu active
    window.currentLoop = bossLoop;
    inBossMap = true;
    console.log("Boucle de jeu active : bossLoop");
}

function keyPressed() {
    if ((key === 'm' || key === 'M') && !bossTp) {
        teleportToBossMap();
        bossTp = true;
    }
    
}