import Phaser from "phaser";

class PowerUp extends Phaser.GameObjects.Sprite {
  constructor(scene, type) {

    let x = Math.random(20, 850);

    super(scene, x, 0, type);

    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    this.body.velocity.y = 70;

    scene.powerups.add(this);
  }

  update() {
    if (this.y > 600) {
      this.destroy();
    }
  }
}

export default PowerUp;