import Phaser from "phaser";
import background from "../assets/game_background.jpg";
import character from "../assets/character.png";
import bat from "../assets/bats.png";
import beam from "../assets/beam.png";
import explosion from "../assets/explosion.png";
import fontFile from "../assets/font/font.xml";
import fontImage from "../assets/font/font.png";
import beamSound from "../assets/sound/beam.mp3";
import music from "../assets/sound/Lachrymose.mp3";
import explodeSound from "../assets/sound/explosion.mp3";
import pickupSound from "../assets/sound/pickup.mp3";

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

    this.load.audio("beam_sound", beamSound);
    this.load.audio("explode_sound", explodeSound);
    this.load.audio("pickup_sound", pickupSound);
    this.load.audio("music", music);
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
      frames: this.anims.generateFrameNames("explosion"),
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

    this.add.text(325, 285, "Press space to start.")
    this.add.text(325, 300, "Move with up, down, left, right.")
    this.add.text(325, 315, "Press spacebar to shoot.")
    this.add.text(325, 330, "Kill all enemies to win.")
  }

  update() {
    if (this.cursors.space.isDown) {
      this.scene.start('game');
    }
  }
}

export default MainMenu;