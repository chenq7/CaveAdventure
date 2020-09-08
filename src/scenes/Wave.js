import Phaser from "phaser";

let cursors;

class Wave extends Phaser.Scene {
  constructor() {
    super("wave");
  }

  init(data) {
    this.gold = data.gold;
    this.hp = data.hp;
    this.beamLevel = data.beamLevel;
    this.music = data.music;
  }

  create() {

    this.add.image(450, 300, "waveBackground");
    cursors = this.input.keyboard.createCursorKeys();
    let goldFormated = this.zeroPad(this.gold, 6);
    this.goldLabel = this.add.bitmapText(770, 27.5, "pixelFont", goldFormated, 25);
    this.add.image(860, 35, "scoreUp");
    this.add.text(275, 20, "Choose Your Adventure", { fontFamily: 'Courier', fontSize: '25px' });
    
    this.maxHpLabel = this.add.bitmapText(45, 27.5, "pixelFont", "HP " + this.hp, 25);

    this.wave1Border = this.add.sprite(273, 220, "border");
    this.wave1Border.setInteractive();
    this.add.text(185, 200, "Cave of Beasts");
    this.wave1Label = this.add.bitmapText(185, 225, "pixelFont", "Difficulty: 1", 25);

    this.wave2Border = this.add.sprite(623, 220, "border");
    this.wave2Border.setInteractive();
    this.add.text(535, 200, "Cave of Mystery");
    this.hpPriceLabel = this.add.bitmapText(535, 225, "pixelFont", "Difficult: 3", 25);

    this.wave3Border = this.add.sprite(273, 370, "border");
    this.wave3Border.setInteractive();
    this.add.text(185, 350, "Cave of Sorrow");
    this.hpPriceLabel = this.add.bitmapText(185, 375, "pixelFont", "Difficult: 6", 25);

    this.wave4Border = this.add.sprite(623, 370, "border");
    this.wave4Border.setInteractive();
    this.add.text(535, 350, "Cave of Horror");
    this.hpPriceLabel = this.add.bitmapText(535, 375, "pixelFont", "Difficult: 10", 25);


    this.startBorder = this.add.sprite(425, 505, "startBorder");
    this.startBorder.setInteractive();
    this.add.text(350, 490, "Back to Shop", { fontSize: "28px" });
    this.input.on('gameobjectdown', this.selectWave, this);
  }

  // 4.1 zero pad format function
  zeroPad(number, size) {
    let stringNumber = String(number);
    while (stringNumber.length < size) {
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
  }

  update() {
  }

  selectWave(pointer, gameObject) {
    if (gameObject.x === 273) {
      this.music.pause();
      this.scene.start('game', {
        gold: this.gold,
        hp: this.hp,
        beamLevel: this.beamLevel,
        wave: 1 
      });
    } else if (gameObject.x === 623) {
      this.music.pause();
      this.scene.start('game', {
        gold: this.gold,
        hp: this.hp,
        beamLevel: this.beamLevel,
        wave: 2
      });
    } else if (gameObject.x === 425) {
      this.scene.start('shop', {
        gold: this.gold,
        hp: this.hp,
        beamLevel: this.beamLevel,
        music: this.music
      });
    }   
  }
};

export default Wave;