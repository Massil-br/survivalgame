class Projectile {
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
        this.image = loadImage("./Assets/Items/flame_hrise.png"); // Charger l'image de la flèche
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
            rotate(this.angle);
            imageMode(CENTER);
            image(this.image, 0, 0, tileSize / 2, tileSize / 2);
            pop();
        }
    }
}