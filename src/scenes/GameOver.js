import Phaser from "phaser";

let graphics;
let keyC;

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
    keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

    graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(0, 0, 800, 600);

    this.add.text(325, 300, this.text);
    this.add.text(325, 330, `You managed to loot ${this.score} gold`);
    this.add.text(325, 360, "Press c to continue.");

  }

  update() {

    if (keyC.isDown) {
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