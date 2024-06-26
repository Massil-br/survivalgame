
let drawlog = true;


function makeBossMap()
{
    let numTilesWide = 100;
    let numTilesHigh = 100;

    map = [];
    for (let i = 0; i < numTilesWide; i++) {
        map[i] = [];
        for (let j = 0; j < numTilesHigh; j++) {
            let noiseValue = noise(i * 0.1, j * 0.1); // Génération de bruit de Perlin
            map[i][j] = pickColorBoss(noiseValue);
        }
    }
}

function pickColorBoss(noiseValue)
{
    if (noiseValue < 0.3) {
        return color(volcanoStone); // Exemple de couleur pour une valeur de bruit basse
    } else if (noiseValue < 0.6) {
        return color(volcano); // Exemple de couleur pour une valeur de bruit moyenne
    } else {
        return color(stone); // Exemple de couleur pour une valeur de bruit haute
    }
}

function drawBossMap(startX, startY, w, h) {
    if (drawlog) {
        console.log("Dessin de la carte du boss");
        drawlog = false;
    }
    let startXIndex = Math.max(0, Math.floor(startX / tileSize));
    let startYIndex = Math.max(0, Math.floor(startY / tileSize));
    let endXIndex = Math.min(100, startXIndex + Math.ceil(1 + w / tileSize));
    let endYIndex = Math.min(100, startYIndex + Math.ceil(1 + h / tileSize));

    for (let i = startXIndex; i < endXIndex; i++) {
        for (let j = startYIndex; j < endYIndex; j++) {
            fill(map[i][j]);
            rect(i * tileSize, j * tileSize, tileSize, tileSize);
        }
    }
}
