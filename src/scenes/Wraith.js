import Phaser from "phaser";
import DarkBullet from "./DarkBullet";

class Wraith extends Phaser.GameObjects.Sprite {
  constructor(scene, xCoord, yCoord) {

    let x = xCoord;
    let y = yCoord;

    super(scene, x, y, "wraith");

    scene.add.existing(this);

    this.setScale(0.6);
    this.play("wraith_animation");
    scene.physics.world.enableBody(this);
    this.body.velocity.x = -100;

    scene.enemies.add(this);

    this.fire = Math.random(100, 800) * 1000;
    this.isFired = false;
    this.hp = 35;
    this.damage = -121;
    this.value = 262;
  }

  update() {
    if (this.x < 0 || this.hp <= 0) {
      this.destroy();
    }

    if (this.x < this.fire && !this.isFired) {
      new DarkBullet(this.scene, this.x - 50, this.y - 50, "topLeft");
      new DarkBullet(this.scene, this.x - 50, this.y - 50, "topRight");
      this.isFired = true;
    }
  }

}

export default Wraith;