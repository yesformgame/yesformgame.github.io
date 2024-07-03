// 
// INTERACTIVE ELEMENTS
// 

var coins, asterisks, vacuums, warpUps, warpDowns, triggers;

var interactives = [];

var grabbedCoins = 0;

var initInteractiveElements = function () {

	// add foreground tiles 
	foreground = game.add.group();
    // foreground.enableBody = true;
	map.createFromObjects( 'Foreground Tiles', 12, 'spritesheet', 'tiles/bg-e6.png', true, false, foreground );

    foreground.forEach( function( tile ) {
         
        game.physics.enable( tile, Phaser.Physics.ARCADE );
        tile.body.allowGravity = false
        tile.body.immovable = true;

        tile.body.setCircle( 19.5 );
        tile.renderable = false;
        tile.hidden = true;
        tile.update = updateInteractiveGenerator( tile );
         
    }, this );
    interactives.push( foreground );

    // add foreground tiles 
    triggers = game.add.group();
    // triggers.enableBody = true;
    map.createFromObjects( 'Triggers', 9, 'spritesheet', 'tiles/bg-e6.png', true, false, triggers );

    triggers.forEach( function( tile ) {
         
        game.physics.enable( tile, Phaser.Physics.ARCADE );
        tile.body.allowGravity = false;
        tile.body.immovable = true;
        tile.body.setCircle( 19.5 );
        // tile.renderable = false;
        tile.hidden = true;
        tile.cacheAsBitmap = true;
        tile.update = updateInteractiveGenerator( tile );
         
    }, this );
    interactives.push( triggers );

	// add vacuums
	vacuums = game.add.group();
	// vacuums.enableBody = true;
	map.createFromObjects( 'Vacuums', 12, 'spritesheet', 'tiles/bg-e6.png', true, false, vacuums );

	vacuums.forEach( function( vacuum ) {
	     
	    game.physics.enable( vacuum, Phaser.Physics.ARCADE );
	    vacuum.body.allowGravity = false;
	    vacuum.body.immovable = true;
        vacuum.body.setCircle( 19.5 );
        vacuum.renderable = false;
        vacuum.hidden = true;
        vacuum.cacheAsBitmap = true;
        vacuum.update = updateInteractiveGenerator( vacuum );
        
	     
	}, this );
    interactives.push( vacuums );

	warpUps = game.add.group();
	// warpUps.enableBody = true;
	map.createFromObjects( 'Warp Up', 12, 'spritesheet', 'tiles/bg-e6.png', true, false, warpUps );

	warpUps.forEach( function( upWarp ) {
	     
	    game.physics.enable( upWarp, Phaser.Physics.ARCADE );
	    upWarp.body.allowGravity = false;
	    upWarp.body.immovable = true;
        upWarp.body.setCircle( 19.5 );
        upWarp.renderable = false;
        upWarp.hidden = true;
        upWarp.cacheAsBitmap = true;
        upWarp.update = updateInteractiveGenerator( upWarp );
       
	}, this );
    interactives.push( warpUps );

	warpDowns = game.add.group();
	// warpDowns.enableBody = true;
	map.createFromObjects( 'Warp Down', 12, 'spritesheet', 'tiles/bg-e6.png', true, false, warpDowns );

	warpDowns.forEach( function( downWarp ) {
	     
	    game.physics.enable( downWarp, Phaser.Physics.ARCADE );
	    downWarp.body.allowGravity = false;
	    downWarp.body.immovable = true;
        downWarp.body.setCircle( 19.5 );
        downWarp.renderable = false;
        downWarp.hidden = true;
        downWarp.cacheAsBitmap = true;
        downWarp.update = updateInteractiveGenerator( downWarp );
      
	}, this );
    interactives.push( warpDowns );

	// add items
	coins = game.add.group();
	// coins.enableBody = true;
	map.createFromObjects( 'Coins', 1, 'spritesheet', 'tiles/coin.png', true, false, coins );

	coins.forEach( function( coin ) {

        if( coin.group ) {

            groups[ coin.group ].children.push( coin );
        }

        coin.cacheAsBitmap = true;

	    game.physics.enable( coin, Phaser.Physics.ARCADE );
	    coin.body.allowGravity = false;
	    coin.body.immovable = true;
	    coin.anchor.set( .5 );
        coin.body.setCircle( 16 );
        coin.position.x += 10;
        coin.position.y += 10;

        // coin.autoCull = true;
        coin.update = updateInteractiveGenerator( coin );

	    coin.oPosition = { x: coin.position.x, y: coin.position.y };

	    coin.grabbed = false;
	     
	    coin.tweens = {}; 

	
	}, this );
    interactives.push( coins );

}

