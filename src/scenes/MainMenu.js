import Phaser from "phaser";
import background from "../assets/game_background.jpg";
import character from "../assets/character.png";
import bat from "../assets/bats.png";
import beam from "../assets/beam.png";
import explosion from "../assets/explosion.png";
import fontFile from "../assets/font/font.xml";
import fontImage from "../assets/font/font.png";

class MainMenu extends Phaser.Scene {
  constructor() {
    super("mainmenu");
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

    this.load.bitmapFont("pixelFont", fontImage, fontFile);
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();

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

    this.add.text(270, 300, "Press space to start.")
    this.add.text(270, 315, "Move with up, down, left, right.")
    this.add.text(270, 330, "Press spacebar to shoot.")
    this.add.text(270, 345, "Kill all enemies to win.")
  }

  update() {
    if (this.cursors.space.isDown) {
      this.scene.start('game');
    }
  }
}

export default MainMenu;