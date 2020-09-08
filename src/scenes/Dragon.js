import Phaser from "phaser";

class Dragon extends Phaser.GameObjects.Sprite {
  constructor(scene, xCoord, yCoord) {

    let x = xCoord;
    let y = yCoord;

    super(scene, x, y, "dragon");

    scene.add.existing(this);

    // this.setScale(1.5);
    this.play("dragon_animation");
    scene.physics.world.enableBody(this);
    this.body.velocity.x = -150;

    scene.enemies.add(this);

    this.hp = 10;
  }

  update() {
    if (this.x < 0) {
      // this.scene.updateHp(-33);
      this.destroy();
    }
  }

}

export default Dragon;