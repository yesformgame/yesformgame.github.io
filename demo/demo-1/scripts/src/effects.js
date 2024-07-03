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

            // destroy area enemies
            for( var i = 0; i < thisArea.enemies.length; i++ ) {

                var enemy = thisArea.enemies[ i ];
                enemy.die();

            }

            // destroy strike
            if( thisArea.images.strike.sprite ) {
                thisArea.images.strike.sprite.destroy();    
            }

            // complete images
            thisArea.images.stamp.sprite = game.add.sprite( 
                thisArea.images.stamp.position.x + 25, // adjust for anchoring
                thisArea.images.stamp.position.y + 25, // adjust for anchoring
                thisArea.images.stamp.image 
            );

            thisArea.images.stamp.sprite.anchor.set( .5 );

            thisArea.images.greenOutline.sprite = game.add.sprite( 
                thisArea.images.greenOutline.position.x - 45, // adjust for fade width 
                thisArea.images.greenOutline.position.y - 35, // adjust for fade height
                thisArea.images.greenOutline.image 
            );

            bgElements.add( thisArea.images.stamp.sprite );
            bgElements.add( thisArea.images.greenOutline.sprite );

            thisArea.images.stamp.tween = game.add.tween( thisArea.images.stamp.sprite.scale );
            thisArea.images.stamp.tween.from( { x: .1, y: .1 }, 1200, Phaser.Easing.Elastobounce.Out, true );

            thisArea.images.greenOutline.tween = game.add.tween( thisArea.images.greenOutline.sprite );
            thisArea.images.greenOutline.tween.to( { alpha: 0 }, 1500, Phaser.Easing.Circular.Out, true );

            ding.play();
            returnCarriage.play();

        }

    };

    var incompleteArea = function( area ) {

        return function() {

            var thisArea = areas[ area ];

            // area incomplete animations

            // incomplete images
            thisArea.images.strike.sprite = game.add.sprite( 
                thisArea.images.strike.position.x + 25, // adjust for anchoring
                thisArea.images.strike.position.y + 25, // adjust for anchoring
                thisArea.images.strike.image 
            );

            thisArea.images.strike.sprite.anchor.set( .5 );

            thisArea.images.redOutline.sprite = game.add.sprite( 
                thisArea.images.redOutline.position.x - 45, // adjust for fade width 
                thisArea.images.redOutline.position.y - 35, // adjust for fade height
                thisArea.images.redOutline.image 
            );

            bgElements.add( thisArea.images.strike.sprite );
            bgElements.add( thisArea.images.redOutline.sprite );

            thisArea.images.strike.tween = game.add.tween( thisArea.images.strike.sprite.scale );
            thisArea.images.strike.tween.from( { x: .1, y: .1 }, 1200, Phaser.Easing.Elastobounce.Out, true );

            thisArea.images.redOutline.tween = game.add.tween( thisArea.images.redOutline.sprite );
            thisArea.images.redOutline.tween.to( { alpha: 0 }, 1500, Phaser.Easing.Circular.Out, true );

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
                    thisArea.images[ image ].sprite.destroy();
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
            if( text[ thisField ].inGame ) {
                text[ thisField ].inGame.destroy();
            }

            // render text
            // check if string is complete
            if( text[ thisField ].isComplete ) {
                text[ thisField ].inGame = game.add.text( 
                    text[ thisField ].position.x, 
                    text[ thisField ].position.y,
                    text[ thisField ].renderString,
                    text.style.complete
                );
            } else {
                text[ thisField ].inGame = game.add.text( 
                    text[ thisField ].position.x, 
                    text[ thisField ].position.y,
                    text[ thisField ].renderString,
                    text.style.progress
                );
            }

            bgElements.add( text[ thisField ].inGame );

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

        // 
        // TEXT PROBLEMS
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
        }

        for( var i = 0; i < text[ field ].grabbed.length; i++ ) {
            text[ field ].grabbed[ i ] = 0;
        }
    }

}

