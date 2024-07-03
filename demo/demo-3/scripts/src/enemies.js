// 
// ENEMIES
// 

var enemies = [];

var asterisks, termsAsterisks, privacyAsterisks, creditAsterisks, bangs, rollers;

var asteriskTweenData;

var initEnemies = function() {

	bakeTweens();

	// add asterisks
	asterisks = game.add.group();
	map.createFromObjects( 'Asterisks', 6, 'spritesheet', 'enemies/asterisk.png', true, false, asterisks );

	asterisks.forEach( function( ast ) {
	    initAsterisk( ast );
	}, this );
	enemies.push( asterisks );

	// add checkbox asterisks
	termsAsterisks = game.add.group();
	map.createFromObjects( 'Terms Asterisks', 6, 'spritesheet', 'enemies/asterisk.png',  true, false, termsAsterisks );

	termsAsterisks.forEach( function( ast ) {
		ast.noCull = true;
	    initAsterisk( ast );
	}, this );
	enemies.push( termsAsterisks );

	privacyAsterisks = game.add.group();
	map.createFromObjects( 'Privacy Asterisks', 6, 'spritesheet', 'enemies/asterisk.png',  true, false, privacyAsterisks );

	privacyAsterisks.forEach( function( ast ) {
		ast.noCull = true;
	    initAsterisk( ast );
	}, this );
	enemies.push( privacyAsterisks );

	creditAsterisks = game.add.group();
	map.createFromObjects( 'Credit Asterisks', 6, 'spritesheet', 'enemies/asterisk.png',  true, false, creditAsterisks );

	creditAsterisks.forEach( function( ast ) {
		ast.noCull = true;
	    initAsterisk( ast );
	}, this );
	enemies.push( creditAsterisks );

	bangs = game.add.group();
	map.createFromObjects( 'Bangs', 7, 'spritesheet', 'enemies/bang.png', true, false, bangs );

	bangs.forEach( function( bng ){
		initBang( bng );
	}, this );
	enemies.push( bangs );

	rollers = game.add.group();
	map.createFromObjects( 'Rollers', 2, 'spritesheet', 'enemies/roller.png', true, false, rollers );

	rollers.forEach( function( rlr ){
		initRoller( rlr );
	}, this );
	enemies.push( rollers );


}

var bakeTweens = function() {

	var scaleTweenVals = { x : 1, y : 1 }
	var tempTween = game.add.tween( scaleTweenVals );
    tempTween.to( 
    	{ x: 1.4, y: 1.4 }, 
    	250, 
    	Phaser.Easing.TwoStep.Out, 
    	true
    );
    tempTween.yoyo( true, 250 );
    tempTween.repeat( -1, 2000 );
    asteriskTweenData = tempTween.generateData( 60 );

}

var initAsterisk = function( ast ) {

    initEnemy( ast );

}

var initBang = function( bng ) {

    initEnemy( bng );

    var delay = parseInt( bng.delay ) || game.rnd.integerInRange( 0, 1000 );

    bng.body.offset.x += 10;
    bng.body.offset.y += 10;

    if( bng.slideX ) {

    	bng.tweens.slideX = game.add.tween( bng.position );
    	bng.tweens.slideX.to( 
    		{ x: bng.slideX }, 
    		500, 
    		Phaser.Easing.Quintic.Out, 
    		true,
    		delay
    	);

    	bng.tweens.slideX.yoyo( true, 250 );
    	bng.tweens.slideX.repeat( -1, 2000 );

    }

    if( bng.slideY ) {

    	bng.tweens.slideY = game.add.tween( bng.position );
    	bng.tweens.slideY.to( 
    		{ y: bng.slideY }, 
    		500, 
    		Phaser.Easing.Quintic.Out, 
    		true,
    		delay
    	);

    	bng.tweens.slideY.yoyo( true, 250 );
    	bng.tweens.slideY.repeat( -1, 2000 );

    }


}

var initRoller = function( rlr ) {

	initEnemy( rlr );
	if( rlr.rollX ) {

		rlr.tweens.rollX = game.add.tween( rlr.position );
		rlr.tweens.rollX.to( 
			{ x: rlr.rollX }, 
			5000, 
			Phaser.Easing.Linear.None,
			true
		);
		rlr.tweens.rollX.yoyo( true );
		rlr.tweens.rollX.repeat( -1 );

		var spinFlip = rlr.spinFlip || 1;
		rlr.tweens.spin = game.add.tween( rlr );
		rlr.tweens.spin.to(
			{ angle : .85 * rlr.rollX * spinFlip },
			5000,
			Phaser.Easing.Linear.None,
			true
		);
		rlr.tweens.spin.yoyo( true );
		rlr.tweens.spin.repeat( -1 );

	}

}


var resetEnemies = function() {

	termsAsterisks.y = 0;
	asterisks.y = 0;

    asterisks.forEach( function( ast ) {
        ast.reset();
    });

    termsAsterisks.forEach( function( ast ){
    	ast.reset();
    });

    privacyAsterisks.forEach( function( ast ){
    	ast.reset();
    });

    creditAsterisks.forEach( function( ast ){
    	ast.reset();
    });


    bangs.forEach( function( bng ){
    	bng.reset();
    });

    rollers.forEach( function( rlr ){
    	rlr.reset();
    });



}

var hideEnemies = function() {

	for( var i = 0; i < enemies.length; i++ ) {

		var enemyGroup = enemies[ i ];
		
		enemyGroup.forEach( function( sprite ){
			if( sprite.group == player.currentLocation ) {
				sprite.visible = true;
			} else {
				sprite.visible = false;
			}
		});

	}

}

var superHideEnemies = function() {

	for( var i = 0; i < enemies.length; i++ ) {

		var enemyGroup = enemies[ i ];
		
		enemyGroup.forEach( function( sprite ){
			if( sprite.group == player.currentLocation ) {
				sprite.renderable = true;
			} else {
				sprite.visible = false;
				sprite.renderable = false;
			}
		});

	}

}

var showEnemies = function() {

	for( var i = 0; i < enemies.length; i++ ) {

		var enemyGroup = enemies[ i ];
		
		enemyGroup.forEach( function( sprite ){
			if( sprite.group && sprite.group != player.currentLocation ) {
				sprite.visible = false;
			} else {
				sprite.visible = true;
			}
			
		});

	}

}

var enemiesRenderable = function( show ) {

	for( var i = 0; i < enemies.length; i++ ) {

		var enemyGroup = enemies[ i ];
		
		enemyGroup.forEach( function( sprite ){
			if( show && !sprite.startsHidden ) {
				sprite.renderable = true;
			} else {
				sprite.renderable = false;
			}
			
		});

	}

}

var updateEnemies = function() {


	// turned off 
	// asterisks.forEach( function( ast ) {
	// 	ast.updateTween()
	// });
	// termsAsterisks.forEach( function( ast ) {
	// 	ast.updateTween()
	// });
	// privacyAsterisks.forEach( function( ast ) {
	// 	ast.updateTween()
	// });
	// creditAsterisks.forEach( function( ast ) {
	// 	ast.updateTween()
	// });


}