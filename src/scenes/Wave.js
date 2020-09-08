import Phaser from "phaser";

let cursors;

class Wave extends Phaser.Scene {
  constructor() {
    super("wave");
  }

  init(data) {
    this.gold = data.gold;
    this.hp = data.hp;
    this.beamLevel = data.beamLevel;
  }

  create() {

    
  }

  update() {

    if (cursors.space.isDown) {
      this.scene.start('game', {
        gold: this.gold,
        hp: this.hp,
        beamLevel: this.beamLevel
      });
    }
  }
  
};

export default Wave;