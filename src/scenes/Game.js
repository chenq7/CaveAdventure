import Phaser from "phaser";
import mp3 from "../assets/Orbital\ Colossus.mp3";
import background from "../assets/game_background.jpg";
import character from "../assets/character.png";
import bat from "../assets/bats.png";
import beam from "../assets/beam.png";
import explosion from "../assets/explosion.png";
import Beam from "./Beam.js";
import Bat from "./Bat.js";

class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  preload() {
    this.load.image("background", background);

    this.load.spritesheet("character", character, {
      frameWidth: 22,
      frameHeight: 31
    });

    this.load.spritesheet("bat", bat, {
      frameWidth: 27,
      frameHeight: 27
    });

    this.load.spritesheet("explosion", explosion, {
      frameWidth: 16,
      frameHeight: 16
    })

    this.load.spritesheet("beam", beam, {
      frameWidth: 16,
      frameHeight: 16,
    });
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

    this.anims.create({
      key: "bat_animation",
      frames: this.anims.generateFrameNumbers("bat"),
      frameRate: 20,
      repeat: -1
    })

    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNames("bat"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    })

    this.anims.create({
      key: "beam_animation",
      frames: this.anims.generateFrameNumbers("beam"),
      frameRate: 20,
      repeat: -1
    })

    this.monsters = this.add.group();
    new Bat(this, 800, 100);
    new Bat(this, 800, 300);
    new Bat(this, 800, 500);

    this.projectiles = this.add.group();
    this.physics.add.collider(this.projectiles, this.monsters, function(projectile, monster){
      monster.destroy();
      projectile.destroy();
    });
  }

  update() {
    this.movePlayer();

    this.background.tilePositionX -= 0.5;

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.shootBeam();
    }

    for (let i = 0; i < this.projectiles.getChildren().length; i++){
      let beam = this.projectiles.getChildren()[i];
      beam.update();
    }
  //   if (time > 0 && time % 200 === 0){
  //   }

  //   time += 1;

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
};

export default Game;