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
    noiseDetail(10, 0.5);
    makeMap();
    drawMap();
    spawnMonsters(1000);
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

    // Mettre à jour et dessiner le joueur
    window.player.play();

    // Mettre à jour et dessiner les monstres
    monsters.forEach(monster => {
        monster.Play();
    });

    // Mettre à jour et dessiner les projectiles
    player.projectiles.forEach(projectile => {
        projectile.update();
        projectile.draw();
    });

    // Gérer les collisions entre projectiles et monstres
    player.projectiles.forEach(projectile => {
        monsters.forEach(monster => {
            if (!monster.dead && projectile.active && dist(projectile.x, projectile.y, monster.x, monster.y) < tileSize / 2) {
                monster.health -= player.damage;
                projectile.active = false; // Désactiver le projectile après avoir touché un monstre
                monster.checkDeath(); // Vérifier si le monstre est mort et ajouter de l'XP
            }
        });
    });

    // Supprimer les projectiles inactifs
    player.projectiles = player.projectiles.filter(projectile => projectile.active);

    // Supprimer les monstres morts
    monsters = monsters.filter(monster => !monster.dead);
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