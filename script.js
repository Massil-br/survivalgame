let mapWidth = 10000;
let mapHeight = 10000;


function preload() {
    window.player = new Player();
    window.player.preload();

   
}

function setup() {
    createCanvas(1500, 1000);
    noStroke();
    background(0, 0, 0);
    noiseDetail(5, 0.5);
    makeMap(player.x - width/2, player.y-height/2, width, height);
    drawMap();
    
}

function draw() {
    clear();
    background(0, 0, 0);

    // Calculer la translation pour centrer le joueur
    let translateX = width / 2 - player.x;
    let translateY = height / 2 - player.y;
    translate(translateX, translateY);

    // Dessiner seulement la partie de la carte visible autour du joueur
    drawMap(player.x - width / 2, player.y - height / 2, width, height);

    window.player.play();
    
}
