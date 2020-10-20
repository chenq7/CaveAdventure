import Phaser from "phaser";
import Icicle from "./Icicle";

class Golem extends Phaser.GameObjects.Sprite {
  constructor(scene, xCoord, yCoord) {

    let x = xCoord;
    let y = yCoord;

    super(scene, x, y, "golem");

    scene.add.existing(this);

    this.setScale(0.6);
    this.play("golem_animation");
    scene.physics.world.enableBody(this);
    this.body.velocity.x = -30;

    scene.enemies.add(this);

    this.timer = 1;
    this.hp = 22;
    this.damage = -81;
    this.value = 123;
  }

  update() {
    if (this.x < 0 || this.hp <= 0) {
      this.destroy();
    }

    if (this.timer % 160 === 0) {
      new Icicle(this.scene);
    }
    this.timer++;
  }

}

export default Golem;