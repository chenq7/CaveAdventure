import Phaser from "phaser";

let graphics;
let cursors;

class WinScreen extends Phaser.Scene {
  constructor() {
    super("winscreen");
  }
  
  init(data) {
    this.score = data.score;
  }
  
  create() {
    cursors = this.input.keyboard.createCursorKeys();

    graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(0, 0, 800, 600);

    this.add.text(350, 300, "You win!");
    this.add.text(350, 315, `You score is ${this.score}`);
    this.add.text(350, 330, "Press space to restart.");
  }

  update() {

    if (cursors.space.isDown) {
      this.scene.start('mainmenu');
    }
  }
};

export default WinScreen;