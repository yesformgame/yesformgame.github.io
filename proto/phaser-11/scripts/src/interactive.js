// 
// INTERACTIVE ELEMENTS
// 

var initInteractiveElements = function () {

	// add foreground tiles 
	foreground = game.add.group();
    foreground.enableBody = true;
	map.createFromObjects('Foreground Tiles', 141, 'background-color', 0, true, false, foreground);

    foreground.forEach( function( tile ) {
         
        game.physics.enable( tile, Phaser.Physics.ARCADE );
        tile.body.allowGravity = false;
        tile.body.immovable = true;
         
    }, this );

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
	    coin.anchor.set( .5 );

	    coin.oPosition = { x: coin.position.x, y: coin.position.y };

	    coin.grabbed = false;
	     
	    coin.tweens = {}; 
	    coin.tweens.hop = {};
	    coin.tweens.hop.timer = setInterval( function(){
	        if( coin.tweens.hop.tween ) {
	            coin.tweens.hop.tween.stop();
	        }
	        coin.tweens.hop.tween = game.add.tween( coin.position );
	        coin.tweens.hop.tween.to({ y: coin.position.y - 2 }, 500, Phaser.Easing.Bounce.Out, true, game.rnd.integerInRange( 0, 500 ), 0, true);
	    }, game.rnd.integerInRange( 2001, 3000 ) );
	
	}, this );

}

var getCoin = function( player, coin ) {

    if( !coin.grabbed ) {

    	coin.tweens.grabFloat = {};
        coin.tweens.grabFloat.tween = game.add.tween( coin.position ).to( 
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

        coin.tweens.grabGrow = {};
        coin.tweens.grabGrow.tween = game.add.tween( coin.scale ).to( 
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

        coin.tweens.grabHide = {};
        coin.tweens.grabHide.tween = game.add.tween( coin ).to( 
            { 
                alpha: 0
            }, 
            100, 
            Phaser.Easing.Back.Out, 
            true, 
            300, 
            0, 
            false 
        );

        coin.grabbed = true;

        if( coin.field ) {

            for( var ind in text[ coin.field ].grabbed ) {

                if( text[ coin.field ].grabbed[ ind ] == 0 ) {
                    text[ coin.field ].grabbed[ ind ] = 1;
                    break;
                }

            }

            text[ coin.field ].update();

            if( text[ coin.field ].isComplete ) {

                areas[ coin.field ].isComplete = text[ coin.field ].isComplete;
                areas[ coin.field ].onComplete();

            }

        }

        grabbedCoins ++;

        if( grabbedCoins == coins.children.length ) {

        	scores.times.push( Date.now() - timer.start );
        	scores.update( );

        }

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