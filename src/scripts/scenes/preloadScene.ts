export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("background", "assets/environment_forest_alt1.png");

    this.load.bitmapFont("letters", "assets/font.png", "assets/font.xml");

    this.load.spritesheet("egg", "assets/screenshot_1.png",{
      frameWidth: 200,
      frameHeight: 220
    });

    this.load.spritesheet("Bun", "assets/bunny-hop-spritesheet.png", {
      frameWidth: 48,
      frameHeight: 32
    });

    this.load.spritesheet("Poof", "assets/Poof.png", {
      frameWidth: 255,
      frameHeight: 250
    });

    this.load.spritesheet("Fox", "assets/fox-SWEN-bright.png", {
      frameWidth: 50,
      frameHeight: 75
    });

    this.load.spritesheet("grow", "assets/fox-SWEN-bright.png", {
      frameWidth: 50,
      frameHeight: 75
    });

    this.load.image("carrot", "assets/carrot.png");
  }

  create() {
    this.add.text(20, 20, "Working on it!!!");
    
    this.scene.start('MainScene');
  }
}
