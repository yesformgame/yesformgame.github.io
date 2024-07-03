// 
// INTERACTIVE ELEMENTS
// 

var coins, asterisks, vacuums, warpUps, warpDowns, triggers;

var interactives = [];

var grabbedCoins = 0;

var initInteractiveElements = function () {

	// add foreground tiles 
	foreground = game.add.group();
    foreground.enableBody = true;
	map.createFromObjects('Foreground Tiles', 49, 'bg-e6', 0, true, false, foreground);

    foreground.forEach( function( tile ) {
         
        game.physics.enable( tile, Phaser.Physics.ARCADE );
        tile.body.allowGravity = false;
        tile.body.immovable = true;
        tile.body.setSize( 3, 3, 3, 3 );
         
    }, this );
    interactives.push( foreground );

    // add foreground tiles 
    triggers = game.add.group();
    triggers.enableBody = true;
    map.createFromObjects('Triggers', 12, 'bg-e6', 0, true, false, triggers);

    triggers.forEach( function( tile ) {
         
        game.physics.enable( tile, Phaser.Physics.ARCADE );
        tile.body.allowGravity = false;
        tile.body.immovable = true;
        tile.renderable = false;
         
    }, this );
    interactives.push( triggers );

	// add vacuums
	vacuums = game.add.group();
	vacuums.enableBody = true;
    // vacuums.visible = false;
	map.createFromObjects('Vacuums', 49, 'bg-e6', 0, true, false, vacuums);

	vacuums.forEach( function( vacuum ) {
	     
	    game.physics.enable( vacuum, Phaser.Physics.ARCADE );
	    vacuum.body.allowGravity = false;
	    vacuum.body.immovable = true;
        vacuum.renderable = false;
        
	     
	}, this );
    interactives.push( vacuums );

	warpUps = game.add.group();
	warpUps.enableBody = true;
    // warpUps.visible = false;
	map.createFromObjects('Warp Up', 49, 'bg-e6', 0, true, false, warpUps);

	warpUps.forEach( function( upWarp ) {
	     
	    game.physics.enable( upWarp, Phaser.Physics.ARCADE );
	    upWarp.body.allowGravity = false;
	    upWarp.body.immovable = true;
        upWarp.renderable = false;
       
	}, this );
    interactives.push( warpUps );

	warpDowns = game.add.group();
	warpDowns.enableBody = true;
    // warpDowns.visible = false;
	map.createFromObjects('Warp Down', 49, 'bg-e6', 0, true, false, warpDowns);

	warpDowns.forEach( function( downWarp ) {
	     
	    game.physics.enable( downWarp, Phaser.Physics.ARCADE );
	    downWarp.body.allowGravity = false;
	    downWarp.body.immovable = true;
        downWarp.renderable = false;
      
	}, this );
    interactives.push( warpDowns );

	// add items
	coins = game.add.group();
	coins.enableBody = true;
    coins.autoCull = true;
	map.createFromObjects('Coins', 41, 'coin', 0, true, false, coins);



	var coinCount = 0;

	coins.forEach( function( coin ) {
	     
	    coinCount ++;

        if( coin.group ) {
            groups[ coin.group ].children.push( coin );
        }


	    game.physics.enable( coin, Phaser.Physics.ARCADE );
	    coin.body.allowGravity = false;
	    coin.body.immovable = true;
	    coin.anchor.set( .5 );

        coin.position.x += 10;
        coin.position.y += 10;

	    coin.oPosition = { x: coin.position.x, y: coin.position.y };

	    coin.grabbed = false;
	     
	    coin.tweens = {}; 

	
	}, this );
    interactives.push( coins );

}

