function generateImagesAroundPlayer() {
    let tileSize = 64; // Définir la taille des tuiles à 64x64
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
