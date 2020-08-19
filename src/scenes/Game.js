import Phaser from "phaser";
import mp3 from "../assets/Orbital\ Colossus.mp3";
import Beam from "./Beam.js";
import Bat from "./Bat.js";

class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  create() {
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

    this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);
    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);

    this.score = 0;

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

    this.maxWaves = 5;
    this.currWave = 0;
    this.currEnemies = 0;
    this.numEnemies = 0;
  }

  update() {

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
        this.scene.start("winscreen");
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

  }

  // 4.1 zero pad format function
  zeroPad(number, size) {
    let stringNumber = String(number);
    while (stringNumber.length < size) {
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
  }

  moveBat(bat, speed) {
    bat.x -= speed;
    if (bat.x < 0) {
      this.resetPosition(bat);
    }
  }

  resetPosition(bat) {
    bat.x = 800;
    // let randomX = Phaser.Math.Between(0, 700);
  }

  destroy(pointer, gameObject) {
    gameObject.setTexture("explosion");
    gameObject.play("explode");
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
    let beam = new Beam(this);
  }

  hurtPlayer(player, enemy){
    enemy.destroy();
    player.x = 200;
    player.y = 300;
    this.score += 175;
  }

  hitEnemy(projectile, enemy){
    projectile.destroy();
    enemy.destroy();
    this.score += 175;

    var scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel.text = "SCORE " + scoreFormated;  
  }

  generateBat(x, y){
    let bat = new Bat(this, x, y);
  }
};

export default Game;