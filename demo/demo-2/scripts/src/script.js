var game = new Phaser.Game( 1920, ( window.innerHeight * 1920 ) / window.innerWidth , Phaser.CANVAS, 'main', { preload: preload, create: create, update: update, render: render });
// MODIFIED TO NOT USE game.canvas.style.display = 'block'


function preload() {

    game.load.tilemap(      'new-level',    'assets/imgs/tilemap.json', null, Phaser.Tilemap.TILED_JSON );
    game.load.spritesheet(  'dude',         'assets/imgs/cursor/cursor-sprites.png', 32, 80 );
    game.load.image(        'tiles-20-20',  'assets/imgs/tiles-20-20.png', 20, 20 );
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
var levelImage, dropDownLevelImage;
var collisionLayer, dropDownCollisionLayer; 
var background, dropDownBackground, foreground;
var bgElements;
var timer = {};
var scores = {};
var collisions = 'default';

// custom camera offset
var cameraOffset = { y : 0, tweens: {} };
var resolutionOffset = 0;

// background
var banner;
var nameLabel, emailLabel, passwordLabel, 
    passwordConfirmLabel, addressLabel;

// audio
var music;

// arcade movement
var accel = 1650;
var jumpHeight = 400;
var vacuumSpeed = 300;
var maxFallSpeed = 600;


// zoom variables
var zoom, gameSize, newSize, updateDimensions, camZoomTween, zoomTo;

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
    // game.sound.mute = true;

    // 
    // ROUND OUT PIXELS
    // 
    // game.renderer.renderSession.roundPixels = true

    // onresize
    window.onresize = function() {

        game.scale.setGameSize( 1920, ( window.innerHeight * 1920 ) / window.innerWidth );
        gameSize = Object.freeze( new Phaser.Point( game.width, game.height ) );
        newSize  = gameSize.clone();
        zoom.setTo( zoom.x, zoom.y );
        updateDimensions();
        

    }

    // zoom functions and variables
    zoom     = new Phaser.Point(1, 1);
    gameSize = Object.freeze( new Phaser.Point( game.width, game.height ) );
    newSize  = gameSize.clone();

    updateDimensions = function() {

        Phaser.Point.divide( gameSize, zoom, newSize );

        newSize.floor();  

        game.scale.updateDimensions( newSize.x, newSize.y, /*resize=*/ true );
        

        // things that shouldn't change size on zoom
        dontScaleSprite( timer.onScreen );
        dontScaleSprite( scores.onScreen );
        dontScaleSprite( menuBtn );  


        if( !game.device.desktop ) {
            dontScaleSprite( cursors.down );
            dontScaleSprite( cursors.left );
            dontScaleSprite( cursors.right ); 
            dontScaleSprite( jumpButton );
            dontScaleSprite( restartBtn );  
        }

        if( zoom.x != 1 ) {
            game.input.scale.set( 1 / zoom.x, 1 / zoom.y );
        }

        touchControlPadding = touchControlPaddingInit / zoom.x;

        game.scale.refresh();

    }

    dontScaleSprite = function( thisSprite ) {
        thisSprite.scale.set( 1 / zoom.x, 1 / zoom.y );
        thisSprite.fixedToCamera = false;
        thisSprite.x = thisSprite.init.x / zoom.x ;
        thisSprite.y = thisSprite.init.y / zoom.y ;
        thisSprite.fixedToCamera = true;
    } 

    zoomTo = function( z, t ) {

        var tempZoom = { x : zoom.x, y: zoom.y };
        camZoomTween = game.add.tween( tempZoom );
        
        camZoomTween.onUpdateCallback( function(){

            zoom.setTo( tempZoom.x, tempZoom.x );
            updateDimensions();

        } );

        camZoomTween.onComplete.add( function(){

            zoom.setTo( tempZoom.x, tempZoom.x );
            updateDimensions();

        } );

        camZoomTween.onStart.add( function(){

            zoom.setTo( tempZoom.x, tempZoom.x );
            updateDimensions();

        } );

        camZoomTween.to( { x : z }, t, Phaser.Easing.Quintic.InOut, true );

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

    // set up backgrounds
    game.stage.backgroundColor = '#ffffff';

    // add dropdown level image in back
    dropDownLevelImage = game.add.sprite(0, 0, 'level-image-dropdown');
    dropDownLevelImage.resizeFrame( 0, 1920, 10000 );

    // add normal overlay level image
    levelImage = game.add.sprite(0, 0, 'level-image');
    levelImage.resizeFrame( 0, 1920, 10000 );

    // add tilemap, and tiles
    map = game.add.tilemap('new-level');
    map.addTilesetImage('tiles-20-20');

    // init collision layers
    collisionLayer = map.createLayer('Collision Layer');
    collisionLayer.resizeWorld();
    collisionLayer.visible = false;
    // // collide with everything in collison clayer
    map.setCollisionByExclusion( [ ], true, 'Collision Layer' );

    dropDownCollisionLayer = map.createLayer('Dropdown Collision Layer');
    dropDownCollisionLayer.resizeWorld();
    dropDownCollisionLayer.visible = false;
    // // collide with everything in collison clayer
    map.setCollisionByExclusion( [ ], true, 'Dropdown Collision Layer' );

    game.camera.bounds = game.world.bounds;

    // groups.js
    initGroups();

    // player.js
    initPlayer();

    // interactive.js
    initInteractiveElements();

    // background.js
    initBackground();

    // enemies.js
    initEnemies();

    groups.dropdown.hide();

    // in controls.js
    initControls();

    // start timer 
    timer.start = Date.now();
    timer.current = timer.now - timer.start;
    timer.onScreen = game.add.text( 
        900, 
        10,
        msToTime( timer.now ),
        text.style.clock
    );
    timer.onScreen.init = { x : timer.onScreen.x, y : timer.onScreen.y }
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
    scores.onScreen.init = { x : scores.onScreen.x, y : scores.onScreen.y };
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
            // if( cameraOffset.y == 0 ) {
            //     cameraOffset.tweens.toOffset = game.add.tween( cameraOffset );
            //     cameraOffset.tweens.toOffset.to( { y : 50 }, 400, Phaser.Easing.Linear.None, true );
            // } 
        }
            
    }

    game.camera.follow( player, Phaser.Camera.FOLLOW_PLATFORMER, 1, 1, 0, cameraOffset.y + resolutionOffset ); 

    // lock for zoom;
    if( game.camera.lockX ) {

        game.camera.unfollow();
        var camDiff = player.y - game.camera.y;
        if( camDiff < game.camera.height * .4 ){
            var dy = ( game.camera.height * .4 ) - camDiff;
            game.camera.x = game.camera.lockX;
            game.camera.y -= dy;
        } else if( camDiff > game.camera.height * .6 ) {
            var dy = ( game.camera.height * .6 ) - camDiff;
            game.camera.x = game.camera.lockX;
            game.camera.y -= dy;
        } else {
            game.camera.x = game.camera.lockX;
        }
        
        

    }


    // controls.js
    if( !game.paused ) {

         // timer
        timer.now += game.time.elapsedMS;

        updatePhysics();
     
        // controls.js
        handleKeyLocks(); 
        updateControls();    

        // groups.js
        updateGroups();
        
    }
    


}

