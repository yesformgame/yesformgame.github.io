// 
// EFFECTS 
// 

var initEffects = function() {

	buildText();
	buildAreas();

}

var resetEffects = function() {

	resetText();
	// reset areas
	for( var area in areas ) {
	    var thisArea = areas[ area ];
	    thisArea.reset();
	}

}

var buildAreas = function() {

    var completeArea = function( area ) {

        return function() {

            var thisArea = areas[ area ];

            // area complete animations
            if( area === 'country' ) {
                groups.country.complete();
            }
            if( area === 'countryBilling' ) {
                groups.countryBilling.complete();
            }
            if( area === 'payment' ) {
                groups.payment.complete();
            }
            // if( area === 'idType' ) {
            //     groups.idType.complete();
            // }

            // destroy area enemies
            for( var i = 0; i < thisArea.enemies.length; i++ ) {

                var enemy = thisArea.enemies[ i ];
                enemy.die();

            }

             // destroy blue outline
            if( thisArea.images.blueOutline.sprite ) {
                if( typeof( thisArea.images.blueOutline.image ) == 'string' ) {
                    thisArea.images.blueOutline.sprite.destroy();        
                } else {
                    thisArea.images.blueOutline.sprite.visible = false;
                }
                
            }

            if( thisArea.images.redOutline.sprite ) {
                if( typeof( thisArea.images.redOutline.image ) == 'string' ) {
                    thisArea.images.redOutline.sprite.destroy();        
                } else {
                    thisArea.images.redOutline.sprite.visible = false;
                }
                
            }

            // destroy stamp
            if( thisArea.images.stamp.sprite ) {
                thisArea.images.stamp.sprite.destroy();    
            }

            // destroy strike
            if( thisArea.images.strike.sprite ) {
                thisArea.images.strike.sprite.destroy();    
            }

            if( thisArea.images.heckle ) {
                thisArea.images.heckle.visible = false;    
            }
            

            // complete images
            thisArea.images.stamp.sprite = game.add.image( 
                thisArea.images.stamp.position.x, // adjust for anchoring
                thisArea.images.stamp.position.y, // adjust for anchoring
                'spritesheet',
                thisArea.images.stamp.image 
            );

            thisArea.images.stamp.sprite.anchor.set( .5 );

            if( typeof( thisArea.images.greenOutline.image ) == 'string' ) {
                thisArea.images.greenOutline.sprite = game.add.image( 
                    thisArea.images.greenOutline.position.x - 24, // adjust for fade width 
                    thisArea.images.greenOutline.position.y - 12, // adjust for fade height
                    'spritesheet',
                    thisArea.images.greenOutline.image 
                );
            } else {
                thisArea.images.greenOutline.sprite = thisArea.images.greenOutline.image; 
                thisArea.images.greenOutline.sprite.x = thisArea.images.greenOutline.position.x;
                thisArea.images.greenOutline.sprite.y = thisArea.images.greenOutline.position.y;
                thisArea.images.greenOutline.sprite.visible = true;
                thisArea.images.greenOutline.sprite.alpha = 1;
            }

            

            bgElements.add( thisArea.images.stamp.sprite );
            fgElements.add( thisArea.images.greenOutline.sprite );

            thisArea.images.stamp.tween = game.add.tween( thisArea.images.stamp.sprite.scale );
            thisArea.images.stamp.tween.from( { x: .1, y: .1 }, 333, Phaser.Easing.FourStepBack.Out, true );

            thisArea.images.stamp.tween.onComplete.add( function(){
                var stampPop = {
                    x: thisArea.images.stamp.sprite.x,
                    y: thisArea.images.stamp.sprite.y,
                    tint: 0x03A651,
                    count: 10,
                    popDistance: 8,
                    popOffset: 50,
                    lifespan: 200,
                    scale : { x : .4, y: 1 },
                    popRotation : QPI
                };
                spritePop( stampPop );
            });
        
            thisArea.images.greenOutline.tween = game.add.tween( thisArea.images.greenOutline.sprite );
            thisArea.images.greenOutline.tween.to( { alpha: 0 }, 600, Phaser.Easing.ThreeStep.Out, true );

            thisArea.images.greenOutline.tween.onComplete.add( function(){
                if( typeof( thisArea.images.greenOutline.image ) == 'string' ) {
                    thisArea.images.greenOutline.sprite.destroy();    
                } else {
                    thisArea.images.greenOutline.sprite.visible = false;
                }
                
            });

            ding.play();
            returnCarriage.play();

        }

    };

    // 
    // FINISH 
    // 

    var activeArea = function( area ) {

        return function() {
            var thisArea = areas[ area ];

            if( areas[ player.currentLocation ].images.blueOutline.sprite ) {
                if( typeof( areas[ player.currentLocation ].images.blueOutline.image ) == 'string' ) {
                    areas[ player.currentLocation ].images.blueOutline.sprite.destroy();        
                } else {
                    areas[ player.currentLocation ].images.blueOutline.sprite.visible = false;
                }
                
            }

            if( areas[ player.currentLocation ].images.redOutline.sprite ) {
                if( typeof( areas[ player.currentLocation ].images.redOutline.image ) == 'string' ) {
                    areas[ player.currentLocation ].images.redOutline.sprite.destroy();        
                } else {
                    areas[ player.currentLocation ].images.redOutline.sprite.visible = false;
                }
                
            }

            if( typeof( thisArea.images.blueOutline.image ) == 'string' ) {
                thisArea.images.blueOutline.sprite = game.add.image( 
                    thisArea.images.blueOutline.position.x - 24, // adjust for fade width 
                    thisArea.images.blueOutline.position.y - 12, // adjust for fade height
                    'spritesheet',
                    thisArea.images.blueOutline.image 
                );
            } else {
                thisArea.images.blueOutline.sprite = thisArea.images.blueOutline.image; 
                thisArea.images.blueOutline.sprite.x = thisArea.images.blueOutline.position.x;
                thisArea.images.blueOutline.sprite.y = thisArea.images.blueOutline.position.y;
                thisArea.images.blueOutline.sprite.visible = true;
                thisArea.images.blueOutline.sprite.alpha = 1;
            }

            fgElements.add( thisArea.images.blueOutline.sprite );

        }

    }

    var incompleteArea = function( area ) {

        return function() {

            var thisArea = areas[ area ];

            // area incomplete animations

            // destroy blue outline
            if( thisArea.images.blueOutline.sprite ) {
                if( typeof( thisArea.images.blueOutline.image ) == 'string' ) {
                    thisArea.images.blueOutline.sprite.destroy();        
                } else {
                    thisArea.images.blueOutline.sprite.visible = false;
                }
                
            }

            // destroy stamp
            if( thisArea.images.strike.sprite ) {
                thisArea.images.strike.sprite.destroy();    
            }

            // incomplete images
            thisArea.images.strike.sprite = game.add.image( 
                thisArea.images.strike.position.x, // adjust for anchoring
                thisArea.images.strike.position.y, // adjust for anchoring
                'spritesheet',
                thisArea.images.strike.image 
            );

            if( thisArea.images.heckle ) {
                thisArea.images.heckle.visible = true;    
            }
            

            thisArea.images.strike.sprite.anchor.set( .5 );

            if( typeof( thisArea.images.redOutline.image ) == 'string' ) {
                thisArea.images.redOutline.sprite = game.add.image( 
                    thisArea.images.redOutline.position.x - 24, // adjust for fade width 
                    thisArea.images.redOutline.position.y - 12, // adjust for fade height
                    'spritesheet',
                    thisArea.images.redOutline.image 
                );
            } else {
                thisArea.images.redOutline.sprite = thisArea.images.redOutline.image; 
                thisArea.images.redOutline.sprite.x = thisArea.images.redOutline.position.x;
                thisArea.images.redOutline.sprite.y = thisArea.images.redOutline.position.y;
                thisArea.images.redOutline.sprite.visible = true;
                thisArea.images.redOutline.sprite.alpha = 1;
            }
            bgElements.add( thisArea.images.strike.sprite );
            fgElements.add( thisArea.images.redOutline.sprite );

            thisArea.images.strike.tween = game.add.tween( thisArea.images.strike.sprite.scale );
            thisArea.images.strike.tween.from( { x: .1, y: .1 }, 333, Phaser.Easing.FourStepBack.Out, true );

            thisArea.images.strike.tween.onComplete.add( function(){
                var strikePop = {
                    x: thisArea.images.strike.sprite.x,
                    y: thisArea.images.strike.sprite.y,
                    tint: 0xFF0000,
                    count: 10,
                    popDistance: 8,
                    popOffset: 50,
                    lifespan: 200,
                    scale : { x : .4, y: 1 },
                    popRotation : QPI
                };
                spritePop( strikePop );
            });

            // thisArea.images.redOutline.tween = game.add.tween( thisArea.images.redOutline.sprite );
            // thisArea.images.redOutline.tween.to( { alpha: 0 }, 600, Phaser.Easing.ThreeStep.Out, true );

            // thisArea.images.redOutline.tween.onComplete.add( function(){
            //     if( typeof( thisArea.images.redOutline.image ) == 'string' ) {
            //         thisArea.images.redOutline.sprite.destroy();    
            //     } else {
            //         thisArea.images.redOutline.sprite.visible = false;
            //     }
                
            // });

         }

    };

    var resetArea = function( area ) {

        return function() {

            var thisArea = areas[ area ];

            thisArea.isComplete = false;

            // remove effect images
            for( var image in thisArea.images ) {

                if( thisArea.images[ image ].tween ) {
                    thisArea.images[ image ].tween.stop();
                }

                if( thisArea.images[ image ].sprite ) {
                    if( typeof( thisArea.images[ image ] ) == 'string' ) {
                        thisArea.images[ image ].sprite.destroy();    
                    } else {
                        thisArea.images[ image ].sprite.visible = false;    
                    }
                }

            }
        }

    };

    for( var i = 0; i < fields.length; i++ ) {

        var field = fields[ i ];
        areas[ field ] = {};
        areas[ field ].enemies = [];
        areas[ field ].text = fieldText[ field ];
        areas[ field ].images = fieldImages[ field ];
        areas[ field ].onComplete = completeArea( field );
        areas[ field ].onActive = activeArea( field );
        areas[ field ].onIncomplete = incompleteArea( field );
        areas[ field ].reset = resetArea( field );

    }


}

