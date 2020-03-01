import ExampleObject from '../objects/exampleObject';
import Egg from '../objects/Egg';
import SideEgg from '../objects/SideEgg';
import hurt from '../objects/hurt';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;

  //carrots 1-3
  private food; 
  private food2;
  private food3;
  //carrot group
  private veggies;
  
  //player character
  public bunny;
  //fox character
  private enemy;
  //Eggs group
  private eggs;

  //Arrow keys, plus space and shift
  public cursorKeys;

  //Tracks direction the rabbit is facing
  private flag;
  
  //Text displaying score
  private scoreLabel;
  //The score
  private score;
  //Text displayd upon win
  private winlabel;
  //Tracks if player has won
  private winner: boolean;
  
  //general background music
  private bgmusic;
  //sound when carrot is eaten
  private carrotmusic;
  //teleporting sound upon injury to rabbit
  private warpSound;
  //sound when firing eggs
  private popSound;
  //sound upon win
  private winSound;
  

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {

    //set up background
    let bg = this.add.image(0, 0, "background");
    bg.setOrigin(0, 0);

    //sound effect set-up
    this.bgmusic = this.sound.add("music");
    this.warpSound = this.sound.add("warp");
    this.popSound = this.sound.add("pop");
    this.winSound = this.sound.add("winner");
    this.carrotmusic = this.sound.add("bell");
    //music config for background music
    var musicConfig = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay:0
    };
    //play background music
    this.bgmusic.play(musicConfig);
    
    //set up scoreboard
    this.scoreLabel = this.add.bitmapText(10, 5, "letters", "SCORE ", 16);
    //start score at zero
    this.score = 0;
    //begin as not winning
    this.winner = false;

    //create bunny, add bounds, and set hitbox to more appropriate size
    this.bunny = this.physics.add.sprite(200, 200, "Bun");
    this.bunny.setCollideWorldBounds(true);
    this.bunny.body.setSize(30, 48, true);

    //start with rabbit facing left
    this.flag = 1;

    //create fox, set bounds, set movement, and adjust size of sprite and hitbox
    this.enemy = this.physics.add.sprite(400, 400, "Fox");
    this.enemy.setCollideWorldBounds(true);
    this.enemy.setVelocity(100, 100);
    this.enemy.setBounce(1);
    this.enemy.setScale(2);
    this.enemy.body.setSize(5, 15, true);
    
    //bunny hop left animation
    this.anims.create({
      key: "bunHopL",
      frames: this.anims.generateFrameNumbers("Bun", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    //bunny hop right animation
    this.anims.create({
      key: "bunHopR",
      frames: this.anims.generateFrameNumbers("Bun", { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1
    });

    //Bunny sits facing left
    this.anims.create({
      key: "bunHopSL",
      frames: this.anims.generateFrameNumbers("Bun", { start: 0, end: 0 }),
      frameRate: 10,
      repeat: 0
    });

    //Bunny sits facing right
    this.anims.create({
      key: "bunHopSR",
      frames: this.anims.generateFrameNumbers("Bun", { start: 7, end: 7 }),
      frameRate: 10,
      repeat: 0
    });

    //fox running animation
    this.anims.create({
      key: "foxRun",
      frames: this.anims.generateFrameNumbers("Fox", {start: 0, end: 1}),
      frameRate: 10,
      repeat: -1
    });

    //Poof animation for carrots
    this.anims.create({
      key: "POOFER",
      frames: this.anims.generateFrameNumbers("Poof", { start: 0, end: 20 }),
      frameRate: 30,
      repeat: 0,
      hideOnComplete: false
    });

    //Poof animation for fox
    this.anims.create({
      key: "POOFERWIN",
      frames: this.anims.generateFrameNumbers("Poof", { start: 0, end: 20 }),
      frameRate: 30,
      repeat: 0,
      hideOnComplete: true
    });

    //Poof animation for bunny
    this.anims.create({
      key: "Perish",
      frames: this.anims.generateFrameNumbers("skull", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: 0,
      hideOnComplete: true
    });

    //Growing carrot animation (unused)
    this.anims.create({
      key: "reCarrot",
      frames: this.anims.generateFrameNumbers("grow", { start: 0, end: 5 }),
      frameRate: 2,
      repeat: -1,
      hideOnComplete: false
    });

    //set up carrot 1
    this.food = this.add.sprite(250, 250, "carrot");
    this.food.setScale(0.25);
    this.physics.add.existing(this.food, false);
    this.food.body.setSize(40, 40, 0, 5);
    
    //set up carrot 2
    this.food2 = this.add.sprite(250, 250, "carrot");
    this.food2.setScale(0.25);
    this.physics.add.existing(this.food2, false);
    this.food2.body.setSize(40, 40, 0, 5);

    //set up carrot 3
    this.food3 = this.add.sprite(250, 250, "carrot");
    this.food3.setScale(0.25);
    this.physics.add.existing(this.food3, false);
    this.food3.body.setSize(40, 40, 0, 5);

    //set up group for carrots
    this.veggies = this.physics.add.group();
    this.veggies.add(this.food);
    this.veggies.add(this.food2);
    this.veggies.add(this.food3);
    
    //set up group for eggs
    this.eggs = this.physics.add.group();

    //Add carrot-eating overlap
    this.physics.add.overlap(this.bunny, this.veggies, this.eatCarrot, this.eatCarrot, this);

    //Add fox attack overlap
    this.physics.add.overlap(this.bunny, this.enemy, this.takeDamage, this.takeDamage, this);

    //Add fox-egg overlap
    this.physics.add.overlap(this.eggs, this.enemy, this.win, this.win, this);

    //Add arrow keys plus space and shift
    this.cursorKeys = this.input.keyboard.createCursorKeys();
  }


  //carrot moving function
  moveCarrot(veggie, speed){
    //carrot advances
    veggie.x += speed;
    //if at end of screen, back to start
    if(veggie.x > 800){
      this.resetObj(veggie);
    }
  }


  //carrots return function
  resetObj(veggie){
    veggie.x = 0;
    var randomy = Phaser.Math.Between(0, 700);
    veggie.y = randomy;
  }


  //carrot eating function
  eatCarrot(bunny, carrot){ 
    //play positive sound
    this.carrotmusic.play();

    //make carrot poof
    carrot.setTexture("Poof", 5);
    carrot.play("POOFER", true);

    //add score
    this.score += 5;
    this.scoreLabel.text = "SCORE " + this.score;

    //make carrot unpoof
    carrot.once("animationcomplete", ()=>{ 
      this.resetObj(carrot);
      carrot.setTexture("carrot", 1);
    });
  }


  //Add teleporting puff
  Puff(){
    var OUCH = new hurt(this, this.bunny.x, this.bunny.y);
  }

  //Make bunny opaque
  bunSee(){
    this.bunny.alpha = 1
    return 5;
  }

  //Make bunny transparent but enabled
  resetBun(){
    this.bunny.enableBody(true, 400, 350, true, true);
    this.bunny.alpha = 0.5;
  }


  //Bunny-fox collision result
  takeDamage(bunny, wolf){

    //only take damage if not transparent
    if(this.bunny.alpha < 1){
      return;
    }

    //Warp sound and smoke cloud
    this.warpSound.play();
    var OUCH = new hurt(this, this.bunny.x, this.bunny.y);

    //Disable bunny
    bunny.disableBody(true, true);

    //Send bunny back to start after one second
    this.time.addEvent({
      delay: 1000,
      callback: this.resetBun,
      callbackScope: this,
      loop: false
    });
    //Puff cloud for reappearing after one second      
    this.time.addEvent({
      delay: 1000,
      callback: this.Puff,
      callbackScope: this,
      loop: false
    });
    //make bunny fully visible after three seconds
    this.time.addEvent({
      delay: 3000,
      callback: this.bunSee,
      callbackScope: this,
      loop: false
    });

    //adjust score for taking damage
    this.score -= 50;
    this.scoreLabel.text = "SCORE " + this.score;
  }

  //Shoot egg up
  shootEgg(){
    //create egg and adjust size
    var egg1 = new Egg(this);
    egg1.setScale(0.1);

    //play egg sound
    this.popSound.play();
    
    //adjust score
    this.score -= 50;
    this.scoreLabel.text = "SCORE " + this.score;
  }

  //shoot egg forward
  shootSideEgg(){
    //create new side-firing egg and adjust size
    var egg1 = new SideEgg(this);
    egg1.setScale(0.1);

    //play egg sound
    this.popSound.play();
    
    //adjust score
    this.score -= 50;
    this.scoreLabel.text = "SCORE " + this.score;
  }


  //WIN!
  win(enemy,theEgg){
    
    //poof egg on impact
    theEgg.setTexture("Poof", 5);
    theEgg.play("POOFER", true);

    //poof fox on impact
    enemy.setTexture("Poof", 5);
    enemy.play("POOFERWIN", true);

    //play win sound
    this.winSound.play();

    //stop fox and note that player won
    this.enemy.setVelocity(0, 0);
    this.winner = true;

    //show text for winning
    this.winlabel = this.add.bitmapText(50, 50, "letters", "WINNER", 50);
  }

  //Move player
  movePlayerManager(){
    //enable bunny movement
    this.bunny.moves = true;
    this.bunny.enable = true;

    //move left with left key
    if(this.cursorKeys.left.isDown){
      this.bunny.body.setVelocityX(-160);
    }
    
    //move right with right key
    else if(this.cursorKeys.right.isDown){
      this.bunny.body.setVelocityX(160);
    }

    //otherwise don't move horizontally
    else{
      this.bunny.body.setVelocityX(0);
    }

    //move up if up key pressed
    if(this.cursorKeys.up.isDown){
      this.bunny.body.setVelocityY(-160);
    }

    //move down if down key pressed
    else if(this.cursorKeys.down.isDown){
      this.bunny.body.setVelocityY(160);
    }

    //otherwise don't move vertically
    else{
      this.bunny.body.setVelocityY(0);
    }
  }

  update() {

    //delete offscreen eggs
    for(var i = 0; i < this.eggs.getChildren().length; i++){
      var eggcheck = this.eggs.getChildren()[i];
      eggcheck.update();
    }

    //make carrots advance across screen
    this.moveCarrot(this.food, 2);
    this.moveCarrot(this.food2, 3);
    this.moveCarrot(this.food3, 4);
    
    //make fox run if not won yet
    if(this.winner == false){
    this.enemy.play("foxRun", true);
    }

    //fire egg up with spacebar when player active and enough points
    if(Phaser.Input.Keyboard.JustDown(this.cursorKeys.space) && this.score>500 && this.bunny.active){
      this.shootEgg();
    }

    //fire egg forward with shift when player active and enough points
    if(Phaser.Input.Keyboard.JustDown(this.cursorKeys.shift) && this.score>500 && this.bunny.active){
      this.shootSideEgg();
    }

    //play hopping left animation when hopping left and set facing left
    if((this.cursorKeys.left.isDown)){
      this.bunny.play("bunHopL", true);
      this.flag = 1;
    }

    //play hopping right animation when hopping right and set facing right
    else if(this.cursorKeys.right.isDown){
      this.bunny.play("bunHopR", true);
      this.flag = 0;
    }

    //play hopping animation when hopping up based on direction facing
    else if(this.cursorKeys.up.isDown){
      if(this.flag == 1){
        this.bunny.play("bunHopL", true);}
      else{
        this.bunny.play("bunHopR", true);
      }
    }

    //play hopping animation when hopping down based on direction facing
    else if(this.cursorKeys.down.isDown){
      if(this.flag == 1){
        this.bunny.play("bunHopL", true);}
      else{
        this.bunny.play("bunHopR", true);
      }
    }

    //if no key pressed, bunny sits facing correct direction
    else{
      this.bunny.body.setVelocityX(0);
      if(this.flag == 1){
      this.bunny.play("bunHopSL");}
      else{
        this.bunny.play("bunHopSR");
      }
    }

    //move sprite around board with arrow keys
    this.movePlayerManager();
  }
}
