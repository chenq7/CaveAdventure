import Phaser from "phaser";

let cursors;

class Shop extends Phaser.Scene {
  constructor() {
    super("shop");
  }

  init(data) {
    this.gold = data.gold;
    this.hp = data.hp;
    this.beamLevel = data.beamLevel;
    if (data.music){
      this.music = data.music;
    } else {
      this.music = this.sound.add("shopMusic", { volume: 0.3 });
      this.music.play();
    }
  }

  create() {

    this.add.image(450, 300, "shopBackground");

    cursors = this.input.keyboard.createCursorKeys();
    this.errorSound = this.sound.add("error", { volume: 0.5 });
    this.upgradeSound = this.sound.add("upgrade", { volume: 0.4 });

    let goldFormated = this.zeroPad(this.gold, 6);
    this.goldLabel = this.add.bitmapText(770, 27.5, "pixelFont", goldFormated, 25);
    this.add.image(860, 35, "scoreUp");
    this.add.text(415, 20, "SHOP", { fontFamily: 'Courier', fontSize: '30px'});
    
    this.maxHpLabel = this.add.bitmapText(45, 27.5, "pixelFont", "HP " + this.hp, 25);
    
    this.bulletBorder = this.add.sprite(273, 220, "border");
    this.bulletBorder.setInteractive();
    this.bulletPrice = this.beamLevel * 1000;
    let bulletFormated = this.zeroPad(this.bulletPrice, 5);
    this.add.text(185, 200, "Bullet Level ");
    this.add.image(370, 233, "scoreUp");
    this.bulletPriceLabel = this.add.bitmapText(185, 225, "pixelFont", "Upgrade for " + bulletFormated, 25);

    this.hpBorder = this.add.sprite(623, 220, "border");
    this.hpBorder.setInteractive();
    this.hpPrice = this.hp * 10;
    let hpFormated = this.zeroPad(this.hpPrice, 5);
    this.add.text(535, 200, "Max HP ");
    this.hpPriceLabel = this.add.bitmapText(535, 225, "pixelFont", "Upgrade for " + hpFormated, 25);
    this.add.image(720, 233, "scoreUp");

    this.startBorder = this.add.sprite(425, 505, "startBorder");
    this.startBorder.setInteractive();
    this.add.text(270, 490, "Click here to start", { fontSize: "28px" });

    this.input.on('gameobjectdown', this.buyUpgrade, this);
    this.bulletLabel = this.add.bitmapText(322, 200, "pixelFont", this.beamLevel, 25);
    this.hpLabel = this.add.bitmapText(620, 200, "pixelFont", this.hp, 25);

  }

  update() {

  }

  // 4.1 zero pad format function
  zeroPad(number, size) {
    let stringNumber = String(number);
    while (stringNumber.length < size) {
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
  }

  buyUpgrade(pointer, gameObject){
    if (gameObject.x === 273){
      if (this.gold > this.bulletPrice){
        this.gold -= this.bulletPrice;
        this.bulletPrice += 1000;
        this.beamLevel += 1;
        this.goldLabel.text = this.zeroPad(this.gold, 6);
        this.bulletPriceLabel.text = "Upgrade for " + this.zeroPad(this.bulletPrice, 5);
        this.bulletLabel.text = this.beamLevel;
        this.upgradeSound.play();
      } else {
        this.errorSound.play();
      }
    } else if (gameObject.x === 623) {
      if (this.gold > this.hpPrice) {
        this.gold -= this.hpPrice;
        this.hpPrice += 1000;
        this.hp += 100;
        this.goldLabel.text = this.zeroPad(this.gold, 6);
        this.hpPriceLabel.text = "Upgrade for " + this.zeroPad(this.hpPrice, 5);
        this.hpLabel.text = this.hp;
        this.maxHpLabel.text = "HP " + this.hp;
        this.upgradeSound.play();
      } else {
        this.errorSound.play();
      }
    } else if (gameObject.x === 425) {
      this.scene.start('wave', {
        gold: this.gold,
        hp: this.hp,
        beamLevel: this.beamLevel,
        music: this.music
      });
    }   
  }
};

export default Shop;