var getCoin = function( player, coin ) {

    if( !coin.grabbed ) {

        playCoinSound();

        // spritePop( x, y, tint, scale, count, rotation, distance, life )
        // spritePop( coin.x, coin.y, 0x79b9ff, .75, 4, false, 30 );

        coin.alpha = 0;

        coin.grabbed = true;

        if( coin.field ) {

            var thisPhrase = text[ coin.field ];

            for( var ind in thisPhrase.grabbed ) {

                if( thisPhrase.grabbed[ ind ] == 0 ) {
                    thisPhrase.grabbed[ ind ] = 1;
                    break;
                }

            }

            thisPhrase.update();

            var thisLetter = thisPhrase.renderString[ thisPhrase.renderString.length - 1 ];

            var coinLetter = game.add.text( 
                // player.x - ( headingOffset * 2 ),
                coin.x,
                coin.y,
                thisLetter,
                text.style.complete
            );

            coinLetter.anchor.set( .5 );
            coinLetter.scale.set( .28, .28 );

            coinLetter.x += coinLetter.width * .5;

            var grabAnimTime = 250;
            var letterPop = {

                x: 0,
                y: 0,
                tint: 0x000000,
                count: 6,
                popDistance: 1,
                popOffset: 40,
                lifespan: grabAnimTime * .5,
                scale : { x : .2, y: 1 },
                popRotation : QPI

            }

            setTimeout( thisPhrase.render, grabAnimTime * .6 );

            coinLetter.tweens = {};
            coinLetter.tweens.floatUp = game.add.tween( coinLetter.position ).to( 
                { 
                    y: coinLetter.position.y - 40,
                }, 
                grabAnimTime, 
                Phaser.Easing.TwoStep.Out, 
                true
            );

            coinLetter.tweens.floatUp.onComplete.add( function( p ){
                
                letterPop.x = p.x;
                letterPop.y = p.y;
                spritePop( letterPop );
                
            });

            coinLetter.tweens.scaleUp = game.add.tween( coinLetter.scale ).to( 
                { 
                    y: coinLetter.scale.y * 1.6,
                    x: coinLetter.scale.x * 1.6, 
                }, 
                grabAnimTime, 
                Phaser.Easing.FourStepBackSuper.Out, 
                true
            );

            coinLetter.tweens.alphaOut = game.add.tween( coinLetter ).to( 
                { 
                    alpha: 0,
                }, 
                grabAnimTime, 
                Phaser.Easing.TwoStep.Out, 
                true,
                grabAnimTime * 1.5
            );

            coinLetter.tweens.alphaOut.onComplete.add( function( sprite ) {

                sprite.destroy();

            }, this );
            



            if( thisPhrase.isComplete ) {

                areas[ coin.field ].isComplete = thisPhrase.isComplete;
                areas[ coin.field ].onComplete();

            }

        }

        grabbedCoins ++;

        if( grabbedCoins == coins.children.length ) {

        	scores.times.push( Date.now() - timer.start );
        	scores.update( );

        }

        

    }
}

var coinSoundCount = 1;
var playCoinSound = function() {

    typeSounds[ 'tone' + coinSoundCount ].play();
 
    typeSounds[ 'type' + game.rnd.integerInRange( 1, 20 ) ].play( );

    coinSoundCount + 1 > 4 ? coinSoundCount = 1 : coinSoundCount ++;

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
        player.x += parseInt( warp.warpX );
        player.y += parseInt( warp.warpY );

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
        player.x += parseInt( warp.warpX );
        player.y += parseInt( warp.warpY );

        player.warped = true;

        game.time.events.add( 250, function(){
            player.warped = false;
        }, this);

    }

}

var handleLocation = function( player, fg ) {

    if( fg.up && fg.down ) {

        var lastLocation = player.currentLocation;

        // if player going down
        if( player.body.velocity.y > 0 ) {
            player.currentLocation = fg.down;
        } else {
            player.currentLocation = fg.up;
        }

        if( lastLocation !== player.currentLocation ) {

            if( !areas[ lastLocation ].isComplete ) {
                areas[ lastLocation ].onIncomplete();
            } else {
                // console.log( 'last area finished' );
            }

            if( player.body.velocity.y > 0 ) {
                suckDown.play();
            } else {
                suckUp.play();
            }

            // handle current areas
            // if( player.currentLocation === 'name' ) {
            //     music.playLayers( 1 ); 
            // }

            // if( player.currentLocation === 'email' ) {
            //     music.playLayers( 2 );             }

            // if( player.currentLocation === 'password' ) {
            //     music.playLayers( 3 );            
            // }

            // if( player.currentLocation === 'passwordConfirm' ) {
            //     music.playLayers( 4 );
            // }

            // if( player.currentLocation === 'address' ) {
            //     music.playLayers( 5 );
            // }

            // if( player.currentLocation === 'field6' ) {
            //     music.playLayers( 6 );
            // }

            // catch for dropdown
            if( player.currentLocation === 'password' ) {
                // entering dropdown
                enterDropdown();
            } else if( player.currentLocation === 'checkbox' ) { 
                // entering checkbox

            } else {
                // entering default area
                enterDefaultArea();
            }

      
        }
    }    

}

var resetCoins = function() {

	grabbedCoins = 0;

    coins.forEach( function( coin ) {

    	for( var tName in coin.tweens ) {
        	if( coin.tweens[ tName ].tween ) {
        		coin.tweens[ tName ].tween.stop();
        	}
        }

        // turn of grabbed
        coin.grabbed = false;

        //reset scale
        coin.scale.x = 1;
        coin.scale.y = 1;

        //reset position
        coin.position.set( coin.oPosition.x, coin.oPosition.y );

        // reset texture
        coin.loadTexture( 'coin', 0 ); 

        // reset alpha
        coin.alpha = 1;

    });

}

var handleTriggers = function( player, trigger ) {

    if( trigger.field === 'checkbox1' && !groups.checkbox.alive ) {

        groups.checkbox.start();

    }


}

var hideInteractives = function() {

    for( var i = 0; i < interactives.length; i++ ) {

        var enemyGroup = interactives[ i ];
        
        enemyGroup.forEach( function( sprite ){
            sprite.visible = false;
        });

    }

}

var showInteractives = function() {

    for( var i = 0; i < interactives.length; i++ ) {

        var enemyGroup = interactives[ i ];
        
        enemyGroup.forEach( function( sprite ){
            sprite.visible = true;
        });

    }

}