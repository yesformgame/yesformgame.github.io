var game = new Phaser.Game( 960, 540, Phaser.CANVAS, 'main', { preload: preload, create: create, update: update, render: render });
// var game = new Phaser.Game( 540, document.body.offsetHeight, Phaser.CANVAS, 'main', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap(      'new-level',    'assets/imgs/on-form-ls.json', null, Phaser.Tilemap.TILED_JSON );
    game.load.spritesheet(  'dude',         'assets/imgs/cursor-sprites.png', 32, 48 );
    game.load.image(        'tiles-5',      'assets/imgs/tiles-5.png', 32, 48 );
    game.load.pack(         'sprites',      'assets/pack.json', null, this);
    // game.load.image('background', 'assets/imgs/background2.png');

}

var player;
var coins;
var platforms;
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
var jumpHeight = 275;

var gui = new dat.GUI();
gui.add( window, 'accel', 200, 2000 ).step( 100 );
gui.add( window, 'jumpHeight', 100, 500 ).step( 25 );


function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.time.desiredFps = 30;

    // bg = game.add.tileSprite(0, 0, 960, 540, 'background');
    // bg.fixedToCamera = true;

    game.stage.backgroundColor = '#ffffff'

    map = game.add.tilemap('new-level');

    map.addTilesetImage('tiles-5');

    map.setCollisionByExclusion([ 13, 14, 15, 16, 46, 47, 48, 49, 50, 51 ]);

    layer = map.createLayer('Tile Layer 1');
    layer.resizeWorld();

    // add items
    coins = game.add.group();
    coins.enableBody = true;
    map.createFromObjects('Coins', 10, 'coin', 0, true, false, coins);

    var coinCount = 0;
    coins.forEach( function( coin ) {
         
        coinCount ++;

        game.physics.enable( coin, Phaser.Physics.ARCADE );
        coin.body.allowGravity = false;
        coin.body.immovable = true;

        coin.grabbed = false;
         
        var t = this.add.tween(coin.position);
        t.to({ y: coin.position.y - 8 }, 500, Phaser.Easing.Linear.None, true, ( coinCount * 100 ) % 500, -1, true);
         
    }, this);

   
    game.physics.arcade.gravity.y = 350;    
    
    player = game.add.sprite(48, 32, 'dude');

    game.physics.arcade.TILE_BIAS = 32;

    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.bounce.y = 0;
    player.body.collideWorldBounds = true;
    player.body.setSize( 16, 32, 5, 16 );


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

    game.physics.arcade.overlap(player, coins, getCoin, null, this);

    
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
        
        player.body.velocity.y = -jumpHeight;    
        
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

        restart();

    }

}

function render () {

    game.debug.text(game.time.suggestedFps, 32, 32);

    // game.debug.text(game.time.physicsElapsed, 32, 32);
    // game.debug.body(player);
    // game.debug.bodyInfo(player, 16, 24);

}

var getCoin = function( player, coin ) {

    if( !coin.grabbed ) {

        game.add.tween( coin.position ).to( 
            { 
                y: coin.position.y - 15 
            }, 
            200, 
            Phaser.Easing.Back.Out, 
            true, 
            0, 
            0, 
            false 
        );

        game.add.tween( coin.scale ).to( 
            { 
                y: coin.scale.y * 1.2,
                x: coin.scale.x * 1.2, 
            }, 
            200, 
            Phaser.Easing.Back.Out, 
            true, 
            0, 
            0, 
            false 
        );

        game.time.events.add(300, function() {
            coin.alpha = 0;
        }, this);    

        coin.grabbed = true;
        coin.loadTexture( 'coin-grabbed', 0 ); 

    }
}

var restart = function() {

    resetCoins();
    resetPlayer();
    
}

var resetCoins = function() {

    coins.forEach( function( coin ) {


        // turn of grabbed
        coin.grabbed = false;

        //reset scale
        coin.scale.x = 1;
        coin.scale.y = 1;

        //reset jump tween
        coin.position.y += 15;

        // reset texture
        coin.loadTexture( 'coin', 0 ); 

        // reset alpha
        coin.alpha = 1;



    });

}

var resetPlayer = function() {
    player.position = { x: 48, y: 32 };
}