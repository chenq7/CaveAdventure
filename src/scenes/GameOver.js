import Phaser from "phaser";

let graphics;
let cursors;

class GameOver extends Phaser.Scene {
  constructor() {
    super("gameover");
  }

  init(data){
    this.score = data.score;
  }

  create() {
    cursors = this.input.keyboard.createCursorKeys();

    graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(0, 0, 800, 600);

    this.add.text(325, 300, "Game Over");
    this.add.text(325, 315, `You score is ${this.score}`);
    this.add.text(325, 330, "Press space to restart.");

  }

  update() {

    if (cursors.space.isDown) {
      this.scene.start('mainmenu');
    }
  }
};

export default GameOver;