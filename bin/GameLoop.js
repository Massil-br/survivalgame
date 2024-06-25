function gameLoop(){
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
   
    if (monsters.length < 500 && spawnCooldDown == 0 && !player.dead) {
        spawnMonsters(5);
        spawnCooldDown = 5*60;
    }else {
        spawnCooldDown--;
    }
}