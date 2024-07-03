var game = new Phaser.Game( 960, 540, Phaser.CANVAS, 'phaser-example', 
    {   
        preload: preload, 
        create: create, 
        update: update, 
        render: render 
    }
);

function preload() {

    game.load.tilemap(      'new-level',    'assets/imgs/new-level.json', null, Phaser.Tilemap.TILED_JSON );
    game.load.spritesheet(  'dude',         'assets/imgs/cursor-sprites.png', 32, 48 );
    game.load.image(        'tiles-3',      'assets/imgs/tiles-3.png', 32, 48 );
    game.load.image(        'label',        'assets/imgs/test-image.png' );
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

    // load plugins
    game.plugins.cameraShake = game.plugins.add(Phaser.Plugin.CameraShake);
    game.plugins.cameraShake.setup({
        shakeRange: 50,
        shakeCount: 12,
        shakeInterval: 15,
        randomShake: false,
        randomizeInterval: true,
        shakeAxis: 'xy'
    });

    // start physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.time.desiredFps = 30;

    // set background color
    game.stage.backgroundColor = '#ffffff';

    // set level size
    game.world.setBounds(0, 0, 3200, 512);

    // set up tile map for LEVEL
    map = game.add.tilemap('new-level');
    map.addTilesetImage('tiles-3');
    map.setCollisionByExclusion([ 13, 14, 15, 16, 46, 47, 48, 49, 50, 51 ]);
    layer = map.createLayer('Tile Layer 1');
    layer.resizeWorld();


    // setup game physics 
    game.physics.arcade.gravity.y = 350;        
    player = game.add.sprite( 32, 32, 'dude');
    player.position = { x: 110, y: 200 };
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.bounce.y = 0;
    player.body.collideWorldBounds = true;
    player.body.setSize(20, 32, 5, 16);
    player.isDead = false;

    game.add.sprite( 100, 0, 'label');
    // player animations

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

    // inputs
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    restartBtn = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

}

function update() {

    // game.camera.focusOnXY( player.position.x, player.position.y + game.camera.offsetY, Phaser.Camera.FOLLOW_PLATFORMER );

   
    game.camera.y = -12;
    if( player.position.x < 450 ) {
        game.camera.x = -28;
    } else if ( player.position.x > 2760 ) {
        game.camera.x = 2250;
    } else {
        game.camera.follow( player, Phaser.Camera.FOLLOW_PLATFORMER );
    }

    if( !player.isDead ) {

        game.physics.arcade.collide( player, layer );
        

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

        // if you dead
        if( player.position.y > 440 ) {

            player.isDead = true; 
            player.body.velocity.x      = 0;
            player.body.velocity.y      = 0;
            player.body.acceleration.x  = 0;

            // clear inputs

            jumpButton.isDown =
            cursors.left.isDown =
            cursors.right.isDown = 
            cursors.down.isDown = false
            game.input.enabled = false;
            

            game.plugins.cameraShake.shake();
            game.camera.flash(0xffa0a0, 600);

            setTimeout( function(){
                restart();
                setTimeout( function(){
                    game.input.enabled = true;
                    player.isDead = false;
                }, 200 );
                
            }, 500 );
            
        }
    }

    // restart button
    if( restartBtn.isDown ) {

        player.isDead = false;
        restart();

    }

}

function render () {

    game.debug.text(game.time.suggestedFps, 32, 32);

    // game.debug.text(game.time.physicsElapsed, 32, 32);
    // game.debug.body(player);
    // game.debug.bodyInfo(player, 16, 24);

}

var restart = function() {

    player.position = { x: 110, y: 200 };

}