import Phaser from "phaser";

let graphics;
let cursors;

class WinScreen extends Phaser.Scene {
  constructor() {
    super("winscreen");
  }
  
  create() {
    cursors = this.input.keyboard.createCursorKeys();

    graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(0, 0, 800, 600);

    this.add.text(275, 300, "You win! Press space to restart.")
  }

  update() {

    if (cursors.space.isDown) {
      this.scene.start('mainmenu');
    }
  }
};

export default WinScreen;