var buildText = function() {

    var fieldUpdate = function( thisField ) {

        return function() { 
            // destroy old text and reset
            text[ thisField ].renderString = '';

            // update the amount of grabbed coins on the thisField
            for( var i = 0; i < text[ thisField ].grabbed.length; i++ ) {
                var isGrabbed = text[ thisField ].grabbed[ i ];
                if( isGrabbed ) {
                    text[ thisField ].renderString += text[ thisField ].string[ i ];
                    if( text[ thisField ].string[ i ] == ' ' ) {
                        // handle spaces
                        // text[ thisField ].renderString += text[ thisField ].string[ i + 1 ];
                        text[ thisField ].grabbed[ i + 1 ] = 1;
                    }
                } else {
                    text[ thisField ].renderString += '';
                }
            }

            // check if string is complete
            if( text[ thisField ].renderString.length == text[ thisField ].string.length ) {
                text[ thisField ].isComplete = true;
            }

        }
        
    }

    var fieldRender = function( thisField ) {

        return function() {

            // destroy currently rendered text
            // if( text[ thisField ].inGame && text[ thisField ].isComplete ) {
            //     text[ thisField ].inGame.destroy();
            // }

            // render text
            // check if string is complete
            if( text[ thisField ].isComplete ) {
                if( text[ thisField ].inGame ) {
                    text[ thisField ].inGame.destroy();
                }
                text[ thisField ].inGame = game.add.bitmapText( 
                    text[ thisField ].position.x, 
                    text[ thisField ].position.y,
                    'graphik',
                    text[ thisField ].renderString,
                    '80'
                );
                bgElements.add( text[ thisField ].inGame );
            } else {
                if( text[ thisField ].inGame ) {
                    text[ thisField ].inGame.setText( text[ thisField ].renderString );
                } else {
                    text[ thisField ].inGame = game.add.bitmapText( 
                        text[ thisField ].position.x, 
                        text[ thisField ].position.y,
                        'graphik-gray',
                        text[ thisField ].renderString,
                        '80'
                    );    
                    bgElements.add( text[ thisField ].inGame );
                }
                
            }

            

        }

    }

    for( var field in fieldText ) {

        text[ field ] = {};
        text[ field ].string = fieldText[ field ].text;
        text[ field ].renderString = '';
        text[ field ].position = fieldText[ field ].position;
        text[ field ].grabbed = [];
        for( var i = 0; i < text[ field ].string.length; i++ ) {
            text[ field ].grabbed.push( 0 );
        }

        text[ field ].update = fieldUpdate( field );
        text[ field ].render = fieldRender( field );

    }

}

