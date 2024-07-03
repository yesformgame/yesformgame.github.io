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


var gui = new dat.GUI();


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

    game.physics.arcade.gravity.y = 350;    
    

    player = game.add.sprite(32, 32, 'dude');

    game.physics.arcade.TILE_BIAS = 32;

    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.bounce.y = 0;
    player.body.collideWorldBounds = true;
    player.body.setSize(20, 32, 5, 16);


    // blink all the time
    // player.animations.add('idle',   [ 0, 10 ],  3, true );
    // player.animations.add('left',   [ 0, 10 ],  3, true );
    // player.animations.add('turn',   [ 4 ],      3, true );
    // player.animations.add('right',  [ 5, 10 ],  3, true );
    // player.animations.add('jump',   [ 9, 10 ],  3, true );

    // blink on idle only
    player.animations.add('idle',   [ 0, 10 ],  3, true );
    player.animations.add('left',   [ 0 ],  3, true );
    player.animations.add('turn',   [ 4 ],      3, true );
    player.animations.add('right',  [ 5 ],  3, true );
    player.animations.add('jump',   [ 9 ],  3, true );

    

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    restartBtn = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

}

function update() {

    game.physics.arcade.collide(player, layer);

    
    game.physics.arcade.gravity.y = 350;    
    
    game.camera.follow( player );    

    
    // classic arcade movement
    player.body.acceleration.x 	= 0;
    player.body.velocity.x 		*= .88;
    

    
    



    if (cursors.left.isDown)
    {

        
        // classic arcade movement
        player.body.acceleration.x = -accel;

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
        

        // classic arcade movement
        player.body.acceleration.x = accel;

        
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
        
        player.body.velocity.y = -220;    
        
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