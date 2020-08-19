import Phaser from "phaser";
import mp3 from "../assets/Orbital\ Colossus.mp3";
import background from "../assets/game_background.jpg";
import character from "../assets/character.png";
import bat from "../assets/bats.png";
import bullet from "../assets/bullet.png";
import explosion from "../assets/explosion.png";
import { accelerate, decelerate } from "../utils";

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

    this.load.spritesheet("bullet", bullet, {
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
    //this.player.flipY = true;
    //this.player.angle += 3;

    this.bat1 = this.add.sprite(800, 100, "bat");
    this.bat2 = this.add.sprite(800, 300, "bat");
    this.bat3 = this.add.sprite(800, 500, "bat");

    this.bat1.setScale(1.5);
    this.bat2.setScale(1.5);
    this.bat3.setScale(1.5);


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

    this.bat1.play("bat_animation");
    this.bat2.play("bat_animation");
    this.bat3.play("bat_animation");

  }

  update() {
    this.moveBat(this.bat1, 1);
    this.moveBat(this.bat2, 2);
    this.moveBat(this.bat3, 3);

    this.movePlayer();

    this.background.tilePositionX -= 0.5;
  //   if (time > 0 && time % 200 === 0){
  //   }

  //   time += 1;

  //   if (Phaser.Input.Keyboard.JustDown(spacebar)) {
 
  //     bullets = this.physics.add.group({
  //       key: 'bullet',
  //       setScale: { x: 1, y: 1 },
  //       setXY: { x: this.player.x + 50, y: this.player.y },
  //     });

  //     bullets.children.iterate(function (child) {
  //       child.setVelocityX(250);
  //       // child.setCollideWorldBounds(true);
  //       child.checkWorldBounds = true;
  //       child.outOfBoundsKill = true;
  //     });
  //   }

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
};

export default Game;