import Phaser from "phaser";

let powerupType = "";

class PowerUp extends Phaser.GameObjects.Sprite {
  constructor(scene, type) {

    let x = Math.random(20, 850) * 1000;
    let y = 0;

    powerupType = type;
    super(scene, x, y, type);

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

  powerupType() {
    return powerupType;
  }
}

export default PowerUp;