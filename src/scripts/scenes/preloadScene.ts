export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    //add background 
    this.load.image("background", "assets/environment_forest_alt1.png");

    //add text font
    this.load.bitmapFont("letters", "assets/font.png", "assets/font.xml");

    //add bunny sprite
    this.load.spritesheet("Bun", "assets/bunny-hop-spritesheet.png", {
      frameWidth: 48,
      frameHeight: 32
    });

    //add fox sprite
    this.load.spritesheet("Fox", "assets/fox-SWEN-bright.png", {
      frameWidth: 50,
      frameHeight: 75
    });

    //add carrot image
    this.load.image("carrot", "assets/carrot.png");

    //add egg sprite
    this.load.spritesheet("egg", "assets/screenshot_1.png",{
      frameWidth: 200,
      frameHeight: 220
    });

    //add puff animation
    this.load.spritesheet("Poof", "assets/Poof.png", {
      frameWidth: 255,
      frameHeight: 250
    });
    
    //add skull puff animation
    this.load.spritesheet("skull", "assets/Skull.png",{
      frameWidth: 200,
      frameHeight: 300
    });

    //add growing carrot sprite
    this.load.spritesheet("grow", "assets/fox-SWEN-bright.png", {
      frameWidth: 50,
      frameHeight: 75
    });

    //add musics and sound effects
    this.load.audio("music", "assets/music.mp3");
    this.load.audio("winner", "assets/win.wav");
    this.load.audio("bell", "assets/pleasing-bell.wav");
    this.load.audio("warp", "assets/wave.wav");
    this.load.audio("pop", "assets/pop.ogg");
  }

  create() {
    //Tell user we're working on it
    this.add.text(20, 20, "Working on it!!!");
    //start the game
    this.scene.start('MainScene');
  }
}
