import Phaser from "phaser";

class FireBlast extends Phaser.GameObjects.Sprite {
  constructor(scene, xCoord, yCoord) {

    let x = xCoord;
    let y = yCoord;

    super(scene, x, y, "fireBlast");
    this.setScale(0.15);
    scene.add.existing(this);

    scene.physics.world.enableBody(this);
    scene.enemyProjectiles.add(this);

    this.damage = -91;
    this.body.velocity.x = -250;
  }

  update() {
    if (this.x < 0) {
      this.destroy();
    }
  }
}

export default FireBlast;