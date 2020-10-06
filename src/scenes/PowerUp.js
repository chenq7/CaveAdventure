import Phaser from "phaser";

class PowerUp extends Phaser.GameObjects.Sprite {
  constructor(scene, type) {

    let x = Math.random(20, 750) * 1000;
    let y = 0;

    super(scene, x, y, type);

    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    this.body.velocity.y = 70;

    scene.powerups.add(this);
    this.powerupType = type;
  }

  update() {
    if (this.y > 600) {
      this.destroy();
    }
  }

}

export default PowerUp;