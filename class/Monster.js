class Monster {
    randomPosition(center) {
        let range = 50;
        return Math.random() * (2 * range) + (center - range);
    }

    constructor(player) {
        this.x = this.randomPosition(player.x);
        this.y = this.randomPosition(player.y);
        this.level = 1;
        this.maxHealth = 3;
        this.dead = false;
        this.health = this.maxHealth;
        this.damage = 0.5;
        this.defense = 1;
        this.speed = 0.5;
        this.attackRange = 2;
        this.attackSpeed = 1;
        this.checkLevelUp(player);
    }

    checkLevelUp(player) {
        let multiplier = 1.2;
        this.level = player.level;
        this.maxHealth = this.maxHealth * (multiplier * this.level);
        this.health = this.maxHealth * (multiplier * this.level);
        this.damage = this.damage * (multiplier * this.level);
        this.defense = this.defense * (multiplier * this.level);
        this.speed = this.speed * (multiplier * this.level);
        this.attackSpeed = this.attackSpeed * (multiplier * this.level);
    }

    Play() {
        this.checkDeath();
        this.drawMonster();
        this.move();
        this.attack();
    }

    checkDeath() {
        if (this.health <= 0) {
            this.health = 0;
            this.dead = true;
        }
    }

    preload() {
        this.skin = loadImage("assets/monster.png");
    }

    drawMonster() {
        if (this.skin) {
            let spriteWidth = this.skin.width / 2;
            let spriteHeight = this.skin.height / 5;
            image(this.skin, 0, 0, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
        }
    }
}