import Phaser from "phaser";

class BossMissle extends Phaser.GameObjects.Sprite {
  constructor(scene, xCoord, yCoord, missleType, yDir) {

    let x = xCoord;
    let y = yCoord;

    super(scene, x, y, missleType);

    scene.add.existing(this);

    if (missleType === "missle1") {
      this.setScale(0.7);
    } else {
      this.setScale(0.6);
    }
    
    scene.physics.world.enableBody(this);
    scene.enemyProjectiles.add(this);

    this.body.velocity.x = -150;
    this.body.velocity.y = yDir;
    this.damage = -99;
  }

  update() {
    if (this.x < 0) {
      this.destroy();
    }
  }
}

export default BossMissle;