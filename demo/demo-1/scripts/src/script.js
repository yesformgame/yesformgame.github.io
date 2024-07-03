var game = new Phaser.Game( 1920, ( window.innerHeight * 1920 ) / window.innerWidth , Phaser.CANVAS, 'main', { preload: preload, create: create, update: update, render: render });
// MODIFIED TO NOT USE game.canvas.style.display = 'block'
// on line 62330

function preload() {

    game.load.tilemap(      'new-level',    'assets/imgs/tilemap.json', null, Phaser.Tilemap.TILED_JSON );
    game.load.spritesheet(  'dude',         'assets/imgs/cursor/cursor-sprites.png', 32, 80 );
    game.load.image(        'tiles',        'assets/imgs/tiles.png', 10, 10 );
    game.load.pack(         'sprites',      'assets/pack.json', null, this);

    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    if( !game.device.desktop ) game.canvas.classList.add( 'mobile' );

}

// globals
var DEBUG = false;
var startButton = document.getElementById( 'start-game' );
var rotateScreen = document.getElementById( 'portrait' );

// player
var player;
var levelStart = { x: 130, y: 540 };
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

// custom camera offset
var cameraOffset = { y : 0, tweens: {} };

// background
var banner;
var nameLabel, emailLabel, passwordLabel, 
    passwordConfirmLabel, addressLabel;

// interactive
var coins, asterisks, vacuums, warpUps, warpDowns;
var grabbedCoins = 0;

// audio
var music;

// arcade movement
var accel = 1650;
var jumpHeight = 400;
var vacuumSpeed = 300;
var maxFallSpeed = 600;

// gui
var gui = new dat.GUI();
gui.add( window, 'DEBUG' );
gui.add( window, 'accel', 200, 2000 ).step( 100 );
gui.add( window, 'jumpHeight', 100, 500 ).step( 25 );
gui.add( window, 'vacuumSpeed', 100, 500 ).step( 25 );
gui.add( window, 'maxFallSpeed', 300, 700 ).step( 25 );

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

};

function create() {

    //
    // MUTE FOR DEV
    // 
    game.sound.mute = true;
    game.time.advancedTiming = true;

    // onresize
    window.onresize = function() {

        game.scale.setGameSize( 1920, ( window.innerHeight * 1920 ) / window.innerWidth );

    }

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

    // audio.js
    initAudio();

    // effects.js
    initEffects();

    // render custom fonts off screen workaround to load
    game.add.text( 
            -9999, 
            -9999,
            '',
            text.style.progress
    );


    // init game physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.TILE_BIAS = 21;
    game.physics.arcade.gravity.y = 500;
    gui.add( game.physics.arcade.gravity, 'y', 100, 1000 ).name( 'gravity' );

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

    // background.js
    initBackground();

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

    // handle sizing for mobile
    if( !game.device.desktop ) {

        game.canvas.classList.add( 'hide' );
        startButton.classList.add( 'ready' );
        rotateScreen.classList.add( 'ready' );

        startButton.onclick = startButton.ontouchstart = function( e ) {

            e.preventDefault();
            game.canvas.classList.remove( 'hide' );
            game.canvas.classList.add( 'ready' );
            startButton.style.display = 'none';
            
            // game.canvas.style.display = 'block';
            window.scrollTo( 0, 10 );
            // game.scale.startFullScreen();
            // console.log( game.scale.isFullScreen );


        }

    }

    music = game.sound.play( 'maxo' );
    music.volume = .6;
    music.loopFull();

}

function update() {

    if( !game.device.desktop ) {
        
        if( player.y - 560 < 190 ) {
            cameraOffset.y = 0;
        } else {
            if( cameraOffset.y == 0 ) {
                cameraOffset.tweens.toOffset = game.add.tween( cameraOffset );
                cameraOffset.tweens.toOffset.to( { y : 190 }, 400, Phaser.Easing.Linear.None, true );
            } 
        }
        
    } else {
        if( player.y - 560 < 50 ) {
            cameraOffset.y = 0;
        } else {
            if( cameraOffset.y == 0 ) {
                cameraOffset.tweens.toOffset = game.add.tween( cameraOffset );
                cameraOffset.tweens.toOffset.to( { y : 50 }, 400, Phaser.Easing.Linear.None, true );
            } 
        }
            
    }

    // if( game.camera.y - player.y > -240 ) {
    //     cameraOffset.tweens.toOffset = game.add.tween( cameraOffset );
    //     cameraOffset.tweens.toOffset.to( { y : cameraOffset.y - 50 }, 400, Phaser.Easing.Linear.None, true );
    // }

    game.camera.follow( player, Phaser.Camera.FOLLOW_PLATFORMER, 1, 1, 0, cameraOffset.y ); 

    // controls.js
    if( !game.paused ) {

         // timer
        timer.now += game.time.elapsedMS;

        updatePhysics();
     
        // controls.js
        handleKeyLocks(); 
        updateControls();    
        
    }
    

}

function render () {

    timer.render();
    scores.render();

    game.debug.text(game.time.fps, 300, 32 );

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