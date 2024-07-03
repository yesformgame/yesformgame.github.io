var game = new Phaser.Game( 1920, 1080, Phaser.AUTO, 'main', { preload: preload, create: create, update: update, render: render });
// var game = new Phaser.Game( 540, document.body.offsetHeight, Phaser.CANVAS, 'main', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap(      'new-level',    'assets/imgs/tilemap.json', null, Phaser.Tilemap.TILED_JSON );
    game.load.spritesheet(  'dude',         'assets/imgs/cursor-sprites.png', 32, 80 );
    game.load.image(        'tiles',        'assets/imgs/tiles.png', 10, 10 );
    game.load.pack(         'sprites',      'assets/pack.json', null, this);
    // game.load.image('background', 'assets/imgs/background2.png');

    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    //game.scale.pageAlignHorizontally = true;
    // game.scale.pageAlignVertically = true;
    // game.scale.setScreenSize( true );
    // game.scale.setScreenSize();


}

// globals
var DEBUG = false;

// player
var player;
var levelStart = { x: 145, y: 300 };
var facing = 'left';

// tiles
var bg;
var map;

// level 
var levelImage;
var collisionLayer, background, foreground;

// interactive
var coins, asterisks, vacuums, warpUps, warpDowns;

// controls
var cursors;
var jumpButton;
var restartBtn;

// arcade movement
var accel = 1100;
var jumpHeight = 250;
var vacuumSpeed = 300;
var maxFallSpeed = 500;

// gui
var gui = new dat.GUI();
gui.add( window, 'DEBUG' );
gui.add( window, 'accel', 200, 2000 ).step( 100 );
gui.add( window, 'jumpHeight', 100, 500 ).step( 25 );
gui.add( window, 'vacuumSpeed', 100, 500 ).step( 25 );
gui.add( window, 'maxFallSpeed', 300, 600 ).step( 25 );



