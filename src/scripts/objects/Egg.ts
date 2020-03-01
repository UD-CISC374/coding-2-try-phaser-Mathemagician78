export default class Egg extends Phaser.GameObjects.Sprite {
    body: Phaser.Physics.Arcade.Body;

    constructor(scene) {
        //get bunny position
        var x = scene.bunny.x;
        var y = scene.bunny.y;

        //create egg at bunny position
        super(scene, x, y, "egg");

        //add egg to world with physics
        scene.physics.world.enableBody(this);
        scene.eggs.add(this);
        scene.add.existing(this);

        //FIRE!!!
        this.body.setVelocity(0, -250);

        
    }

    //destroy if off screen
    update(){
        if(this.x>800){
            this.destroy();
        }
    }
}