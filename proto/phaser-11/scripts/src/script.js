var game = new Phaser.Game( 1920, 1080, Phaser.AUTO, 'main', { preload: preload, create: create, update: update, render: render });
// var game = new Phaser.Game( 540, document.body.offsetHeight, Phaser.CANVAS, 'main', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap(      'new-level',    'assets/imgs/tilemap.json', null, Phaser.Tilemap.TILED_JSON );
    game.load.spritesheet(  'dude',         'assets/imgs/cursor/cursor-sprites.png', 32, 80 );
    game.load.image(        'tiles',        'assets/imgs/tiles.png', 10, 10 );
    game.load.pack(         'sprites',      'assets/pack.json', null, this);

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
var levelStart = { x: 150, y: 530 };
var facing = 'left';

// tiles
var bg;
var map;

// level 
var levelImage;
var collisionLayer, background, foreground;
var bgElements;
var timer = {};
var scores = {};

// interactive
var coins, asterisks, vacuums, warpUps, warpDowns;
var grabbedCoins = 0;


// controls
var cursors;
var jumpButton;
var restartBtn;
var restarting = false;

// arcade movement
var accel = 1300;
var jumpHeight = 275;
var vacuumSpeed = 300;
var maxFallSpeed = 500;

// gui
var gui = new dat.GUI();
gui.add( window, 'DEBUG' );
gui.add( window, 'accel', 200, 2000 ).step( 100 );
gui.add( window, 'jumpHeight', 100, 500 ).step( 25 );
gui.add( window, 'vacuumSpeed', 100, 500 ).step( 25 );
gui.add( window, 'maxFallSpeed', 300, 600 ).step( 25 );

gui.toggle = function() {

    if( gui.domElement.style.display != 'none' ) {
        gui.domElement.style.display = 'none';
    } else {
        gui.domElement.style.display = 'block';
    }

}

gui.toggle();

// keylocks 
var lock = { 

    down: false,
    up: false,
    left: false,
    right: false,
    jump: false

}



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

    // effects.js
    initEffects();


    // init game physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.TILE_BIAS = 21;
    game.physics.arcade.gravity.y = 410;
    gui.add( game.physics.arcade.gravity, 'y', 100, 1000 ).name( 'gravity' );

    // 30 frames per second, need to double timers
    // game.time.desiredFps = 30;
    game.time.desiredFps = 60;



    // add background image
    game.stage.backgroundColor = '#ffffff';
    levelImage = game.add.sprite(0, 0, 'level-image');
    levelImage.resizeFrame( 0, 1920, 4000 );


    // add tilemap, and tiles
    map = game.add.tilemap('new-level');
    map.addTilesetImage('tiles');

    // init layers
    collisionLayer = map.createLayer('Collision Layer');
    collisionLayer.resizeWorld();
    // collide with everything in collison clayer
    map.setCollisionByExclusion( [ ], true, 'Collision Layer' );

    game.camera.bounds = game.world.bounds;

    // background elements group
    bgElements = game.add.group();

    // player.js
    initPlayer();

    // interactive.js
    initInteractiveElements();

    // enemies.js
    initEnemies();

    // in controls.js
    initControls();

    // gui

    // start timer 
    timer.start = Date.now();
    timer.current = timer.now - timer.start;
    timer.onScreen = game.add.text( 
        900, 
        10,
        msToTime( timer.now ),
        text.style.clock
    );
    timer.onScreen.fixedToCamera = true;

    timer.render = function() {

        timer.current = Date.now() - timer.start;
        timer.onScreen.text = msToTime( timer.current );

    }

    scores.string = '';
    scores.times = [];
    scores.update = function() {

        scores.times.sort( compareNumbers );
        scores.string = '';
        for( var i = 0; i < scores.times.length; i++ ) {

            var score = scores.times[ i ];
            scores.string += '#' + ( i + 1 ) + ' ' + msToTime( score ) + '\n';

        }

    }

    scores.onScreen = game.add.text( 10, 10, scores.string, text.style.clock );
    scores.onScreen.fixedToCamera = true;
    scores.render = function() {

        scores.onScreen.text = scores.string;

    }

}

function update() {

    game.camera.follow( player, Phaser.Camera.FOLLOW_PLATFORMER ); 

    // timer
    timer.now += game.time.elapsedMS;


    // controls.js
    handleKeyLocks(); 
    updateControls();

}

function render () {

    timer.render();
    scores.render();

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

var restart = function() {

    if( !restarting ) {

        restarting = true;

         // player.js
        resetPlayer();

        // interactive.js
        resetCoins();

        // effects.js
        resetEffects();

        // enemies.js
        resetEnemies();

        // camera
        game.camera.y = 0;
        
        // controls
        game.input.enabled = true;

        // timer
        timer.start = Date.now();

        restarting = false;
    } 
    
    
}