function create() {

    // load plugins
    game.plugins.cameraShake = game.plugins.add(Phaser.Plugin.CameraShake);
    game.plugins.cameraShake.setup({
        shakeRange: 80,
        shakeCount: 15,
        shakeInterval: 2,
        randomShake: true,
        randomizeInterval: true,
        shakeAxis: 'xy'
    });

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.arcade.gravity.y = 410;
    gui.add( game.physics.arcade.gravity, 'y', 100, 1000 ).name( 'gravity' );

    game.time.desiredFps = 30;

    game.stage.backgroundColor = '#ffffff';
    levelImage = game.add.sprite(0, 0, 'level-image');
    levelImage.resizeFrame( 0, 1920, 4000 );

    map = game.add.tilemap('new-level');

    map.addTilesetImage('tiles');


    // background = map.createLayer('Background Color');
    collisionLayer = map.createLayer('Collision Layer');
    
    collisionLayer.resizeWorld();

    map.setCollisionByExclusion( [ ], true, 'Collision Layer' );

    game.camera.bounds = game.world.bounds;



    // add player
    player = game.add.sprite( levelStart.x, levelStart.y, 'dude' );
    game.physics.enable( player, Phaser.Physics.ARCADE );
    player.body.bounce.y = 0;
    player.body.collideWorldBounds = true;
    player.anchor.set( .5, .5 );
    // standing size
    player.body.setSize( 4, 80, 14, 0 );

    player.body.state = 'standing';

    // body sizing functions
    player.body.setStanding = function() {
        player.body.position.y -= ( 8 * player.scale.y );
        player.body.setSize( 4, 80, 14, 0 );
        player.body.state = 'standing';
    }
    player.body.setJumping = function() {
        player.body.setSize( 30, 56, 0, 12 );
        player.body.state = 'jumping';
    }
    player.body.setDucking = function() {
        player.body.position.y += ( 15 * player.scale.y );
        player.body.setSize( 23, 50, 4, 16 );
        player.body.state = 'ducking';
    }
    


    // blink all the time
    // player.animations.add('idle',   [ 0, 10 ],  3, true );
    // player.animations.add('left',   [ 0, 10 ],  3, true );
    // player.animations.add('turn',   [ 4 ],      3, true );
    // player.animations.add('right',  [ 5, 10 ],  3, true );
    // player.animations.add('jump',   [ 9, 10 ],  3, true );

    // blink on idle only
    player.animations.add('idle',           [ 0, 6 ],  3, true );
    player.animations.add('left',           [ 0 ],  3, true );
    player.animations.add('down-right',     [ 4 ],  3, true );
    player.animations.add('down-left',      [ 1 ],  3, true );
    player.animations.add('right',          [ 0 ],  3, true );
    player.animations.add('jump-right',     [ 3 ],  3, true );
    player.animations.add('jump-left',      [ 2 ],  3, true );

   
    // custom player states
    player.isDead = false;
    player.vacuumed = false;
    player.warped = false;


    player.scale.y = .75;
    // add scale to gui
    gui.add( player.scale, 'y', .125, 1.25 ).step( .125 ).onFinishChange( restart ).name( 'height' );
    
    // add foreground tiles 
    foreground = game.add.group();
    map.createFromObjects('Foreground Tiles', 141, 'background-color', 0, true, false, foreground);

    foreground.forEach( function( tile ) {
        
        

    }, this );

    // 
    // INTERACTIVE ELEMENTS
    // 

    // add vacuums
    vacuums = game.add.group();
    vacuums.enableBody = true;
    map.createFromObjects('Vacuums', 141, 'background-color', 0, true, false, vacuums);

    vacuums.forEach( function( vacuum ) {
         
        game.physics.enable( vacuum, Phaser.Physics.ARCADE );
        vacuum.body.allowGravity = false;
        vacuum.body.immovable = true;
         
    }, this );

    warpUps = game.add.group();
    warpUps.enableBody = true;
    map.createFromObjects('Warp Up', 141, 'background-color', 0, true, false, warpUps);

    warpUps.forEach( function( upWarp ) {
         
        game.physics.enable( upWarp, Phaser.Physics.ARCADE );
        upWarp.body.allowGravity = false;
        upWarp.body.immovable = true;
         
    }, this );

    warpDowns = game.add.group();
    warpDowns.enableBody = true;
    map.createFromObjects('Warp Down', 141, 'background-color', 0, true, false, warpDowns);

    warpDowns.forEach( function( downWarp ) {
         
        game.physics.enable( downWarp, Phaser.Physics.ARCADE );
        downWarp.body.allowGravity = false;
        downWarp.body.immovable = true;
         
    }, this );

    // add items
    coins = game.add.group();
    coins.enableBody = true;
    map.createFromObjects('Coins', 28, 'coin', 0, true, false, coins);

    var coinCount = 0;
    coins.forEach( function( coin ) {
         
        coinCount ++;

        game.physics.enable( coin, Phaser.Physics.ARCADE );
        coin.body.allowGravity = false;
        coin.body.immovable = true;

        coin.grabbed = false;
         
        var t = this.add.tween(coin.position);
        t.to({ y: coin.position.y - 8 }, 500, Phaser.Easing.Linear.None, true, ( coinCount * 100 ) % 500, -1, true);
         
    }, this );

    // add enemies
    asterisks = game.add.group();
    asterisks.enableBody = true;
    map.createFromObjects('Asterisks', 67, 'asterisk', 0, true, false, asterisks);
    asterisks.forEach( function( ast ) {

        game.physics.enable( ast, Phaser.Physics.ARCADE );
        ast.body.allowGravity = false;
        ast.body.immovable = true;
        ast.body.setSize( 16, 16, 0, 0 );
         
        var t = this.add.tween(ast.position);
        t.to({ x: ast.position.x - 12 }, 500, Phaser.Easing.Linear.None, true, game.rnd.integerInRange( 100, 600 ), -1, true);
         
    }, this );

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    restartBtn = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

}

