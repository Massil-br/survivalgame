class Projectile {
    constructor(x, y, direction, speed) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.speed = speed;
        this.active = true;
    }

    update() {
        if (this.direction === "right") {
            this.x += this.speed;
        } else if (this.direction === "left") {
            this.x -= this.speed;
        } else if (this.direction === "up") {
            this.x -= this.speed;
        }  else if (this.direction === "down") {
            this.x -= this.speed;
        }



        // Désactiver le projectile s'il sort de la carte
        if (this.x < 0 || this.x > mapWidth || this.y < 0 || this.y > mapHeight) {
            this.active = false;
        }
    }

    draw() {
        loadImage("./Assets/Items/arrow.png"); 
    }
}