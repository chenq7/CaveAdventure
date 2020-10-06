import Phaser from "phaser";
import FireBlast from "./FireBlast";

class Dragon extends Phaser.GameObjects.Sprite {
  constructor(scene, xCoord, yCoord) {

    let x = xCoord;
    let y = yCoord;

    super(scene, x, y, "dragon");

    scene.add.existing(this);

    this.setScale(0.75);
    this.play("dragon_animation");
    scene.physics.world.enableBody(this);
    this.body.velocity.x = -125;

    scene.enemies.add(this);

    this.fire = Math.random(100, 800) * 1000;
    this.isFired = false;
    this.hp = 25;
    this.damage = -71;
    this.value = 51;
  }

  update() {
    if (this.x < 0) {
      // this.scene.updateHp(-33);
      this.destroy();
    }

    if (this.x < this.fire && !this.isFired) {
      // this.slash.play();
      new FireBlast(this.scene, this.x - 80, this.y + 20);
      this.isFired = true;
    }
  }

}

export default Dragon;