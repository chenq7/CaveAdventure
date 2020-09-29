import Phaser from "phaser";

let graphics;
let cursors;

class GameOver extends Phaser.Scene {
  constructor() {
    super("gameover");
  }

  init(data){
    this.text = data.text;
    this.score = data.score;
    this.gold = data.gold;
    this.hp = data.hp;
    this.beamLevel = data.beamLevel;
    this.petLevel = data.petLevel;
    this.regenLevel = data.regenLevel;
  }

  create() {
    cursors = this.input.keyboard.createCursorKeys();

    graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(0, 0, 800, 600);

    this.add.text(325, 300, this.text);
    this.add.text(325, 330, `You managed to loot ${this.score} gold`);
    this.add.text(325, 360, "Press space to continue.");

  }

  update() {

    if (cursors.space.isDown) {
      this.scene.start('shop', {
        gold: this.gold + this.score,
        hp: this.hp,
        beamLevel: this.beamLevel,
        petLevel: this.petLevel,
        regenLevel: this.regenLevel
      });
    }
  }
};

export default GameOver;