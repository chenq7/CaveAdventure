import Phaser from "phaser";
import mp3 from "../assets/Orbital\ Colossus.mp3";
import background from "../assets/background.png";
import tiles from "../assets/scifi_platformTiles_32x32.png";
import star from "../assets/star.png";
import bullet from "../assets/bullet.png";
import { accelerate, decelerate } from "../utils";

let box;
let cursors;

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: 'game' });
    window.GAME = this;
  },
  preload: function preload() {
    this.load.image("background", background);

    this.load.spritesheet('tiles', tiles, {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.image("star", star);
    this.load.image("bullet", bullet);
  },
  create: function create() {
    this.add.image(400, 300, "background");

    const stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setScale: {x: 0.2, y: 0.2 },
      setXY: { x:400, y: 300 }
    });

    stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      child.setVelocityX(150 - Math.random() * 300);
      child.setVelocityY(150 - Math.random() * 300);
      child.setBounce(1, 1);
      child.setCollideWorldBounds(true);
    });

    cursors = this.input.keyboard.createCursorKeys();

    box = this.physics.add.image(400, 100, "tiles", 15);

    const processCollision = (box, star) => {
      star.destroy();
      const starsLeft = stars.countActive();
      if (starsLeft === 0) {
        this.scene.start('winscreen');
      }
    }

    this.physics.add.collider(
      stars,
      box,
      processCollision,
      null,
      this
    );


    box.setBounce(1, 1);
    box.setCollideWorldBounds(true);
  },
  update: function () {
    const { velocity } = box.body;

    if (cursors.space.isDown) {
 
      const bullets = this.physics.add.group({
        key: 'bullet',
        setScale: { x: 1, y: 1 },
        setXY: { x: box.x + 50, y: box.y },
      });

      bullets.children.iterate(function (child) {
        child.setVelocityX(250);
        // child.setCollideWorldBounds(true);
        child.checkWorldBounds = true;
        child.outOfBoundsKill = true;
      });
    }

    if (cursors.up.isDown) box.setVelocityY(accelerate(velocity.y, -1));
    if (cursors.right.isDown) box.setVelocityX(accelerate(velocity.x, 1));
    if (cursors.down.isDown) box.setVelocityY(accelerate(velocity.y, 1));
    if (cursors.left.isDown) box.setVelocityX(accelerate(velocity.x, -1));
  }
});