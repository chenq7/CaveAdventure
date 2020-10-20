import Phaser from "phaser";
import BossMissle from "./BossMissle";

class Boss extends Phaser.GameObjects.Sprite {
  constructor(scene, xCoord, yCoord) {

    let x = xCoord;
    let y = yCoord;

    super(scene, x, y, "boss");

    scene.add.existing(this);

    this.setScale(0.75);
    this.play("boss_animation");
    scene.physics.world.enableBody(this);

    scene.enemies.add(this);

    this.timer = 1;
    this.hp = 2000;
    this.damage = -171;
    this.value = 5000;
  }

  update() {
    if (this.x < 0 || this.hp <= 0) {
      this.destroy();
    }

    if (this.timer % 8 === 0){
      new BossMissle(this.scene, 600, 300, "missle1", this.randomInt(0, 160) - 80);
    }

    this.timer++;
  }

  randomInt(min, max){
    return Math.random() * (max - min + 1) + min; 
  }

}

export default Boss;