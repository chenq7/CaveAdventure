import Phaser from "phaser";
import background from "../assets/images/game_background.jpg";
import character from "../assets/images/character.png";
import bat from "../assets/sprites/bats.png";
import dragon from "../assets/sprites/dragon.png";
import beam from "../assets/sprites/beam.png";
import beam2 from "../assets/sprites/beam2.png";
import explosion from "../assets/sprites/explosion.png";
import fontFile from "../assets/font/font.xml";
import fontImage from "../assets/font/font.png";
import beamSound from "../assets/sound/beam.mp3";
import selectSound from "../assets/sound/select.wav";
import menuMusic from "../assets/sound/I miss you.mp3";
import music from "../assets/sound/Lachrymose.mp3";
import shopMusic from "../assets/sound/lost souls.mp3";
import explodeSound from "../assets/sound/explosion.mp3";
import pickupSound from "../assets/sound/pickup.mp3";
import upgradeSound from "../assets/sound/upgrade.mp3";
import errorSound from "../assets/sound/error.mp3";
import healthUp from "../assets/images/health.png";
import scoreUp from "../assets/images/score.png";
import powerUp from "../assets/images/powerup.png";
import border from "../assets/images/border.png";
import startBorder from "../assets/images/startBorder.png";
import shopBackground from "../assets/images/shop.jpg";
import mainBackground from "../assets/images/background.jpg";
import waveBackground from "../assets/images/wave.jpg";

class MainMenu extends Phaser.Scene {
  constructor() {
    super("mainmenu");
  }

  preload() {
    this.load.image("background", background);
    this.load.image("shopBackground", shopBackground);
    this.load.image("waveBackground", waveBackground);
    this.load.image("mainBackground", mainBackground);
    this.load.image("healthUp", healthUp);
    this.load.image("scoreUp", scoreUp);
    this.load.image("powerUp", powerUp);

    this.load.spritesheet("border", border, {
      frameWidth: 286,
      frameHeight: 88
    });

    this.load.spritesheet("startBorder", startBorder, {
      frameWidth: 350,
      frameHeight: 70
    });

    this.load.spritesheet("character", character, {
      frameWidth: 22,
      frameHeight: 31
    });

    this.load.spritesheet("bat", bat, {
      frameWidth: 27,
      frameHeight: 27
    });

    this.load.spritesheet("dragon", dragon, {
      frameWidth: 177,
      frameHeight: 126
    })

    this.load.spritesheet("explosion", explosion, {
      frameWidth: 16,
      frameHeight: 16
    })

    this.load.spritesheet("beam", beam, {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet("beam2", beam2, {
      frameWidth: 12,
      frameHeight: 12,
    }); 

    this.load.bitmapFont("pixelFont", fontImage, fontFile);

    this.load.audio("beam_sound", beamSound);
    this.load.audio("explode_sound", explodeSound);
    this.load.audio("pickup_sound", pickupSound);
    this.load.audio("select_sound", selectSound);
    this.load.audio("menuMusic", menuMusic);
    this.load.audio("music", music);
    this.load.audio("shopMusic", shopMusic);
    this.load.audio("upgrade", upgradeSound);
    this.load.audio("error", errorSound);
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
      key: "dragon_animation",
      frames: this.anims.generateFrameNumbers("dragon"),
      frameRate: 6,
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

    this.anims.create({
      key: "beam2_animation",
      frames: this.anims.generateFrameNumbers("beam2"),
      frameRate: 20,
      repeat: -1
    })

    this.add.image(450, 300, "mainBackground");

    this.add.text(150, 150, "Cave Adventure", { fontFamily: 'Courier', fontSize: '70px', color: 'pink', strokeThickness: '2' });
    this.add.text(275, 370, "Move with up, down, left, right.", { fontSize: '18px', color: 'yellow' });
    this.add.text(275, 400, "Press spacebar to shoot.", { fontSize: '18px', color: 'yellow' });
    this.add.text(275, 430, "Press space to start.", { fontSize: '18px', color: 'yellow' });

    this.selectSound = this.sound.add("select_sound", { volume: 2 });
    this.menuMusic = this.sound.add("menuMusic", { volume: 0.3 });
    this.menuMusic.play();
  }

  update() {
    if (this.cursors.space.isDown) {
      this.selectSound.play();
      this.menuMusic.pause();

      this.scene.start('shop', {
        gold : 5000,
        hp : 100,
        beamLevel : 1});
    }
  }
}

export default MainMenu;