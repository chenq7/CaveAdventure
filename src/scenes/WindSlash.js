import Phaser from "phaser";

class WindSlash extends Phaser.GameObjects.Sprite {
  constructor(scene, xCoord, yCoord) {

    let x = xCoord;
    let y = yCoord;

    super(scene, x, y, "windSlash");

    scene.add.existing(this);

    scene.physics.world.enableBody(this);
    scene.enemyProjectiles.add(this);

    this.body.velocity.x = -250;
  }

  update() {
    if (this.x < 0) {
      this.destroy();
    }
  }
}

export default WindSlash;