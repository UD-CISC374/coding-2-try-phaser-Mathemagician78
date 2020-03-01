export default class hurt extends Phaser.GameObjects.Sprite {
    body: Phaser.Physics.Arcade.Body;

    constructor(scene, x, y) {
        
        super(scene, x, y, "skull");
        this.setScale(0.5);
        scene.add.existing(this);
        this.play("Perish", true);
        
    }

    //destroy if offscreen (probably unnecessary, but if I base another class on this, I'll remember to add it in for the new one now)
    update(){
        if(this.y<0){
            this.destroy();
        }
    }
}