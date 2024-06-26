class Arrow {
    constructor(x, y, angle, speed, range) {
        this.x = x;
        this.y = y;
        this.startX = x; // Position de départ
        this.startY = y; // Position de départ
        this.angle = angle;
        this.speed = speed;
        this.range = range;
        this.distanceTraveled = 0;
        this.active = true;
        this.image = loadImage("./Assets/Items/arrow.png", () => {
            console.log("Image de la flèche chargée");
        }, () => {
            console.error("Erreur de chargement de l'image de la flèche");
        });
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.distanceTraveled = dist(this.startX, this.startY, this.x, this.y);

        if (this.distanceTraveled >= this.range) {
            this.active = false;
        }
    }

    draw() {
        if (this.active) {
            push();
            translate(this.x, this.y);
            rotate(this.angle + HALF_PI); // Ajouter HALF_PI pour corriger l'orientation
            imageMode(CENTER);
            let arrowWidth = 20; // Largeur de la flèche redimensionnée
            let arrowHeight = 100; // Hauteur de la flèche redimensionnée
            image(this.image, 0, 0, arrowWidth, arrowHeight); // Redimensionner l'image de la flèche
            pop();
        }
    }
}
