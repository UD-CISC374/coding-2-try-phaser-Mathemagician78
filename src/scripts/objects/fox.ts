export default class fox extends Phaser.GameObjects.Sprite {

    body: Phaser.Physics.Arcade.Body;
    bounce: Phaser.Physics.Arcade.Components.Bounce;

    constructor(scene) {
         //set fox at random position
        var x = Phaser.Math.Between(0, 800);
        var y = Phaser.Math.Between(0, 700);
        super(scene, x, y, "Fox");

        //add fox to world with physics
        scene.physics.world.enableBody(this);
        scene.foxes.add(this);
        scene.add.existing(this);

        //Movement
        this.body.setVelocity(100, 100);
        this.body.bounce.set(1, 1);
    }


    //destroy if off screen
    update(){
        if(this.x>800){
            this.destroy();
        }
    }
}