var resetText = function() {

    for( var field in fieldText ) {
        text[ field ].renderString = '';
        text[ field ].isComplete = false;
        if( text[ field ].inGame ) {
            text[ field ].inGame.destroy();
            text[ field ].inGame = game.add.bitmapText( 
                text[ field ].position.x, 
                text[ field ].position.y,
                'graphik-gray',
                text[ field ].renderString,
                '80'
            );    
            bgElements.add( text[ field ].inGame );
        }

        for( var i = 0; i < text[ field ].grabbed.length; i++ ) {
            text[ field ].grabbed[ i ] = 0;
        }
    }

}

var spritePop = function( options ) {

    
    var opt = options || {};
    var x = opt.x || console.warn( 'sprite pop requires an option "x"' );
    var y = opt.y || console.warn( 'sprite pop requires an option "y"' );
    var count = opt.count || 4;
    var popDistance = opt.popDistance || 50;
    var popOffset = opt.popOffset || 0;
    var lifespan = opt.lifespan || 500;
    var tint = opt.tint || 0x000000;
    var scale = opt.scale || { x : 1, y : 1 };
    var easing = opt.easing || Phaser.Easing.TwoStep.Out;
    var rotOff = opt.popRotation || Math.random();
    var turn = opt.turnRotation || false;

    for( var i = 0; i < count; i++ ) {

        var radX = Math.sin( rotOff + ( PI2 * ( i / count ) ) );
        var radY = Math.cos( rotOff + ( PI2 * ( i / count ) ) );
        var circle = { 
            x : x + popOffset * radX + popDistance * radX,
            y : y + popOffset * radY + popDistance * radY
        }
        var particle = game.add.image( x + popOffset * radX, y + popOffset * radY, 'spritesheet', 'tiles/white-piece.png' );
        particle.anchor.set( .5 );
        particle.scale.x = scale.x;
        particle.scale.y = scale.y;
        particle.tint = tint;
        particle.fly = game.add.tween( particle.position );
        particle.position.parent = particle;
        particle.rotation = Math.atan( -( ( circle.x - x ) / ( circle.y - y ) ) );
        particle.fly.to( { x : circle.x, y: circle.y }, lifespan, easing, true );
        particle.fly.onComplete.add( function( p ){
            p.parent.destroy();
        });

    }

}

var skipGame = function() {

    // game.pause = true;
    cameraOverride = true;
    game.camera.unfollow();
    game.panDown = game.add.tween( game.camera );
    game.panDown.to( { y : 10080 - game.height / 2 }, 5000, Phaser.Easing.Linear.None, true ); 
    game.panDown.onComplete.add( function(){

        showFinalPage();
        skippingGame = false;

    });

}