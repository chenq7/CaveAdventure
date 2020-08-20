import Phaser from "phaser";
import Beam from "./Beam.js";
import Bat from "./Bat.js";
import Explosion from "./Explosion.js";
import PowerUp from "./PowerUp.js";

class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  create() {

    this.beamSound = this.sound.add("beam_sound", {volume: 0.3});
    this.explodeSound = this.sound.add("explode_sound", { volume: 0.5 });
    this.pickupSound = this.sound.add("pickup_sound");
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

    this.score = 0;
    this.hp = 100;
    this.time = 0;

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

    this.maxWaves = 5;
    this.currWave = 0;
    this.currEnemies = 0;
    this.numEnemies = 0;
    this.powerupTypes = ["healthUp", "scoreUp", "powerUp"];
  }

  update() {

    if (this.hp <= 0){
      this.music.pause();
      this.scene.start('gameover', {score: this.score});
    }

    if (this.enemies.getChildren().length === 0){
      if (this.currWave < this.maxWaves){
        this.currWave++;
        this.numEnemies += 4;
        let currY = 80;
        let currX = 800;
        for (let i = 0; i < this.numEnemies; i++){
          if (currY > 580){
            currY = currY == 680 ? 115 : 80;
            currX = currX + 100;
          }
          this.generateBat(currX, currY);
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

    if (this.time % 100 === 0){
      let powerup = this.powerupTypes[Math.floor(Math.random() * 3)];
      new PowerUp(this, powerup);
    }
    this.time += 1;

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
    new Beam(this);
    this.beamSound.play();
  }

  hurtPlayer(player, enemy){
    if (this.player.alpha < 1) return;
    this.explodeSound.play();
    this.loseHp();
    enemy.destroy();
    new Explosion(this, enemy.x, enemy.y);
    this.score += 175;
    this.addScore(); 

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

    new Explosion(this, enemy.x, enemy.y);
    this.explodeSound.play();
    projectile.destroy();
    enemy.destroy();
    this.score += 175;
    this.addScore(); 
  }

  generateBat(x, y){
    new Bat(this, x, y);
  }

  loseHp() {
    this.hp -= 34;
    this.hpLabel.text = "HP " + this.hp;
  }

  addScore() {
    let scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel.text = "SCORE " + scoreFormated;  
  }
};

export default Game;