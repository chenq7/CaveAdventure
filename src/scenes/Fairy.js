import Phaser from "phaser";
import BossMissle from "./BossMissle";

class Fairy extends Phaser.GameObjects.Sprite {
  constructor(scene, xCoord, yCoord, position) {

    let x = xCoord;
    let y = yCoord;

    super(scene, x, y, "fairy");

    scene.add.existing(this);

    this.setScale(0.4);
    this.play("fairy_animation");
    scene.physics.world.enableBody(this);

    scene.enemies.add(this);

    this.yDir = Math.random() * 51;
    if (position === "bottom") this.yDir = -this.yDir;
    this.timer = 1;
    this.hp = 100;
    this.damage = -171;
    this.value = 500;
  }

  update() {
    if (this.x < 0) {
      this.destroy();
    }

    if (this.timer % 300 === 0) {
      new BossMissle(this.scene, this.x - 50, this.y, "missle2", this.yDir);
    }

    this.timer++;
  }

}

export default Fairy;