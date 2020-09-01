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

    let gold = Math.floor(this.score / 10);
    this.gold += gold;

    this.add.text(325, 300, "Game Over");
    this.add.text(325, 315, `You score is ${this.score}`);
    this.add.text(325, 330, `You have been awarded ${gold} gold!`);
    this.add.text(325, 345, "Press space to continue.");

  }

  update() {

    if (cursors.space.isDown) {
      this.scene.start('shop', {
        gold: this.gold,
        hp: this.hp,
        beamLevel: this.beamLevel
      });
    }
  }
};

export default GameOver;