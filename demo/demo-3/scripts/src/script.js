
var game = new Phaser.Game( 1920 * window.devicePixelRatio, window.devicePixelRatio * ( window.innerHeight * 1920 ) / window.innerWidth , Phaser.CANVAS, 'main', { preload: preload, create: create, update: update, render: render });
// MODIFIED TO NOT USE game.canvas.style.display = 'block'

var loaderLooped = false;
var loadState = false;
var loadingTimer = setTimeout( function(){

    loaderLooped = true;
    if( loadState ) {
        window.onresize();
        restart();
        loading.style.display = 'none';
    }

}, 4250 );


function preload() {

    game.load.image(        'tiles-40-40',  'assets/imgs/tiles-40-40.png', 40, 40 );
    game.load.bitmapFont(   'graphik',      'assets/fonts/graphik.png', 'assets/fonts/graphik.xml' );
    game.load.bitmapFont(   'retina',       'assets/fonts/retina.png', 'assets/fonts/retina.xml' );
    game.load.bitmapFont(   'vcr',          'assets/fonts/vcr.png', 'assets/fonts/vcr.xml' );
    game.load.bitmapFont(   'vcr-white',    'assets/fonts/vcr-white.png', 'assets/fonts/vcr-white.xml' );
    game.load.bitmapFont(   'graphik-gray', 'assets/fonts/graphik-gray.png', 'assets/fonts/graphik-gray.xml' );
    game.load.tilemap(      'full-game',    'assets/imgs/tilemap.json', null, Phaser.Tilemap.TILED_JSON );
    game.load.spritesheet(  'dude',         'assets/imgs/cursor/cursor-sprites.png', 32, 80 );
    game.load.pack(         'sprites',      'assets/pack.json', null, this  );

    if( THE_LOGO ) {
        game.load.image(        'logo',         THE_LOGO );    
    }
    
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;


    if( !game.device.desktop ) game.canvas.classList.add( 'mobile' );

}

// background and logo for client
var BG_COLOR = BACKGROUND_COLOR || '#fffa99'; 
var THE_LOGO = LOGO_URL || false;
var OUT_LINK = LINK_OUT || 'http://yes.de';
var shareUrl = SHARE_URL || 'http://yes.de';
var shareTitle = SHARE_TITLE || 'Play the Yes! game.';

// globals
var DEBUG = false;
var startButton = document.getElementById( 'start-game' );
var rotateScreen = document.getElementById( 'portrait' );

// player
var player;
var levelStart = { x: 140, y: 400 };
var facing = 'left';

// tiles
var bg;
var map;

// level 
var levelImage, countryDropdownLevelImage,
    paymentDropdownLevelImage, idTypeDropdownLevelImage,
    countryBillingDropdownLevelImage;
var collisionLayer; 
var countryCollisionLayer, countryInteriorCollisionLayer;
var paymentCollisionLayer, paymentInteriorCollisionLayer;
var countryBillingCollisionLayer, countryBillingInteriorCollisionLayer;
var idTypeCollisionLayer, idTypeInteriorCollisionLayer;
var background, dropDownBackground, foreground;
var timer = {};
var scores = {};
var collisions = 'default';

// custom camera offset
var cameraOffset = { y : 0, tweens: {} };
var cameraOverride = false;
var resolutionOffset = 0;

var stopTime = false;
var menuScreen = false;

// audio
var music;

// arcade movement
var accel = 1650;
var jumpHeight = 400;
var vacuumSpeed = 300;
var maxFallSpeed = 600;
var controlOverride = false;


// zoom variables
var zoom, gameSize, newSize, updateDimensions, zoomTo;
var camZoomTween = { isRunning : false };
var controlsNeedUpdate = false;


// keylocks 
var lock = { 

    down: false,
    up: false,
    left: false,
    right: false,
    jump: false

};

var gotAllCoins = false;

var currentHeight = 0, lastGameHeight = 0;

var DPR = 1;

