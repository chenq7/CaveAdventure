import Phaser from "phaser";
import Beam from "./Beam.js";
import Bat from "./Bat.js";
import Explosion from "./Explosion.js";
import PowerUp from "./PowerUp.js";
import Dragon from "./Dragon.js";

class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  init(data) {
    this.gold = data.gold;
    this.maxHp = data.hp;
    this.beamLevel = data.beamLevel;
    this.petLevel = data.petLevel;
    this.regenLevel = data.regenLevel;
    this.level = data.level
  }

  create() {
    // Game statistics
    this.hp = this.maxHp;
    this.score = 0;
    this.timer = 0;
    this.maxWaves = 12;
    this.currWave = 0;
    this.currEnemies = 0;
    this.numEnemies = 0;
    this.powerupTypes = ["healthUp", "scoreUp"]; //powerUp

    this.beamSound = this.sound.add("beam_sound", {volume: 0.12});
    this.explodeSound = this.sound.add("explode_sound", { volume: 0.15 });
    this.pickupSound = this.sound.add("pickup_sound", {volume: 0.2});
    this.music = this.sound.add("music");
    let musicSettings = {
      mute: false,
      volume: 0.3,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    };
    this.music.play(musicSettings);

    this.background = this.add.tileSprite(0, 0, 1728, 1080, "cave1");
    this.background.setOrigin(0,0);

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.player = this.physics.add.sprite(200, 300, "character");
    this.prevPlayerX = 200;
    this.prevPlayerY = 300;
    this.pet = this.physics.add.sprite(170, 300, "pet");
    this.player.setScale(1.5);
    this.pet.setScale(0.55);
    this.player.setCollideWorldBounds(true);
    this.pet.setCollideWorldBounds(true);
    this.moveSpd = 300;

    this.enemies = this.add.group();
    this.projectiles = this.add.group();
    this.powerups = this.add.group();
    this.enemyProjectiles = this.add.group();

    this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);
    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);
    this.physics.add.overlap(this.player, this.powerups, this.collectPowerup, null, this);
    this.physics.add.overlap(this.player, this.enemyProjectiles, this.hurtPlayer, null, this);
    this.physics.add.overlap(this.player, this.pet, this.handlePetCollision, null, this);
    // Add HUD background
    let graphics = this.add.graphics();
    graphics.fillStyle("0x000000", 1);
    graphics.beginPath();
    graphics.moveTo(0, 0);
    graphics.lineTo(900, 0);
    graphics.lineTo(900, 30);
    graphics.lineTo(0, 30);
    graphics.lineTo(0, 0);
    graphics.closePath();
    graphics.fillPath();

    let scoreFormated = this.zeroPad(this.gold, 6);
    this.scoreLabel = this.add.bitmapText(750, 7.5, "pixelFont", scoreFormated, 25);
    this.hpLabel = this.add.bitmapText(30, 7.5, "pixelFont", "HP " + this.hp + " / " + this.maxHp, 25);
    this.waveLabel = this.add.bitmapText(380, 7.5, "pixelFont", "WAVE " + this.currWave, 25);
    this.add.image(835, 15, "scoreUp");
  }

  update() {
    if (this.hp <= 0){
      this.endWave("You have been slain...");
    }

    if (this.enemies.getChildren().length === 0){
      if (this.currWave < this.maxWaves){
        this.currWave++;
        this.waveLabel.text = "Wave " + this.currWave + " / " + this.maxWaves;
        this.numEnemies += this.currWave > 3 ? 3 : 5;
        if (this.currWave == 5) this.numEnemies = 3;
        let currY = 80;
        let currX = 800;
        for (let i = 0; i < this.numEnemies; i++){
            if (currY > 580) {
              currY = currY == 680 ? 115 : 80;
              currX += 100;
            }
            if (this.currWave > 4 && Math.floor(Math.random() * 2) === 0){
              this.generateDragon(currX, currY);
            } else {
              this.generateBat(currX, currY);
            }
            currY += 150;
        }
      }
      else {
        this.endWave("Dungeon cleared! :)");
      }
    }

    this.movePlayer();

    this.background.tilePositionX -= 0.5;

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.shootBeam();
    }

    for (let i = 0; i < this.projectiles.getChildren().length; i++){
      this.projectiles.getChildren()[i].update();
    }
 
    for (let i = 0; i < this.enemies.getChildren().length; i++) {
      this.enemies.getChildren()[i].update();
    }

    for (let i = 0; i < this.powerups.getChildren().length; i++) {
      this.powerups.getChildren()[i].update();
    }

    for (let i = 0; i < this.enemyProjectiles.getChildren().length; i++) {
      this.enemyProjectiles.getChildren()[i].update();
    }

    // power up drops
    if (this.timer % 500 === 0){
      let type = this.powerupTypes[Math.floor(Math.random() * 3)];
      new PowerUp(this, type);
    }

    // hp regen
    if (this.timer % 200 === 0){
      this.updateHp(this.regenLevel);
    }

    // pet fire rate
    if (this.timer % Math.floor(100 / this.petLevel) === 0){
      new Beam(this, this.pet.x + 16, this.pet.y, "iceShard", "right");
    }
    this.timer += 1;

  }

  // 4.1 zero pad format function
  zeroPad(number, size) {
    let stringNumber = String(number);
    while (stringNumber.length < size) {
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
  }

  movePlayer() {
    this.player.setDrag(1000);
    this.pet.setDrag(1000);
    if (this.cursorKeys.left.isDown){
      this.player.setVelocityX(-this.moveSpd);
      this.pet.setVelocityX(-this.moveSpd);
    } else if (this.cursorKeys.right.isDown){
      this.player.setVelocityX(this.moveSpd);
      this.pet.setVelocityX(this.moveSpd);
    } 
    
    if (this.cursorKeys.up.isDown) {
      this.player.setVelocityY(-this.moveSpd);
      this.pet.setVelocityY(-this.moveSpd);
    } else if (this.cursorKeys.down.isDown) {
      this.player.setVelocityY(this.moveSpd);
      this.pet.setVelocityY(this.moveSpd);
    }
    this.prevPlayerX = this.player.x;
    this.prevPlayerY = this.player.y;
  }

  handlePetCollision() {
    this.player.x = this.prevPlayerX;
    this.player.y = this.prevPlayerY;
  }

  endWave(text) {
    this.music.pause();
    this.scene.start('gameover', {
      text: text,
      score: this.score,
      gold: this.gold,
      hp: this.maxHp,
      beamLevel: this.beamLevel,
      petLevel: this.petLevel,
      regenLevel: this.regenLevel
    });
  }

  shootBeam() {
    this.beamSound.play();
    if (this.beamLevel === 1){
      new Beam(this, this.player.x + 16, this.player.y, "beam", "right");
    } else if (this.beamLevel === 2) {
      new Beam(this, this.player.x + 16, this.player.y - 5, "beam", "right");
      new Beam(this, this.player.x + 16, this.player.y + 5, "beam", "right");
    } else if (this.beamLevel === 3) {
      new Beam(this, this.player.x + 16, this.player.y, "beam", "topRight");
      new Beam(this, this.player.x + 16, this.player.y, "beam", "right");
      new Beam(this, this.player.x + 16, this.player.y, "beam", "bottomRight");
    } else if (this.beamLevel === 4) {
      new Beam(this, this.player.x + 16, this.player.y, "beam", "topRight");
      new Beam(this, this.player.x + 16, this.player.y, "beam2", "right");
      new Beam(this, this.player.x + 16, this.player.y, "beam", "bottomRight");
    } else if (this.beamLevel === 5) {
      new Beam(this, this.player.x + 16, this.player.y, "beam2", "topRight");
      new Beam(this, this.player.x + 16, this.player.y, "beam2", "right");
      new Beam(this, this.player.x + 16, this.player.y, "beam2", "bottomRight");
    } else if (this.beamLevel === 6) {
      new Beam(this, this.player.x + 16, this.player.y, "beam2", "topRight");
      new Beam(this, this.player.x + 16, this.player.y, "beam3", "right");
      new Beam(this, this.player.x + 16, this.player.y, "beam2", "bottomRight");
    } else if (this.beamLevel === 7) {
      new Beam(this, this.player.x + 16, this.player.y, "beam3", "topRight");
      new Beam(this, this.player.x + 16, this.player.y, "beam3", "right");
      new Beam(this, this.player.x + 16, this.player.y, "beam3", "bottomRight");
    } else if (this.beamLevel === 8) {
      new Beam(this, this.player.x + 16, this.player.y, "beam3", "topRight");
      new Beam(this, this.player.x + 16, this.player.y, "beam4", "right");
      new Beam(this, this.player.x + 16, this.player.y, "beam3", "bottomRight");
    } else if (this.beamLevel >= 9) {
      new Beam(this, this.player.x + 16, this.player.y, "beam4", "right");
      new Beam(this, this.player.x + 16, this.player.y, "beam4", "topRight");
      new Beam(this, this.player.x + 16, this.player.y, "beam4", "bottomRight");
    }
  }

  hurtPlayer(player, enemy){
    if (this.player.alpha < 1) return;
    this.explodeSound.play();
    this.updateHp(enemy.damage);
    enemy.destroy();
    new Explosion(this, enemy.x, enemy.y);

    this.immune();
  }

  immune() {
    this.player.alpha = 0.5;

    this.time.addEvent({
      delay: 500,
      callback: () => { this.player.alpha = 1 },
      callbackScope: this,
      loop: false
    });
  }

  hitEnemy(projectile, enemy){
    
    enemy.hp -= projectile.dmg;
    projectile.destroy();

    if (enemy.hp <= 0){
      new Explosion(this, enemy.x, enemy.y);
      this.explodeSound.play();
      enemy.destroy();
      this.addScore(enemy.value); 
    }
  }

  generateBat(x, y){
    new Bat(this, x, y);
  }

  generateDragon(x, y){
    new Dragon(this, x, y);
  }

  updateHp(num){
    if (this.hp + num > this.maxHp){
      this.hp = this.maxHp;
    } else {
      this.hp += num;
    }
    this.hpLabel.text = "HP " + this.hp + " / " + this.maxHp;
  }

  addScore(num){
    this.score += num;
    this.scoreLabel.text = this.zeroPad(this.gold + this.score, 6);
  }

  collectPowerup(player, powerup){

    switch(powerup.powerupType){
      case "healthUp":
        this.updateHp(50);
        break;
      case "scoreUp":
        this.addScore(100);
        break;

    }
    powerup.destroy();
    this.pickupSound.play();
  }

};

export default Game;