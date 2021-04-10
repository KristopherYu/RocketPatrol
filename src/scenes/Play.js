class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        //loads images / tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        //load spritesheet
        this.load.spritesheet('explosion', '.assets/explosion.png', {
        frameWidth: 64,
        frameHeight: 32,
        startFrame: 0,
        endFrame: 9
    });
    }

    create(){
        //place starfield
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        //green UI Background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width,
        borderUISize * 2, 0x00FF00).setOrigin(0,0);

        //white borders
        this.add.rectangle( 0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);

        this.add.rectangle(0, game.config.height - borderUISize, game.config.width,
        borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        
        //add rocket (player 1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding,
        'rocket').setOrigin(0.5, 0);

        // add x3 spaceships
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6,
            borderUISize * 4, 'spaceship', 0, 30).setOrigin(0,0);
            //this.ship01.moveSpeed = this.ship01.moveSpeed + 1;
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3,
            borderUISize * 5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width,
            borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
            //this.ship03.moveSpeed = this.ship03.moveSpeed - 1;

        //define our keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
            
        // animation config
        this.anims.create({
            key:'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate:30
        });
    }

    update(){
        this.starfield.tilePositionY -= starspeed;
        this.starfield.tilePositionX -= starspeed;

        //update rocket
        this.p1Rocket.update();
        //update spaceships x3
        this.ship01.update();
        this.ship02.update();
        this.ship03.update();
        //check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.ship03.reset();
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.ship02.reset();
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.ship01.reset();
        }
    }

    //Check collision
    checkCollision(rocket, ship){
        //simple AABB checking
        if( rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
        }
        else{
            return false;
        }
    }

}