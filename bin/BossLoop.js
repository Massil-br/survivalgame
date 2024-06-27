function bossLoop() {
    clear();
    background(255);

    // Calculer la translation pour centrer le joueur
    let translateX = width / 2 - player.x;
    let translateY = height / 2 - player.y;
    translate(translateX, translateY);

    // Dessiner seulement la partie de la carte visible autour du joueur
    drawBossMap(player.x - width / 2, player.y - height / 2, width, height);

    // Mettre à jour et dessiner le joueur
    window.player.play();

    // Mettre à jour et dessiner le boss
    if (window.boss) {
        window.boss.Play();
    }

    // Mettre à jour et dessiner les archers
    if (window.archers) {
        window.archers.forEach(archer => {
            archer.Play();
        });
    }

    // Mettre à jour et dessiner les projectiles du joueur
    player.projectiles.forEach(projectile => {
        projectile.update();
        projectile.draw();
    });

    // Gérer les collisions entre projectiles du joueur et le boss
    player.projectiles.forEach(projectile => {
        if (window.boss && !window.boss.dead && projectile.active && window.boss.checkCollisionWithProjectile(projectile)) {
            window.boss.health -= player.damage;
            projectile.active = false; // Désactiver le projectile après avoir touché le boss
            window.boss.checkDeath(); // Vérifier si le boss est mort
        }
    });

    // Supprimer les projectiles inactifs du joueur
    player.projectiles = player.projectiles.filter(projectile => projectile.active);

    // Gérer les collisions entre les flèches du boss et le joueur
    if (window.boss) {
        window.boss.arrows.forEach(arrow => {
            let arrowWidth = 20; // Largeur de la flèche redimensionnée
            let arrowHeight = 100; // Hauteur de la flèche redimensionnée
            if (arrow.active && dist(arrow.x, arrow.y, player.x, player.y) < Math.max(arrowWidth, arrowHeight) / 2) {
                player.health -= window.boss.damage;
                arrow.active = false; // Désactiver la flèche après avoir touché le joueur
                player.checkDeath(); // Vérifier si le joueur est mort
            }
        });
    }

    // Gérer les collisions entre les flèches des archers et le boss
    if (window.archers) {
        window.archers.forEach(archer => {
            archer.arrows.forEach(arrow => {
                if (arrow.active && window.boss.checkCollisionWithProjectile(arrow)) {
                    window.boss.health -= archer.damage;
                    arrow.active = false; // Désactiver la flèche après avoir touché le boss
                    window.boss.checkDeath(); // Vérifier si le boss est mort
                }
            });
        });
    }

    // Supprimer les flèches inactives des archers
    if (window.archers) {
        window.archers.forEach(archer => {
            archer.arrows = archer.arrows.filter(arrow => arrow.active);
        });
    }

    // Vérifier si le boss est mort pour terminer le combat
    if (window.boss && window.boss.dead) {
        console.log("Le boss est vaincu !");
        // Ajouter la logique pour retourner à la carte principale ou terminer le jeu
    }
}
