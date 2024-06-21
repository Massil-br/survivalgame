let monsters = [];

function preload() {

    window.player = new Player();
    window.player.preload();

    // Précharger les skins des monstres
    monsters.forEach(monster => {
        monster.preload();
    });
}

function setup() {
    createCanvas(1280, 720);
    frameRate(60);
    noStroke();
    background(0, 0, 0);
    noiseDetail(5, 0.5);
    makeMap();
    drawMap();
    spawnMonsters(500);
    setMapSize(600, 600);
   
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
    clear();
    background(255);

    // Calculer la translation pour centrer le joueur
    let translateX = width / 2 - player.x;
    let translateY = height / 2 - player.y;
    translate(translateX, translateY);

    // Dessiner seulement la partie de la carte visible autour du joueur
    drawMap(player.x - width / 2, player.y - height / 2, width, height);

    // Dessiner tous les monstres
    window.player.play();
    for (let i = monsters.length - 1; i >= 0; i--) {
        let monster = monsters[i];
        if (monster.isDead) {
            monsters.splice(i, 1);
        } else {
            monster.Play();
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
    }
}

  
function mousePressed() {
    // Calculer la translation pour centrer le joueur
    let translateX = width / 2 - player.x;
    let translateY = height / 2 - player.y;

    // Ajuster les coordonnées de la souris en fonction de la translation
    let adjustedMouseX = mouseX - translateX;
    let adjustedMouseY = mouseY - translateY;

    player.shootProjectile(adjustedMouseX, adjustedMouseY);
}