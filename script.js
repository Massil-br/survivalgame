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
            if (!map.has(key)) { // Vérifier si la zone a déjà été générée
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
    let totalChance = 0;
    images.forEach(item => totalChance += item.chance);
    let chanceOfEmpty = 80; // 80% de chance pour une case vide
    let total = totalChance + chanceOfEmpty; // Total des chances incluant les cases vides

    let rand = Math.floor(Math.random() * total);
    let sum = 0;

    for (let item of images) {
        sum += item.chance;
        if (rand < sum) {
            return item;
        }
    }
    return null; // Retourner null si aucune image n'est sélectionnée, représentant une case vide
}
//#endregion





// #region Classe Monster

// #endregion

