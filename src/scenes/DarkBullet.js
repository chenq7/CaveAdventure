import Phaser from "phaser";

class DarkBullet extends Phaser.GameObjects.Sprite {
  constructor(scene, xCoord, yCoord, direction) {

    let x = xCoord;
    let y = yCoord;

    super(scene, x, y, "darkBullet");

    scene.add.existing(this);

    scene.physics.world.enableBody(this);
    scene.enemyProjectiles.add(this);
    this.setScale(0.4);

    if (direction === "topLeft") this.body.velocity.y = -10;
    if (direction === "bottomLeft") this.body.velocity.y = 10;
    this.body.velocity.x = -250;
    this.damage = -121;
  }

  update() {
    if (this.x < 0) {
      this.destroy();
    }
  }
}

export default DarkBullet;