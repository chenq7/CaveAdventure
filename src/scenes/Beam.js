import Phaser from "phaser";

class Beam extends Phaser.GameObjects.Sprite {
  constructor(scene, xCoord, yCoord){

    // let x = scene.player.x + 16;
    // let y = scene.player.y;
    let x = xCoord;
    let y = yCoord;

    super(scene, x, y, "beam");

    scene.add.existing(this);

    this.setScale(1.5);
    this.play("beam_animation");
    scene.physics.world.enableBody(this);
    this.body.velocity.x = 450;

    scene.projectiles.add(this);
  }

  update() {
    if (this.x > 900) {
      this.destroy();
    }
  }
}

export default Beam;