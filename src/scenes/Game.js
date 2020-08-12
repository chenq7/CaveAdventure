import Phaser from "phaser";
import mp3 from "../assets/Orbital\ Colossus.mp3";
import background from "../assets/background.png";
import character from "../assets/character.png";
import bat from "../assets/bat.png";
import bullet from "../assets/bullet.png";
import { accelerate, decelerate } from "../utils";

let player;
let cursors;
let bullets;
let spacebar;
let time = 0;
let bats;
let enemies = 90;
let moveSpd = 300;

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: 'game' });
    window.GAME = this;
  },
  preload: function preload() {
    this.load.image("background", background);

    this.load.spritesheet('character', character, {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.image("bat", bat);
    this.load.image("bullet", bullet);
  },
  create: function create() {
    this.add.image(400, 300, "background");

    bats = this.physics.add.group({
      key: 'bat',
      repeat: 15,
      setScale: {x: 0.2, y: 0.2 },
      setXY: { x:750, y: 300 }
    });

    bats.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      child.setVelocityX(150 - Math.random() * 300);
      child.setVelocityY(150 - Math.random() * 300);
      child.setBounce(1, 1);
      child.setCollideWorldBounds(true);
    });

    cursors = this.input.keyboard.createCursorKeys();
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


    player = this.physics.add.image(400, 100, "character", 15);

    const processCollision = (player, bat) => {
      bat.destroy();
      const batsLeft = bats.countActive();
      enemies--;
      if (enemies === 0) {
        this.scene.batt('winscreen');
      }
    }

    this.physics.add.collider(
      bats,
      player,
      processCollision,
      null,
      this
    );

    // player.setBounce(1, 1);
    player.setCollideWorldBounds(true);
  },
  update: function () {

    if (time > 0 && time % 200 === 0){
      bats = this.physics.add.group({
        key: 'bat',
        repeat: 15,
        setScale: { x: 0.2, y: 0.2 },
        setXY: { x: 750, y: 300 }
      });

      bats.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setVelocityX(150 - Math.random() * 300);
        child.setVelocityY(150 - Math.random() * 300);
        child.setBounce(1, 1);
        child.setCollideWorldBounds(true);
      });
    }

    time += 1;

    if (Phaser.Input.Keyboard.JustDown(spacebar)) {
 
      bullets = this.physics.add.group({
        key: 'bullet',
        setScale: { x: 1, y: 1 },
        setXY: { x: player.x + 50, y: player.y },
      });

      bullets.children.iterate(function (child) {
        child.setVelocityX(250);
        // child.setCollideWorldBounds(true);
        child.checkWorldBounds = true;
        child.outOfBoundsKill = true;
      });
    }

    player.setDrag(2000);
    if (cursors.up.isDown) player.setVelocityY(-moveSpd);
    if (cursors.right.isDown) player.setVelocityX(moveSpd);
    if (cursors.down.isDown) player.setVelocityY(moveSpd);
    if (cursors.left.isDown) player.setVelocityX(-moveSpd);

  }
});