function create() {

    //
    // MUTE FOR DEV
    // 
    // game.sound.mute = true;

    game.debug.font = '36px courier';
    game.halfHeight = game.height * .5;

    if( game.device.desktop ) {
        DPR = 1;
    }

    game.scale.setGameSize( 1920 * DPR, DPR * ( window.innerHeight * 1920 ) / window.innerWidth );

    // onresize
    window.onresize = function() {
   
        game.scale.setGameSize( 1920 * DPR, DPR * ( window.innerHeight * 1920 ) / window.innerWidth );
        gameSize = Object.freeze( new Phaser.Point( game.width, game.height ) );
        newSize  = gameSize.clone();
        zoom.setTo( zoom.x, zoom.y );
        game.halfHeight = game.height * .5;
        resizeScreens();
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
        dontScaleSprite( timer.background );
        dontScaleSprite( menuBtn );  
        dontScaleSprite( settingsGroup );

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

    // audio.js
    if( !game.device.desktop ) {

    } else {
        initAudio();
    }
        

    // optimization
    // performance enhancments
    // game.time.advancedTiming = true;
    // game.camera.roundPx = false;
    // game.stage.smoothed = false;
    // game.renderer.renderSession.roundPixels = false;
    // game.stage.smooth = false;
    // game.forceSingleUpdate = true;

    // init game physics
    game.physics.startSystem( Phaser.Physics.ARCADE );
    game.physics.arcade.TILE_BIAS = 21;
    game.physics.arcade.gravity.y = 500;

    game.time.desiredFps = 60;

    // set up backgrounds
    game.stage.backgroundColor = BG_COLOR;

    // add country dropdown level image in back
    countryDropdownLevelImage = game.add.image(0, 200, 'country-dropdown-level-image');
    countryDropdownLevelImage.scale.set( 2 );
    countryDropdownLevelImage.cacheAsBitmap = true;

    // add payment dropdown level image in front of that
    paymentDropdownLevelImage = game.add.image(0, 1280, 'payment-dropdown-level-image');
    paymentDropdownLevelImage.scale.set( 2 );
    paymentDropdownLevelImage.cacheAsBitmap = true;

    // add country billing dropdown level image in front of that
    countryBillingDropdownLevelImage = game.add.image(0, 2960, 'country-billing-dropdown-level-image');
    countryBillingDropdownLevelImage.scale.set( 2 );
    countryBillingDropdownLevelImage.cacheAsBitmap = true;

    // add id type dropdown level image in front of that
    idTypeDropdownLevelImage = game.add.image(0, 4640, 'id-type-dropdown-level-image');
    idTypeDropdownLevelImage.scale.set( 2 );
    idTypeDropdownLevelImage.cacheAsBitmap = true;

    // add tilemap, and tiles
    map = game.add.tilemap( 'full-game' );
    map.addTilesetImage( 'tiles-40-40' );

    // init collision layers
    collisionLayer = map.createLayer( 'Collision Layer' );
    collisionLayer.resizeWorld();
    collisionLayer.visible = false;
    collisionLayer.renderSettings.enableScrollDelta = false;
    map.setCollisionByExclusion( [ ], true, 'Collision Layer' );


    // country dropdown
    dropdownCollisionLayer = map.createLayer( 'Dropdown CL' );
    dropdownCollisionLayer.resizeWorld();
    dropdownCollisionLayer.visible = false;
    dropdownCollisionLayer.renderSettings.enableScrollDelta = false;
    map.setCollisionByExclusion( [ ], true, 'Dropdown CL' );


    dropdownInteriorCollisionLayer = map.createLayer( 'Dropdown CLI' );
    dropdownInteriorCollisionLayer.resizeWorld();
    dropdownInteriorCollisionLayer.visible = false;
    dropdownInteriorCollisionLayer.renderSettings.enableScrollDelta = false;
    map.setCollisionByExclusion( [ ], true, 'Dropdown CLI' );

    for( var i = 0; i < dropdownInteriorCollisionLayer.layer.data.length; i++ ) { 
      var area = dropdownInteriorCollisionLayer.layer.data[ i ];
      for( var j = 0; j < area.length; j++ ) {
        var tile = area[ j ]; 
        tile.height = 1;
      } 
    }

    game.camera.bounds = game.world.bounds;

    // groups.js
    initGroups();

    // foreground elements
    fgElements = game.add.group();

    // player.js
    initPlayer();

    // interactive.js
    initInteractiveElements();
    hideInteractives();

    // background.js
    initBackground();

    // effects.js
    initEffects();

    // enemies.js
    initEnemies();
    showEnemies();

    // groups.js
    initCheckboxes();

    // in controls.js
    initControls();

    // start timer 
    timer.start = timer.firstStart = Date.now();
    timer.current = timer.now - timer.start;
    timer.background = game.add.graphics();
    timer.background.beginFill( 0x000000, 1 );
    timer.background.drawRect( 885, 20, 160, 50 );
    timer.background.init = { x : timer.background.x, y : timer.background.y };
    timer.background.fixedToCamera = true;
    timer.onScreen = game.add.bitmapText( 
        897, 
        29,
        'vcr-white',
        msToTime( timer.now )
    );
    timer.onScreen.init = { x : timer.onScreen.x, y : timer.onScreen.y };
    timer.onScreen.fixedToCamera = true;

    timer.render = function() {

        if( !game.paused || !stopTime ) {
            timer.current = Date.now() - timer.start;
            timer.onScreen.text = msToTime( timer.current );    
        }
        

    }

    // handle sizing for mobile
    if( !game.device.desktop ) {

        game.canvas.classList.add( 'hide' );
        startButton.classList.add( 'ready' );
        rotateScreen.classList.add( 'ready' );

        startButton.onclick = startButton.ontouchstart = function( e ) {

            e.preventDefault();
            initAudio();
            game.canvas.classList.remove( 'hide' );
            game.canvas.classList.add( 'ready' );
            startButton.style.display = 'none';
            updateControlPositions();
            restart();


        }

    }

    initMenu();
    initFinalScreen();
    initScoreScreen();

    // init resize before making screens
    window.onresize();

    if( game.device.desktop ) {
        initControlScreen();
    }
    
    // REMOVE CACHE NO LONGER USED
    game.cache.removeTilemap( 'full-game' );
    map.destroy();


    loadState = true;
    if( loaderLooped ) {
        window.onresize();
        restart();
        loading.style.display = 'none';
    }
    
    

}

function update() {

    // controls.js
    if( !game.paused || !stopTime ) {

        if( !game.device.desktop ) {

            if( currentHeight !== window.innerHeight ) {
                setTimeout(function() {
                    game.scale.refresh();
                    currentHeight = window.innerHeight;
                    if( controlsNeedUpdate ) {
                        updateControlPositions();
                        controlsNeedUpdate = false;
                    }
                    window.onresize();
                    
                }, 200 );
                // window.debugMessage = 'resized @' + Date.now();
            }

            if( lastGameHeight !== game.height && !controlsNeedUpdate ) {
                controlsNeedUpdate = true;
                setTimeout(function() {
                    if( !camZoomTween.isRunning ) {
                        window.onresize();
                        if( controlsNeedUpdate ) {
                            updateControlPositions();  
                            controlsNeedUpdate = false;
                        } 
                    }
                    lastGameHeight = game.height; 
                }, 200 );    
            }

            
            
            if( player.y < 520 ) {
                cameraOffset.y = 0;
            } else {
                if( cameraOffset.y == 0 ) {
                    cameraOffset.tweens.toOffset = game.add.tween( cameraOffset );
                    cameraOffset.tweens.toOffset.to( { y : 190 }, 400, Phaser.Easing.Linear.None, true );
                } 
            }
            
        } 

        if( !cameraOverride ) {
            game.camera.follow( player, Phaser.Camera.FOLLOW_PLATFORMER, 1, 1, 0, cameraOffset.y + resolutionOffset );     
        }
        
            
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

        updatePhysics();
     
        // controls.js
        handleKeyLocks(); 
        updateControls();    

        // groups.js
        updateGroups();

        // enemies.js
        // turned off
        // updateEnemies();
        
    }
    


}

function render () {

    timer.render();
    // updateDebug();

}

var restart = function() {

    if( !restarting ) {

        window.onresize();

        restarting = true;
        thankYouButton.alpha = .33;
        game.completed = false;
        stopTime = false;
        controlOverride = false;


        if( camZoomTween.isRunning ) {
            camZoomTween.stop();
        }

        // zoom
        zoomTo( 1, 50 );

        resetEnemies();

        setTimeout( function(){

            cameraOverride = false;

            game.camera.y = 0;    

            if( yesMusic ) {
                if( yesMusic.isPlaying ) {
                    music.restart();
                    yesMusic.pause();    
                    music.volume = .5;
                    music.loopFull();
                }    
            }
            
            

            // collisions
            collisions = 'default';

            heckles.hide();
            labels.show();
            shadows.show();
            
            groups.country.reset();
            groups.country.exit();    

            groups.payment.reset();
            groups.payment.exit();

            groups.countryBilling.reset();
            groups.countryBilling.exit();
        
            groups.terms.reset();
            groups.privacy.reset();
            groups.credit.reset();


            // timer
            timer.start = Date.now();

             // player.js
            resetPlayer();

            // activate first area
            areas[ player.currentLocation ].onActive();

            // interactive.js
            resetCoins();

            // effects.js
            resetEffects();

            interactivesRenderable( true );
            killInteractives(); 
            
            groups.checkboxes.hide();

            // enemies.js
            resetEnemies();

            // controls
            game.input.enabled = true;
            restarting = false;

        }, 150 );
        

        
    } 
    
    
}

var gameComplete = function() {

    game.completed = true;
    gotAllCoins = true;
    thankYouButton.alpha = 1;

}

var endGame = function() {

    if( gotAllCoins ) {

        controlOverride = true;
        finalAnimation();


    } else {

        // playerDie( player, { dead: false, visible : true } );
        controlOverride = true;
        finalAnimation();

    }

}

var finalAnimation = function() {

    player.animations.play( 'right' );
    setTimeout( function(){

        var finalTween = game.add.tween( player.position );
        finalTween.to( { x : 1250 }, 1250, Phaser.Easing.Linear.None, true );
        finalTween.onComplete.add( function(){

            thankYouButton.loadTexture( 'spritesheet', 'background/finish-thankyou.png' );    
            setTimeout( function(){

                showScorePage();

                setTimeout( function(){

                    showFinalPage();    

                    setTimeout( function(){

                        hideScorePage();

                    }, 5000 );        

                }, 5000 );

            }, 800 );

        });

    }, 1000 );

}