// 
// ENEMIES
// 

var initEnemies = function() {

	// add asterisks
	asterisks = game.add.group();
	asterisks.enableBody = true;
	map.createFromObjects('Asterisks', 67, 'asterisk', 0, true, false, asterisks);
	asterisks.forEach( function( ast ) {

	    game.physics.enable( ast, Phaser.Physics.ARCADE );
	    ast.body.allowGravity = false;
	    ast.body.immovable = true;
	    ast.body.setSize( 16, 16, 0, 0 );
	    ast.originalPosition = { x: ast.position.x, y: ast.position.y };
	    ast.anchor.set( .5 );

	    if( ast.field ) {

	        // add enemey to area in effects
	        areas[ ast.field ].enemies.push( ast );

	    }
	     
	    ast.tweens = {};
	    ast.tweens.pump = {};
	    ast.tweens.pump.timer = setInterval( function(){
	        if( ast.tweens.pump.tween ) {
	            ast.tweens.pump.tween.stop();
	        }
	        ast.tweens.pump.tween = game.add.tween( ast.scale );
	        ast.tweens.pump.tween.to({ x: 2, y: 2 }, 500, Phaser.Easing.Bounce.Out, true, game.rnd.integerInRange( 0, 600 ), 0, true );
	    }, game.rnd.integerInRange( 3000, 5000 ) );

	    ast.die = function() {

	        ast.body.allowGravity = true;
	        ast.body.immovable = false;
	        var dY = game.rnd.integerInRange( 200, 600 );
	        var dX = 0;
	        while( !dX ) {
	            dX = game.rnd.integerInRange( -250, 250 )
	        }
	        var dAng = 0;
	        while( !dX ) {
	            dX = game.rnd.integerInRange( -180, 180 )
	        }
	        ast.body.velocity.y = dY;
	        ast.body.velocity.x = dX;
	        ast.body.angularAcceleration = dAng;

	    }

	    ast.reset = function() {

	        // remove tweens
	        for( var tName in ast.tweens ) {

	        	if( ast.tweens[ tName ].tween ) {
	        		ast.tweens[ tName ].tween.stop();	
	        	}
	            

	        }

	        ast.body.allowGravity = false;
	        ast.body.immovable = true;
	        ast.body.velocity.y = 0;
	        ast.body.velocity.x = 0;
	        ast.body.angularAcceleration = 0;

	        ast.scale.x = 1;
	        ast.scale.y = 1;
	        ast.position.set( ast.originalPosition.x, ast.originalPosition.y );

	    }
	     
	}, this );

}


var resetEnemies = function() {

    asterisks.forEach( function( ast ) {
        ast.reset();
    });

}