function render () {

    timer.render();
    scores.render();

    // game.debug.text(game.time.fps, 300, 32 );

    // bangs.forEach( function( v ){
    //     game.debug.body( v );
    // });


    if( DEBUG ) {

        // game.debug.text(game.time.suggestedFps, 32, 32 );
        // // game.debug.text(game.time.physicsElapsed, 32, 72 );
        // game.debug.body(player);
        // game.debug.bodyInfo(player, 64, 24);
        // vacuums.forEach( function( v ){
        //     game.debug.body( v );
        // });

    }
   

}

var restart = function() {

    if( !restarting ) {

        restarting = true;

        // zoom
        zoomTo( 1, 50 );

        setTimeout( function(){
            game.camera.y = 0;    

            // collisions
            collisions = 'default';

            // enemies.js
            resetEnemies();

            // special areas
            groups.dropdown.hide();
            groups.dropdown.complete = false;
            exitDropdown();

            // background images
            levelImage.position.y = 0;

            // foreground tiles visible
            foreground.visible = true;
            
            // controls
            game.input.enabled = true;

            // timer
            timer.start = Date.now();

            // audio.js
            // music.playLayers( 1 );

            // areas.js
            enterDefaultArea();

             // player.js
            resetPlayer();

            // interactive.js
            resetCoins();

            // effects.js
            resetEffects();


            restarting = false;

        }, 150 );
        

        
    } 
    
    
}