var game = new Phaser.Game(960, 540, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap(      'new-level', 'assets/imgs/new-level.json', null, Phaser.Tilemap.TILED_JSON );
    game.load.spritesheet(  'dude', 'assets/imgs/cursor-sprites.png', 32, 48 );
    game.load.image(        'tiles-3', 'assets/imgs/tiles-3.png', 32, 48 );
    // game.load.image('background', 'assets/imgs/background2.png');

}

var player;
var facing = 'left';
var jumpTimer = 0;
var cursors;
var jumpButton;
var restartBtn;
var bg;
var map;
var layer;

// arcade movement
var accel = 1200;

// stepped movement
var STEPPED = false;
var stepTimer = 0;
var timeStep = 4;
var stepSize = 15;

var gui = new dat.GUI();
gui.add(window, 'STEPPED' );
gui.add(window, 'timeStep', 1, 20 ).step( 1 );
gui.add(window, 'stepSize', 1, 100 ).step( 1 );


function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.time.desiredFps = 30;

    // bg = game.add.tileSprite(0, 0, 960, 540, 'background');
    // bg.fixedToCamera = true;

    game.stage.backgroundColor = '#ffffff'

    map = game.add.tilemap('new-level');

    map.addTilesetImage('tiles-3');

    map.setCollisionByExclusion([ 13, 14, 15, 16, 46, 47, 48, 49, 50, 51 ]);

    layer = map.createLayer('Tile Layer 1');
    layer.resizeWorld();

    if( !STEPPED ) {
        game.physics.arcade.gravity.y = 350;    
    }
    

    player = game.add.sprite(32, 32, 'dude');

    game.physics.arcade.TILE_BIAS = 32;

    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.bounce.y = 0;
    player.body.collideWorldBounds = true;
    player.body.setSize(20, 32, 5, 16);
    
    if( STEPPED ) {
        player.animations.add('idle',   [ 1 ],      10, true );
        player.animations.add('left',   [ 1 ],      10, true );
        player.animations.add('turn',   [ 4 ],      20, true );
        player.animations.add('right',  [ 6 ],      10, true );    
        player.animations.add('jump',   [ 9 ],      10, true );
    } else {
        player.animations.add('idle',   [ 0, 10 ],  3, true );
        player.animations.add('left',   [ 0, 10 ],  3, true );
        player.animations.add('turn',   [ 4 ],      3, true );
        player.animations.add('right',  [ 5, 10 ],  3, true );
        player.animations.add('jump',   [ 9, 10 ],  3, true );
    }
    

    

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    restartBtn = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

}

function update() {

    game.physics.arcade.collide(player, layer);

    if( !STEPPED ) {
        game.physics.arcade.gravity.y = 350;    
    }

    if( !STEPPED ) {
        game.camera.follow( player );    
    } else {
        game.camera.follow( null );    
    }

    if( STEPPED ) {
        // stepped movement
        if( stepTimer > 0 ) {
            stepTimer -= 1;
        }
    } else {
        // classic arcade movement
        player.body.acceleration.x 	= 0;
        player.body.velocity.x 		*= .88;
    }

    
    



    if (cursors.left.isDown)
    {

        // classic arcade movement
        // player.body.acceleration.x = -500;

        if( STEPPED ) {
            // stepped movement
            if( stepTimer === 0 ) {
                player.position.x += -stepSize;
                stepTimer = timeStep;
            }

        } else {
            // classic arcade movement
            player.body.acceleration.x = -accel;
        }
        

        if (facing != 'left')
        {
            if( player.frame == 10 ) {
                player.animations.play( 'left' ); 
                player.animations.currentAnim.setFrame( 10, true );
            } else {
                player.animations.play( 'left' ); 
            }

            facing = 'left';
        }
    }
    else if (cursors.right.isDown)
    {
        

        if( STEPPED ) {
            // stepped movement
            if( stepTimer === 0 ) {
                player.position.x += stepSize;
                stepTimer = timeStep;
            }

        } else {

            // classic arcade movement
            player.body.acceleration.x = accel;

        }
        
        if (facing != 'right')
        {
            if( player.frame == 10 ) {
                player.animations.play( 'right' ); 
                player.animations.currentAnim.setFrame( 10, true );
            } else {
                player.animations.play( 'right' ); 
            }
            facing = 'right';
        }
    }
    else
    {


        if (facing != 'idle')
        {

            if( player.frame == 10 ) {
                player.animations.play( 'idle' ); 
                player.animations.currentAnim.setFrame( 10, true );
            } else {
                player.animations.play( 'idle' ); 
            }

            facing = 'idle';
        }
    }
    
    if (jumpButton.isDown && player.body.onFloor() )
    {
        if( STEPPED ) {
            player.position.y += -120;    
        } else {
            player.body.velocity.y = -220;    
        }
        
    }

    if( !player.body.onFloor() && player.animations.currentAnim.name != 'jump' ) 
    {
        if( player.frame == 10 ) {
            player.animations.play( 'jump' ); 
            player.animations.currentAnim.setFrame( 10, true );
        } else {
            player.animations.play( 'jump' ); 
        }
        
        
    }

    if( player.body.onFloor() && player.animations.currentAnim.name == 'jump' )
    {
        if( player.frame == 10 ) {
            player.animations.play( 'idle' ); 
            player.animations.currentAnim.setFrame( 10, true );
        } else {
            player.animations.play( 'idle' ); 
        }
    }

    // if STEPPED in air
    if( STEPPED ) {
        if( !player.body.onFloor() )
        {
            player.position.y += stepSize;
        }
    }
    

    if( restartBtn.isDown ) {

        player.position = { x: 64, y: 120 };

    }

}

function render () {

    game.debug.text(game.time.suggestedFps, 32, 32);

    // game.debug.text(game.time.physicsElapsed, 32, 32);
    // game.debug.body(player);
    // game.debug.bodyInfo(player, 16, 24);

}