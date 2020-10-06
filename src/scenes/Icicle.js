import Phaser from "phaser";

class Icicle extends Phaser.GameObjects.Sprite {
  constructor(scene) {

    let x = Math.random(20, 600) * 1000;
    let y = 0;

    super(scene, x, y, "icicle");

    scene.add.existing(this);

    scene.physics.world.enableBody(this);
    scene.enemyProjectiles.add(this);
    this.setScale(0.3);

    this.body.velocity.y = 300;
    this.damage = -81;
  }

  update() {
    if (this.y > 600) {
      this.destroy();
    }
  }
}

export default Icicle;