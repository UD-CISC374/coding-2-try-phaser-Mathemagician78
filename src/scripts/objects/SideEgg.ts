export default class SideEgg extends Phaser.GameObjects.Sprite {
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

        //FIRE (in direction bunny is facing)!!!
        //flag is 1 for left, 0 for right.  Will fire at -250 or 250 depending on flag.
        this.body.setVelocity((-500*scene.flag) + 250, 0);
    }

    //destroy if off-screen
    update(){
        if(this.x>800){
            this.destroy();
        }
    }
}