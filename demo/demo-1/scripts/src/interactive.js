// 
// INTERACTIVE ELEMENTS
// 

var initInteractiveElements = function () {

	// add foreground tiles 
	foreground = game.add.group();
    foreground.enableBody = true;
	map.createFromObjects('Foreground Tiles', 145, 'bg-e6', 0, true, false, foreground);

    foreground.forEach( function( tile ) {
         
        game.physics.enable( tile, Phaser.Physics.ARCADE );
        tile.body.allowGravity = false;
        tile.body.immovable = true;
        tile.body.setSize( 3, 3, 3, 3 );
         
    }, this );

	// add vacuums
	vacuums = game.add.group();
	vacuums.enableBody = true;
	map.createFromObjects('Vacuums', 145, 'bg-e6', 0, true, false, vacuums);

	vacuums.forEach( function( vacuum ) {
	     
	    game.physics.enable( vacuum, Phaser.Physics.ARCADE );
	    vacuum.body.allowGravity = false;
	    vacuum.body.immovable = true;
	     
	}, this );

	warpUps = game.add.group();
	warpUps.enableBody = true;
	map.createFromObjects('Warp Up', 145, 'bg-e6', 0, true, false, warpUps);

	warpUps.forEach( function( upWarp ) {
	     
	    game.physics.enable( upWarp, Phaser.Physics.ARCADE );
	    upWarp.body.allowGravity = false;
	    upWarp.body.immovable = true;
	     
	}, this );

	warpDowns = game.add.group();
	warpDowns.enableBody = true;
	map.createFromObjects('Warp Down', 145, 'bg-e6', 0, true, false, warpDowns);

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
	    coin.anchor.set( .5 );

	    coin.oPosition = { x: coin.position.x, y: coin.position.y };

	    coin.grabbed = false;
	     
	    coin.tweens = {}; 
	    coin.tweens.hop = {};
        coin.tweens.hop.tween = game.add.tween( coin.position );
        coin.tweens.hop.tween.to({ y: coin.position.y - 2 }, 500, Phaser.Easing.Bounce.Out, true, game.rnd.integerInRange( 0, 500 ), 0, true);
        coin.tweens.hop.tween.repeatDelay( game.rnd.integerInRange( 2001, 3000 ) );
	
	}, this );

}

var getCoin = function( player, coin ) {

    if( !coin.grabbed ) {

        playCoinSound();

    	// coin.tweens.grabFloat = {};
     //    coin.tweens.grabFloat.tween = game.add.tween( coin.position ).to( 
     //        { 
     //            y: coin.position.y - 15 
     //        }, 
     //        200, 
     //        Phaser.Easing.Back.Out, 
     //        true
     //    );

     //    coin.tweens.grabGrow = {};
     //    coin.tweens.grabGrow.tween = game.add.tween( coin.scale ).to( 
     //        { 
     //            y: coin.scale.y * 1.2,
     //            x: coin.scale.x * 1.2, 
     //        }, 
     //        200, 
     //        Phaser.Easing.Back.Out, 
     //        true
     //    );

        // coin.loadTexture( 'coin-grabbed', 0 ); 



        // coin.tweens.grabHide = {};
        // coin.tweens.grabHide.tween = game.add.tween( coin ).to( 
        //     { 
        //         alpha: 0
        //     }, 
        //     100, 
        //     Phaser.Easing.Linear.None, 
        //     true
        // );

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

            var headingOffset = 1;
            if( player.facing === 1 ) {
                headingOffset = -1;
            }

            var yOff = 20;
            if( !player.body.onFloor() ) yOff = -20;

            var coinLetter = game.add.text( 
                player.x - ( headingOffset * 2 ),
                player.y + ( player.body.height * .2 ) - yOff,
                thisLetter,
                text.style.complete
            );

            coinLetter.anchor.set( .5 );
            coinLetter.scale.set( .28, .28 );

            var grabAnimTime = 250;

            setTimeout( thisPhrase.render, grabAnimTime * .6 );

            coinLetter.tweens = {};
            coinLetter.tweens.floatUp = game.add.tween( coinLetter.position ).to( 
                { 
                    y: coinLetter.position.y - 30,
                }, 
                grabAnimTime, 
                Phaser.Easing.Power2.Out, 
                true
            );

            coinLetter.tweens.scaleUp = game.add.tween( coinLetter.scale ).to( 
                { 
                    y: coinLetter.scale.y * 1.6,
                    x: coinLetter.scale.x * 1.6, 
                }, 
                grabAnimTime, 
                Phaser.Easing.Superback.Out, 
                true
            );

            coinLetter.tweens.alphaOut = game.add.tween( coinLetter ).to( 
                { 
                    alpha: 0,
                }, 
                grabAnimTime, 
                Phaser.Easing.Linear.None, 
                true,
                grabAnimTime * .75
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