class Player{
    constructor(name, hp, hpMax, atk, def, spd, inventorySize ){
        this.name = name;
        this.hp = hp;
        this.hpMax = hpMax;
        this.atk = atk;
        this.def = def;
        this.spd = spd;
        this.inventorySize = inventorySize;
        this.inventory = [];
        this.isDead = false;
    }

    checkGameOver(){
        if(this.hp <= 0){
            this.hp = 0;
            this.isDead = true;
        }
    }
}