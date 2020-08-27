import Phaser from "phaser";

class Beam extends Phaser.GameObjects.Sprite {
  constructor(scene, xCoord, yCoord, beamType, direction){

    // let x = scene.player.x + 16;
    // let y = scene.player.y;
    let x = xCoord;
    let y = yCoord;

    super(scene, x, y, beamType);

    scene.add.existing(this);

    if (beamType === "beam"){
      this.setScale(1.5);
      this.play("beam_animation");
    } else {
      this.setScale(2);
      this.play("beam2_animation");
    }

    scene.physics.world.enableBody(this);
    scene.projectiles.add(this);

    this.direction = direction;
    this.beamType = beamType;
    
    if (this.direction === "topRight") this.body.velocity.y = -200;
    if (this.direction === "bottomRight") this.body.velocity.y = 200;
    this.body.velocity.x = 450;
  }

  update() {
    if (this.x > 900 || this.y < 0 || this.y > 600) {
      this.destroy();
    }
  }
}

export default Beam;