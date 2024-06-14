let images = [];
let placedImages = [];
let map = new Map(); // Utiliser une Map pour suivre les zones générées
let tileSize = 32;
let mapWidth = 5000;
let mapHeight = 5000;
let tileset;

function preload() {
    window.player = new Player(mapWidth / 2, mapHeight / 2);
    window.player.preload();

    images.push({ img: loadImage("assets/bush.png"), chance: 5 });
    images.push({ img: loadImage("assets/grass1.png"), chance: 5 });
    images.push({ img: loadImage("assets/grass2.png"), chance: 5 });
    images.push({ img: loadImage("assets/grass.png"), chance: 150 });
    images.push({img:loadImage("assets/tree.png"), chance: 5});
}

function setup() {
    createCanvas(1500, 1000);
    background(0, 55, 0); // Fond noir
    generateImagesAroundPlayer();
}

function draw() {
    clear();
    background(0, 55, 0); // Fond vert

    // Calculer la translation pour centrer le joueur
    let translateX = width / 2 - player.x;
    let translateY = height / 2 - player.y;
    translate(translateX, translateY);

    // Dessiner les images placées
    for (let img of placedImages) {
        image(img.img, img.x, img.y, 64, 64);
    }

    // Mettre à jour et dessiner le joueur
    window.player.play();
    generateImagesAroundPlayer(); // Générer des images si nécessaire lors du déplacement
}
