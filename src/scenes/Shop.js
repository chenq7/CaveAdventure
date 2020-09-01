import Phaser from "phaser";

let graphics;
let cursors;

class Shop extends Phaser.Scene {
  constructor() {
    super("shop");
  }

  init(data) {
    this.score = data.score;
  }

  create() {
    cursors = this.input.keyboard.createCursorKeys();

    graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(0, 0, 800, 600);

    this.add.text(325, 100, "Shop");
    this.add.text(325, 330, "Press space to start");

  }

  update() {

    if (cursors.space.isDown) {
      this.scene.start('game');
    }
  }
};

export default Shop;