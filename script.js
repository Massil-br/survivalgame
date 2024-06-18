let mapWidth = 10000;
let mapHeight = 10000;
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
    makeMap(player.x - width/2, player.y-height/2, width, height);
    drawMap();
    spawnMonsters(20);
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
     monsters.forEach(monster => {
        monster.Play();
    });

    window.player.play();
    
   
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
