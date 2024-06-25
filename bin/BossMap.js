function makeBossMap()
{
    let numTilesWide = 100 / tileSize;
    let numTilesHigh = 100 / tileSize;

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
        return volcanoStone; // Exemple de couleur pour une valeur de bruit basse
    } else if (noiseValue < 0.6) {
        return volcano; // Exemple de couleur pour une valeur de bruit moyenne
    } else {
        return stone; // Exemple de couleur pour une valeur de bruit haute
    }
}

// Assurez-vous d'inclure p5.js dans votre projet pour utiliser la fonction noise