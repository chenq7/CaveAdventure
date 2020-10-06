import Phaser from "phaser";
import WindSlash from "./WindSlash";


class Bat extends Phaser.GameObjects.Sprite {
  constructor(scene, xCoord, yCoord) {

    let x = xCoord;
    let y = yCoord;
    
    super(scene, x, y, "bat");

    scene.add.existing(this);

    this.setScale(1.5);
    this.play("bat_animation");
    scene.physics.world.enableBody(this);
    this.body.velocity.x = -150;

    scene.enemies.add(this);

    // this.slash = scene.sound.add("slash", { volume: 2 });
    this.fire = Math.random(100, 800) * 1000;
    this.isFired = false;
    this.hp = 3;
    this.damage = -47;
    this.value = 19;
  }

  update() {
    if (this.x < 0) {
      this.destroy();
    }

    if (this.x < this.fire && !this.isFired){
      // this.slash.play();
      new WindSlash(this.scene, this.x - 20, this.y);
      this.isFired = true;  
    }
  }

}

export default Bat;