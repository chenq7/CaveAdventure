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
  }

  create() {

    // Game statistics
    this.hp = this.maxHp;
    this.score = 0;
    this.timer = 0;
    this.maxWaves = 15;
    this.currWave = 1;
    this.currEnemies = 0;
    this.numEnemies = 0;
    this.powerupTypes = ["healthUp", "scoreUp", "powerUp"];

    this.beamSound = this.sound.add("beam_sound", {volume: 0.3});
    this.explodeSound = this.sound.add("explode_sound", { volume: 0.5 });
    this.pickupSound = this.sound.add("pickup_sound", {volume: 0.5});
    this.music = this.sound.add("music");
    let musicSettings = {
      mute: false,
      volume: 0.7,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    };
    this.music.play(musicSettings);

    this.background = this.add.tileSprite(0, 0, 1728, 1080, "background");
    this.background.setOrigin(0,0);

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.player = this.physics.add.sprite(200, 300, "character");
    this.player.setScale(1.5);
    this.player.setCollideWorldBounds(true);
    this.moveSpd = 300;

    this.enemies = this.add.group();
    this.projectiles = this.add.group();
    this.powerups = this.add.group();

    this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);
    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);
    this.physics.add.overlap(this.player, this.powerups, this.collectPowerup, null, this);

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

    let scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel = this.add.bitmapText(750, 7.5, "pixelFont", "SCORE " + scoreFormated, 25);
    this.hpLabel = this.add.bitmapText(30, 7.5, "pixelFont", "HP " + this.hp, 25);
    this.waveLabel = this.add.bitmapText(380, 7.5, "pixelFont", "WAVE " + this.currWave, 25);
  }

  update() {

    if (this.hp <= 0){
      this.music.pause();
      this.scene.start('gameover', {
        score: this.score,
        gold: this.gold,
        hp: this.maxHp,
        beamLevel: this.beamLevel
      });
    }

    if (this.enemies.getChildren().length === 0){
      if (this.currWave < this.maxWaves){
        this.currWave++;
        this.waveLabel.text = "WAVE " + this.currWave;
        this.numEnemies += this.currWave > 3 ? 2 : 4;
        if (this.currWave == 3) this.numEnemies = 2;
        let currY = 80;
        let currX = 800;
        for (let i = 0; i < this.numEnemies; i++){
          if (currY > 580){
            currY = currY == 680 ? 115 : 80;
            currX = currX + 100;
          }
          if (this.currWave > 2){
            this.generateDragon(currX, currY);
          } else {
            this.generateBat(currX, currY);
          }
          currY += 150;
        }
      }
      else {
        this.music.pause();
        this.scene.start("winscreen", { score: this.score });
      }
    }

    this.movePlayer();

    this.background.tilePositionX -= 0.5;

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.shootBeam();
    }

    for (let i = 0; i < this.projectiles.getChildren().length; i++){
      let beam = this.projectiles.getChildren()[i];
      beam.update();
    }
 
    for (let i = 0; i < this.enemies.getChildren().length; i++) {
      let enemy = this.enemies.getChildren()[i];
      enemy.update();
    }

    for (let i = 0; i < this.powerups.getChildren().length; i++) {
      let powerup = this.powerups.getChildren()[i];
      powerup.update();
    }

    if (this.timer % 200 === 0){
      let type = this.powerupTypes[Math.floor(Math.random() * 3)];
      new PowerUp(this, type);
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
    if (this.cursorKeys.left.isDown){
      this.player.setVelocityX(-this.moveSpd);
    } else if (this.cursorKeys.right.isDown){
      this.player.setVelocityX(this.moveSpd);
    } 
    
    if (this.cursorKeys.up.isDown) {
      this.player.setVelocityY(-this.moveSpd);
    } else if (this.cursorKeys.down.isDown) {
      this.player.setVelocityY(this.moveSpd);
    }
  }

  shootBeam() {
    this.beamSound.play();
    if (this.beamLevel === 1){
      new Beam(this, this.player.x + 16, this.player.y, "beam", "right");
    } else if (this.beamLevel === 2) {
      new Beam(this, this.player.x + 16, this.player.y - 5, "beam", "right");
      new Beam(this, this.player.x + 16, this.player.y + 5, "beam", "right");
    } else if (this.beamLevel === 3) {
      new Beam(this, this.player.x + 16, this.player.y, "beam", "right");
      new Beam(this, this.player.x + 16, this.player.y, "beam", "topRight");
      new Beam(this, this.player.x + 16, this.player.y, "beam", "bottomRight");
    } else if (this.beamLevel === 4) {
      new Beam(this, this.player.x + 16, this.player.y, "beam2", "right");
    } else if (this.beamLevel === 5) {
      new Beam(this, this.player.x + 16, this.player.y -12, "beam2", "right");
      new Beam(this, this.player.x + 16, this.player.y + 12, "beam2", "right");
    } else if (this.beamLevel >= 6) {
      new Beam(this, this.player.x + 16, this.player.y, "beam2", "right");
      new Beam(this, this.player.x + 16, this.player.y, "beam2", "topRight");
      new Beam(this, this.player.x + 16, this.player.y, "beam2", "bottomRight");
    }
  }

  hurtPlayer(player, enemy){
    if (this.player.alpha < 1) return;
    this.explodeSound.play();
    this.updateHp(-57);
    enemy.destroy();
    new Explosion(this, enemy.x, enemy.y);
    this.addScore(175); 

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
    
    enemy.hp -= this.beamLevel > 3 ? 2 : 1;
    projectile.destroy();

    if (enemy.hp <= 0){
      new Explosion(this, enemy.x, enemy.y);
      this.explodeSound.play();
      enemy.destroy();
      this.addScore(175); 
    }
  }

  generateBat(x, y){
    new Bat(this, x, y);
  }

  generateDragon(x, y){
    new Dragon(this, x, y);
  }

  updateHp(num){
    this.hp += num;
    this.hpLabel.text = "HP " + this.hp;
  }

  addScore(num){
    this.score += num;
    let scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel.text = "SCORE " + scoreFormated;  
  }

  collectPowerup(player, powerup){

    switch(powerup.powerupType){
      case "healthUp":
        this.updateHp(50);
        break;
      case "scoreUp":
        this.addScore(1000);
        break;
      case "powerUp":
        this.beamLevel++;
        break;
    }
    powerup.destroy();
    this.pickupSound.play();
  }
};

export default Game;