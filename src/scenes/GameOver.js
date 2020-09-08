import Phaser from "phaser";

let graphics;
let cursors;

class GameOver extends Phaser.Scene {
  constructor() {
    super("gameover");
  }

  init(data){
    this.score = data.score;
    this.gold = data.gold;
    this.hp = data.hp;
    this.beamLevel = data.beamLevel;
  }

  create() {
    cursors = this.input.keyboard.createCursorKeys();

    graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(0, 0, 800, 600);

    this.add.text(325, 300, "Game Over");
    this.add.text(325, 330, `You have been awarded ${this.score} gold!`);
    this.add.text(325, 345, "Press space to continue.");

  }

  update() {

    if (cursors.space.isDown) {
      this.scene.start('shop', {
        gold: this.gold + this.score,
        hp: this.hp,
        beamLevel: this.beamLevel
      });
    }
  }
};

export default GameOver;