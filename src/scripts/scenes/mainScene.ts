import ExampleObject from '../objects/exampleObject';
import Egg from '../objects/Egg';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  private food;
  private food2;
  private food3;
  
  public bunny;
  public cursorKeys;
  private flag;
  private pooftest;
  private eggs;
  private veggies;
  private enemy;
  private scoreLabel;
  private score;
  private winner: boolean;
  private winlabel;
  

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    let bg = this.add.image(0, 0, "background");
    bg.setOrigin(0, 0);

    this.scoreLabel = this.add.bitmapText(10, 5, "letters", "SCORE ", 16);

    this.score = 0;

    this.winner = false;

    this.bunny = this.physics.add.sprite(200, 200, "Bun");
    this.bunny.setCollideWorldBounds(true);
    
    
    this.pooftest = this.add.sprite(100, 100, "Poof");

    this.enemy = this.physics.add.sprite(400, 400, "Fox");
    this.enemy.setCollideWorldBounds(true);
    this.enemy.setVelocity(100, 100);
    this.enemy.setBounce(1);
    this.enemy.setScale(2);
    this.enemy.body.setSize(5, 15, true);
    
    this.flag = 1;

    var physBun = this.physics.add.existing(this.bunny, false);
    var body = physBun.body;
    this.bunny.body.setSize(30, 48, true);

    

    this.anims.create({
    key: "bunHopL",
    frames: this.anims.generateFrameNumbers("Bun", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1

    });


    this.anims.create({
      key: "foxRun",
      frames: this.anims.generateFrameNumbers("Fox", {start: 0, end: 1}),
      frameRate: 10,
      repeat: -1

    });

    this.anims.create({
      key: "bunHopR",
      frames: this.anims.generateFrameNumbers("Bun", { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1
  
      });

      this.anims.create({
        key: "POOFER",
        frames: this.anims.generateFrameNumbers("Poof", { start: 0, end: 20 }),
        frameRate: 30,
        repeat: 0,
        hideOnComplete: false
    
        });

        this.anims.create({
          key: "POOFERWIN",
          frames: this.anims.generateFrameNumbers("Poof", { start: 0, end: 20 }),
          frameRate: 30,
          repeat: 0,
          hideOnComplete: true
      
          });

        this.anims.create({
          key: "reCarrot",
          frames: this.anims.generateFrameNumbers("grow", { start: 0, end: 5 }),
          frameRate: 2,
          repeat: -1
        })

      this.anims.create({
        key: "bunHopSL",
        frames: this.anims.generateFrameNumbers("Bun", { start: 0, end: 0 }),
        frameRate: 10,
        repeat: 0
    
        });

        this.anims.create({
          key: "bunHopSR",
          frames: this.anims.generateFrameNumbers("Bun", { start: 7, end: 7 }),
          frameRate: 10,
          repeat: 0
      
          });


          

    this.bunny.play("bunHopL");

    this.food = this.add.sprite(250, 250, "carrot");
    this.food.setScale(0.25);
    this.food.setInteractive();
    this.physics.add.existing(this.food, false);
    this.food.body.setSize(40, 40, 0, 5);
    
    

    this.food2 = this.add.sprite(250, 250, "carrot");
    this.food2.setScale(0.25);
    this.food2.setInteractive();
    this.physics.add.existing(this.food2, false);
    this.food2.body.setSize(40, 40, 0, 5);
    

    this.food3 = this.add.sprite(250, 250, "carrot");
    this.food3.setScale(0.25);
    this.food3.setInteractive();
    this.physics.add.existing(this.food3, false);
    this.food3.body.setSize(40, 40, 0, 5);
    
    this.eggs = this.physics.add.group();

    this.veggies = this.physics.add.group();
    this.veggies.add(this.food);
    this.veggies.add(this.food2);
    this.veggies.add(this.food3);
    



    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.physics.add.overlap(this.bunny, this.veggies, this.eatCarrot, this.eatCarrot, this);

    this.physics.add.overlap(this.bunny, this.enemy, this.takeDamage, this.takeDamage, this);

    this.physics.add.overlap(this.eggs, this.enemy, this.win, this.win, this);


    

  }

  win(enemy,theEgg){
    
    theEgg.setTexture("Poof", 5);
    theEgg.play("POOFER", true);

    this.enemy.setVelocity(0, 0);
    this.winner = true;
    
    enemy.setTexture("Poof", 5);
    enemy.play("POOFERWIN", true);

    this.winlabel = this.add.bitmapText(50, 50, "letters", "WINNER", 50);

  }

  takeDamage(bunny, wolf){
    this.score -= 50;
    this.scoreLabel.text = "SCORE " + this.score;
  }



  eatCarrot(bunny, carrot){ 

    carrot.setTexture("Poof", 5);
    carrot.play("POOFER", true);
    
    
    this.score += 5;
    this.scoreLabel.text = "SCORE " + this.score;

    carrot.once("animationcomplete", ()=>{ 
      this.resetObj(carrot);
      carrot.setTexture("carrot", 1);
      
  });

    
  
  }




  moveCarrot(veggie, speed){
    veggie.x += speed;
    if(veggie.x > 800){
      this.resetObj(veggie);
    }
  }

  resetObj(veggie){
    veggie.x = 0;
    var randomy = Phaser.Math.Between(0, 700);
    veggie.y = randomy;
  }


  movePlayerManager(){
    this.bunny.moves = true;
    this.bunny.enable = true;

    if(this.cursorKeys.left.isDown){
      this.bunny.body.setVelocityX(-160);
      
      
    }

    else if(this.cursorKeys.right.isDown){
      
      this.bunny.body.setVelocityX(160);
      
    }

    else{
      this.bunny.body.setVelocityX(0);
    }


    if(this.cursorKeys.up.isDown){
      this.bunny.body.setVelocityY(-160);
    }

    else if(this.cursorKeys.down.isDown){
      this.bunny.body.setVelocityY(160);
    }

    else{
      this.bunny.body.setVelocityY(0);
      
    }

    
  }

  shootEgg(){
    var egg1 = new Egg(this);
    egg1.setScale(0.1);
    
    
    
  }

  

  update() {

    for(var i = 0; i < this.eggs.getChildren().length; i++){
      var eggcheck = this.eggs.getChildren()[i];
      eggcheck.update();
    }






    this.moveCarrot(this.food, 2);
    this.moveCarrot(this.food2, 3);
    this.moveCarrot(this.food3, 4);
    
    if(this.winner == false){
    this.enemy.play("foxRun", true);
    }



    if(Phaser.Input.Keyboard.JustDown(this.cursorKeys.space) && this.score>500){
      this.shootEgg();
    }


    if((this.cursorKeys.left.isDown)){
      this.bunny.play("bunHopL", true);
    
      this.flag = 1;
    }

    else if(this.cursorKeys.right.isDown){
      this.bunny.play("bunHopR", true);
      this.flag = 0;
    }

    else if(this.cursorKeys.up.isDown){
      
      if(this.flag == 1){
        this.bunny.play("bunHopL", true);}
      else{
        this.bunny.play("bunHopR", true);
      }

      
    }

    else if(this.cursorKeys.down.isDown){
      
      if(this.flag == 1){
        this.bunny.play("bunHopL", true);
      }
      else{
        this.bunny.play("bunHopR", true);
      }


      
    }

    else{
      this.bunny.body.setVelocityX(0);
      if(this.flag == 1){
      this.bunny.play("bunHopSL");}
      else{
        this.bunny.play("bunHopSR");
      }
      
    }



    
    
    this.movePlayerManager();



    
  }






}
