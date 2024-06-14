
  
  
  class Player{
    constructor(){
      this.x = 0;
      this.y = 0;
      this.skin = null;
      this.maxHealth = 10;
      this.health = this.maxHealth;
      this.maxXp = 20;
      this.xp = 0;
      this.level = 1;
      this.health = 10;
      this.damage = 1;
      this.attackRange = 3;
      this.attackSpeed = 1.5;
      this.defense = 1;
      this.speed = 1;
      this.dead = false;
      
      
    }
    
    preload(){
      this.skin = loadImage("Assets/player.png");}
  
    play(){
  
      this.checkLevelUp();
      this.checkDeath();
      this.drawPlayer();
      
      
     
    }
  
  
    drawPlayer(){
      let spriteWidth = this.skin.width / 3; 
      let spriteHeight = this.skin.height; 
      image(this.skin, this.x - spriteWidth / 2, this.y - spriteHeight / 2, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    }
  
  
    checkLevelUp(){
      if (this.xp >= this.maxXp){
        let m = 1.5;
        this.level++;
        this.xp -= this.maxXp;
        this.maxXp *= m;
        this.maxHealth *= m;
        this.health = this.maxHealth;
        this.damage *= m;
        this.defense *= m;
        this.speed *= m;
        this.attackSpeed *= m;
      }
    }
  
  
    checkDeath(){
      if (this.health <= 0){
        this.health = 0;
        this.dead = true;
      }
    }
  

  
  }

export default Player;