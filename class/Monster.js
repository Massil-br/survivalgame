class Monster {
    randomPosition(center) {
        return Math.random(0,mapHeight) ;
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
        this.skin = null;
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
    }

    checkDeath() {
        if (this.health <= 0) {
            this.health = 0;
            this.dead = true;
        }
    }

    preload() {
        this.skin = loadImage("Assets/slime_monster_spritesheet.png");
    }

    drawMonster() {
        if (this.skin) {
            let spriteWidth = this.skin.width / 3;
            let spriteHeight = this.skin.height / 3;
            image(this.skin, this.x, this.y, spriteWidth, spriteHeight, 24, 48, spriteWidth, spriteHeight);
        }
    }
}