var getCoin = function( player, coin ) {

    if( !coin.grabbed && coin.visible ) {

        playCoinSound();

        // spritePop( x, y, tint, scale, count, rotation, distance, life )
        // spritePop( coin.x, coin.y, 0x79b9ff, .75, 4, false, 30 );

        coin.alpha = 0;

        coin.grabbed = true;

        if( coin.name ) {

            var thisPhrase = text[ coin.name ];

            for( var ind in thisPhrase.grabbed ) {

                if( thisPhrase.grabbed[ ind ] == 0 ) {
                    thisPhrase.grabbed[ ind ] = 1;
                    break;
                }

            }

            thisPhrase.update();

            var thisLetter = thisPhrase.renderString[ thisPhrase.renderString.length - 1 ];

            var coinLetter = game.add.bitmapText( 
                // player.x - ( headingOffset * 2 ),
                coin.x,
                coin.y,
                'vcr',
                thisLetter.toUpperCase(),
                '72'
                
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

                if( coin.name === 'country' ) {
                    text.country.renderString = 'Deutschland';
                }

                if( coin.name === 'payment' ) {
                    text.payment.renderString = 'Bank Transfer';
                }

                if( coin.name === 'idType' ) {
                    text.idType.renderString = 'Personalausweis';
                }

                if( coin.name === 'countryBilling' ) {
                    text.countryBilling.renderString = 'Deutschland';
                }

                areas[ coin.name ].isComplete = thisPhrase.isComplete;
                areas[ coin.name ].onComplete();

            }

        }

        grabbedCoins ++;

        if( grabbedCoins == coins.children.length ) {

            gameComplete();

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

        player.body.velocity.y -= vacuumSpeed;
        player.vacuumed = true;
        game.time.events.add( 250, function(){
            player.vacuumed = false;
        }, this);

    }

}

var handleDownWarps = function( player, warp ) {

    // if player going down and hasn't been warped
    if( !player.warped && player.body.velocity.y >= 0 ) {

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

        var lastFg = player.currentFg;

        // if player going down
        if( player.body.velocity.y > 0 ) {
            player.currentFg = fg.down;
        } else {
            player.currentFg = fg.up;
        }

        if( lastFg !== player.currentFg ) {


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
    gotAllCoins = false;

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
        coin.loadTexture( 'spritesheet', 'tiles/coin.png' ); 

        // reset alpha
        coin.alpha = 1;

    });

}

var handleTriggers = function( player, trigger ) {

    // console.log( 'trigger ' + trigger.name );

    if( trigger.field === 'terms' && !groups.terms.active ) {

        groups.terms.start();

    }

    if( trigger.field === 'privacy' && !groups.privacy.active ) {

        groups.privacy.start();

    }

    if( trigger.field === 'credit' && !groups.credit.active ) {

        groups.credit.start();

    }

    if( trigger.name !== player.currentLocation ) {

        var lastLocation = player.currentLocation;
        if( trigger.name != 'finish' )  player.currentLocation = trigger.name; 

        if( trigger.field === 'country' ) {
            // entering field
            groups.country.enter();
        } 

        if( trigger.field === 'payment' ) {
            // entering field
            groups.payment.enter();
        } 

        if( trigger.field === 'countryBilling' ) {
            // entering field
            groups.countryBilling.enter();
        } 

       

        if( trigger.field === 'finish' ) {

            endGame();

        }

        

        if( lastLocation !== player.currentLocation ) {

            if( !areas[ lastLocation ].isComplete ) {
                areas[ lastLocation ].onIncomplete();
            } else {
                // console.log( 'last area finished' );
            }

            if( !areas[ player.currentLocation ].isComplete ) {

                areas[ player.currentLocation ].onActive();

            }

        
        }
    } else {
        return;
    }

}

var hideInteractives = function() {

    for( var i = 0; i < interactives.length; i++ ) {

        var interactiveGroup = interactives[ i ];
        
        interactiveGroup.forEach( function( sprite ){
            if( sprite.group == player.currentLocation ) {
                sprite.visible = true;
            } else {
                sprite.visible = false;
            }
        });

    }

}

var superHideInteractives = function() {

    for( var i = 0; i < interactives.length; i++ ) {

        var interactiveGroup = interactives[ i ];
        
        interactiveGroup.forEach( function( sprite ){
            if( sprite.group == player.currentLocation ) {
                // sprite.visible = true;
                sprite.renderable = true;    
            } else {
                sprite.visible = false;
                sprite.renderable = false;
            }
        });

    }
}

var showInteractives = function() {

    for( var i = 0; i < interactives.length; i++ ) {

        var interactiveGroup = interactives[ i ];
        
        interactiveGroup.forEach( function( sprite ){
            if( sprite.group && sprite.group != player.currentLocation ) {
                sprite.visible = false;
            } else {
                if( !sprite.hidden ) sprite.visible = true;
            }
        });

    }

}

var killInteractives = function() {

    for( var i = 0; i < interactives.length; i++ ) {

        var interactiveGroup = interactives[ i ];
        
        interactiveGroup.forEach( function( sprite ){
            sprite.kill();
        });

    }

}

var interactivesRenderable = function( show ) {
    for( var i = 0; i < interactives.length; i++ ) {

        var interactiveGroup = interactives[ i ];
        
        interactiveGroup.forEach( function( sprite ){
            if( show ) {
                sprite.renderable = true;
            } else {
                sprite.renderable = false;
            }
        });

    }
}

var updateInteractiveGenerator = function( spr ) {

    var updateInteractive = function() {

        if( spr.renderable && !spr.alive && spr.position.y >= game.camera.view.top && spr.position.y <= game.camera.view.bottom ) {
            // console.log( 'heroes never die' );
            // console.log( spr );
            spr.revive();
            if( spr.hidden ) spr.renderable = false;
        } else if( spr.alive && spr.position.y < game.camera.view.top || spr.alive && spr.position.y > game.camera.view.bottom ) {
            // console.log( 'kill him!' );
            // console.log( spr );
            spr.kill();
        }

    }

    return updateInteractive;

}