function update() {

    game.camera.follow( player, Phaser.Camera.FOLLOW_PLATFORMER );  
    
    if( !player.isDead ) {

        // level collisions
        game.physics.arcade.collide(player, collisionLayer);

        // coin collisions
        game.physics.arcade.overlap(player, coins, getCoin, null, this);

        // asterisks collisions
        game.physics.arcade.overlap(player, asterisks, playerDie, null, this);

        // vacuum collisions
        game.physics.arcade.overlap(player, vacuums, handleVacuum, null, this);

        // warp zone collisons 
        game.physics.arcade.overlap(player, warpUps, handleUpWarps, null, this);
        game.physics.arcade.overlap(player, warpDowns, handleDownWarps, null, this);


        // classic arcade movement
        player.body.acceleration.x  = 0.0;
        player.body.velocity.x     *= 0.88;
        if( player.body.velocity.y > maxFallSpeed ) player.body.velocity.y = maxFallSpeed;

        if( player.body.onFloor() && player.body.state == 'jumping' && player.body.state != 'ducking' )
        {
            player.body.setStanding();
        }

        if (cursors.left.isDown)
        {

            
            // classic arcade movement
            player.body.acceleration.x = -accel;

            if (facing != 'left' && player.body.onFloor() )
            {
                player.animations.play( 'left' ); 
                if( player.frame == 10 ) {
                    player.animations.currentAnim.setFrame( 10, true );
                } 

                facing = 'left';
            }
        }
        else if (cursors.right.isDown)
        {
            
            // classic arcade movement
            player.body.acceleration.x = accel;

            if (facing != 'right' && player.body.onFloor() )
            {
                player.animations.play( 'right' ); 
                if( player.frame == 10 ) { 
                    player.animations.currentAnim.setFrame( 10, true );
                } 
                facing = 'right';
            }
        }
        else
        {
            if (  facing != 'idle' && player.body.onFloor() && !cursors.down.isDown )
            {
                player.animations.play( 'idle' ); 

                if( player.frame == 10 ) {
                    player.animations.currentAnim.setFrame( 10, true );
                } 

                facing = 'idle';
            }
        }

        if (cursors.down.isDown)
        {

            if ( facing != 'down' && player.body.onFloor() )
            {
                if( facing == 'left' ) {
                    player.animations.play( 'down-left' ); 
                } else {
                    player.animations.play( 'down-right' ); 
                }
                facing = 'down';
                if( player.body.state != 'ducking' ) { 
                    player.body.setDucking();
                }
            } else if ( !player.body.onFloor() )
            {
                window.fastFallSpeed = 50;
                player.body.velocity.y += window.fastFallSpeed;
            }


        } else if( player.body.state != 'standing' && player.body.onFloor() ) {


            player.body.setStanding();

        }
        
        
        
        if ( jumpButton.isDown && player.body.onFloor() )
        {
            
            // long jump
            if( cursors.down.isDown ) {
                player.body.velocity.y = -jumpHeight * 1.2;
                player.body.velocity.x *= 1.5;
            } else {
                player.body.velocity.y = -jumpHeight;  
            }
            
            player.body.setJumping();
            if( facing == 'left' ) {
                player.animations.play( 'jump-left' ); 
            } else {
                player.animations.play( 'jump-right' ); 
            }
            facing = 'jump';
            
        }

       

         // if you dead
        // if( player.position.y > 440 ) {

        //     playerDie();
            
        // }
    }


    if( restartBtn.isDown ) {

        restart();

    }

}

function render () {

    if( DEBUG ) {

        game.debug.text(game.time.suggestedFps, 32, 32 );
        // game.debug.text(game.time.physicsElapsed, 32, 72 );
        game.debug.body(player);
        game.debug.bodyInfo(player, 64, 24);
        asterisks.forEach( function( a ){
            game.debug.body( a );
        });

    }
   

}

var playerDie = function( player, asterisk ) {

    player.isDead = true; 
   
    // clear inputs
    jumpButton.isDown =
    cursors.left.isDown =
    cursors.right.isDown = 
    cursors.down.isDown = false
    // game.input.enabled = false;

    player.body.acceleration.x  = 0;

    player.body.velocity.y = game.rnd.integerInRange( 400, 600 );
    player.body.velocity.x = game.rnd.integerInRange( -180, 180 );
    player.body.angularAcceleration = game.rnd.integerInRange( -8, 8 ) * 200;
    

    game.plugins.cameraShake.shake();
    game.time.events.add( 100 , function(){
        game.camera.flash(0xff9090, 600);
    } ,this );
    
    setTimeout( function(){
        if( player.isDead ) {
            restart();    
        }
    }, 2500 );

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

var handleVacuum = function( player, vacuum ) {

    // if player going up and hasn't been vacuumed
    if( !player.vacuumed && player.body.velocity.y < 0 ) {

        player.body.velocity.y -= window.vacuumSpeed;
        player.vacuumed = true;
        game.time.events.add( 250, function(){
            player.vacuumed = false;
        }, this);

    }

}

var handleDownWarps = function( player, warp ) {

    // if player going down and hasn't been warped
    if( !player.warped && player.body.velocity.y > 0 ) {

        // use custom property found in tileset set in Tiled as warp offset
        player.x += warp.warpX;
        player.y += warp.warpY;

        player.warped = true;

        game.time.events.add( 250, function(){
            player.warped = false;
        }, this);

    }

}

var handleUpWarps = function( player, warp ) {

    // if player going down and hasn't been warped
    if( !player.warped && player.body.velocity.y < 0 ) {

        // use custom property found in tileset set in Tiled as warp offset
        player.x += warp.warpX;
        player.y += warp.warpY;

        player.warped = true;

        game.time.events.add( 250, function(){
            player.warped = false;
        }, this);

    }

}

var restart = function() {

    resetCoins();
    resetPlayer();
    game.camera.y = 0;
    player.body.velocity.y = 0;
    player.body.velocity.x = 0;
    player.body.angularAcceleration = 0;
    player.body.angularVelocity = 0;
    player.rotation = 0;
    game.input.enabled = true;
    player.isDead = false;

    
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
    player.position.set( levelStart.x, levelStart.y );
}