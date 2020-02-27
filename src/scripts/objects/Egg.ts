export default class Egg extends Phaser.GameObjects.Sprite {
    body: Phaser.Physics.Arcade.Body;

    constructor(scene) {
        var x = scene.bunny.x;
        var y = scene.bunny.y;
        super(scene, x, y, "egg");

        scene.physics.world.enableBody(this);
        scene.eggs.add(this);
        scene.add.existing(this);

        this.body.setVelocity(0, -250);

        
    }

    update(){

        if(this.y<0){
            this.destroy();
        }
    }
}