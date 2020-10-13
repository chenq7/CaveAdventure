import Phaser from "phaser";
import cave1 from "../assets/images/cave1.jpg";
import cave2 from "../assets/images/cave2.jpg";
import cave3 from "../assets/images/cave3.jpg";
import cave4 from "../assets/images/cave4.jpg";
import character from "../assets/images/character.png";
import pet from "../assets/images/pet.png";
import windSlash from "../assets/images/windSlash.png";
import fireBlast from "../assets/images/fireBlast.png";
import iceShard from "../assets/images/iceshard.png";
import icicle from "../assets/images/icicle.png";
import darkBullet from "../assets/images/darkBullet.png";
import missle1 from "../assets/images/missle1.png";
import missle2 from "../assets/images/missle2.png";
import bat from "../assets/sprites/bats.png";
import dragon from "../assets/sprites/dragon.png";
import golem from "../assets/sprites/golem.png";
import wraith from "../assets/sprites/wraith.png";
import fairy from "../assets/sprites/fairy.png";
import boss from "../assets/sprites/boss.png";
import beam from "../assets/sprites/beam.png";
import beam2 from "../assets/sprites/beam2.png";
import beam3 from "../assets/sprites/beam3.png";
import beam4 from "../assets/sprites/beam4.png";
import explosion from "../assets/sprites/explosion.png";
import fontFile from "../assets/font/font.xml";
import fontImage from "../assets/font/font.png";
import beamSound from "../assets/sound/beam.mp3";
import selectSound from "../assets/sound/select.wav";
import menuMusic from "../assets/sound/I miss you.mp3";
import music1 from "../assets/sound/music1.mp3";
import music2 from "../assets/sound/music2.mp3";
import music3 from "../assets/sound/music3.mp3";
import music4 from "../assets/sound/music4.mp3";
import shopMusic from "../assets/sound/lost souls.mp3";
import explodeSound from "../assets/sound/explosion.mp3";
import pickupSound from "../assets/sound/pickup.mp3";
import upgradeSound from "../assets/sound/upgrade.mp3";
import slash from "../assets/sound/slash.mp3";
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
    this.load.image("cave1", cave1);
    this.load.image("cave2", cave2);
    this.load.image("cave3", cave3);
    this.load.image("cave4", cave4);
    this.load.image("shopBackground", shopBackground);
    this.load.image("waveBackground", waveBackground);
    this.load.image("mainBackground", mainBackground);
    this.load.image("healthUp", healthUp);
    this.load.image("scoreUp", scoreUp);
    this.load.image("powerUp", powerUp);
    this.load.image("windSlash", windSlash);
    this.load.image("iceShard", iceShard);
    this.load.image("fireBlast", fireBlast);
    this.load.image("icicle", icicle);
    this.load.image("darkBullet", darkBullet);
    this.load.image("missle1", missle1);
    this.load.image("missle2", missle2);

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

    this.load.spritesheet("pet", pet, {
      frameWidth: 34,
      frameHeight: 40
    }); 

    this.load.spritesheet("bat", bat, {
      frameWidth: 27,
      frameHeight: 27
    });

    this.load.spritesheet("dragon", dragon, {
      frameWidth: 177,
      frameHeight: 126
    });

    this.load.spritesheet("golem", golem, {
      frameWidth: 172.8,
      frameHeight: 150
    });

    this.load.spritesheet("wraith", wraith, {
      frameWidth: 103,
      frameHeight: 83
    });

    this.load.spritesheet("boss", boss, { 
      frameWidth: 605,
      frameHeight: 707
    });

    this.load.spritesheet("fairy", fairy, {
      frameWidth: 125,
      frameHeight: 141
    });

    this.load.spritesheet("explosion", explosion, {
      frameWidth: 16,
      frameHeight: 16
    })

    this.load.spritesheet("beam", beam, {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet("beam2", beam2, {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet("beam3", beam3, {
      frameWidth: 12,
      frameHeight: 12,
    }); 

    this.load.spritesheet("beam4", beam4, {
      frameWidth: 12,
      frameHeight: 12,
    });

    this.load.bitmapFont("pixelFont", fontImage, fontFile);

    this.load.audio("beam_sound", beamSound);
    this.load.audio("explode_sound", explodeSound);
    this.load.audio("pickup_sound", pickupSound);
    this.load.audio("select_sound", selectSound);
    this.load.audio("menuMusic", menuMusic);
    this.load.audio("music1", music1);
    this.load.audio("music2", music2);
    this.load.audio("music3", music3);
    this.load.audio("music4", music4);
    this.load.audio("shopMusic", shopMusic);
    this.load.audio("upgrade", upgradeSound);
    this.load.audio("error", errorSound);
    this.load.audio("slash", slash);
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: "bat_animation",
      frames: this.anims.generateFrameNumbers("bat"),
      frameRate: 8,
      repeat: -1
    })

    this.anims.create({
      key: "dragon_animation",
      frames: this.anims.generateFrameNumbers("dragon"),
      frameRate: 4,
      repeat: -1
    })

    this.anims.create({
      key: "golem_animation",
      frames: this.anims.generateFrameNumbers("golem"),
      frameRate: 1.5,
      repeat: -1
    })

    this.anims.create({
      key: "wraith_animation",
      frames: this.anims.generateFrameNumbers("wraith"),
      frameRate: 5,
      repeat: -1
    })

    this.anims.create({
      key: "boss_animation",
      frames: this.anims.generateFrameNumbers("boss"),
      frameRate: 0.3,
      repeat: -1
    })

    this.anims.create({
      key: "fairy_animation",
      frames: this.anims.generateFrameNumbers("fairy"),
      frameRate: 3,
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

    this.anims.create({
      key: "beam3_animation",
      frames: this.anims.generateFrameNumbers("beam3"),
      frameRate: 20,
      repeat: -1
    })

    this.anims.create({
      key: "beam4_animation",
      frames: this.anims.generateFrameNumbers("beam4"),
      frameRate: 20,
      repeat: -1
    })

    this.add.image(450, 300, "mainBackground");

    this.add.text(150, 150, "Cave Adventure", { fontFamily: 'Courier', fontSize: '70px', color: 'pink', strokeThickness: '2' });
    this.add.text(275, 370, "Move with up, down, left, right.", { fontSize: '18px', color: 'yellow' });
    this.add.text(275, 400, "Press spacebar to shoot.", { fontSize: '18px', color: 'yellow' });
    this.add.text(275, 430, "Press space to start.", { fontSize: '18px', color: 'yellow' });

    this.selectSound = this.sound.add("select_sound", { volume: 1 });
    this.menuMusic = this.sound.add("menuMusic", { volume: 0.2 });
    this.menuMusic.play();
  }

  update() {
    if (this.cursors.space.isDown) {
      this.selectSound.play();
      this.menuMusic.pause();

      this.scene.start('shop', {
        gold: 2000,
        hp: 100,
        beamLevel: 1,
        petLevel: 1,
        regenLevel: 1
      });
    }
  }
}

export default MainMenu;