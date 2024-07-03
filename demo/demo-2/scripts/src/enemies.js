// 
// ENEMIES
// 

var enemies = [];

var asterisks, asteriskLayer1, bangs, rollers;

var initEnemies = function() {

	// add asterisks
	asterisks = game.add.group();
	asterisks.enableBody = true;
	map.createFromObjects( 'Asterisks', 42, 'asterisk', 0, true, false, asterisks );

	asterisks.dropDown = {};
	asterisks.dropDown.children = [];

	asterisks.forEach( function( ast ) {
	    initAsterisk( ast );
	}, this );
	enemies.push( asterisks );

	// add asterisks
	asteriskLayer1 = game.add.group();
	asteriskLayer1.enableBody = true;
	map.createFromObjects( 'Fly By Asterisks 1', 42, 'asterisk', 0, true, false, asteriskLayer1 );

	asteriskLayer1.forEach( function( ast ) {
		ast.startsHidden = true;
	    initAsterisk( ast );
	}, this );
	enemies.push( asteriskLayer1 );

	bangs = game.add.group();
	bangs.enableBody = true;
	map.createFromObjects( 'Bangs', 43, 'bang', 0, true, false, bangs );

	bangs.forEach( function( bng ){
		initBang( bng );
	}, this );
	enemies.push( bangs );

	rollers = game.add.group();
	rollers.enableBody = true;
	map.createFromObjects( 'Rollers', 44, 'roller', 0, true, false, rollers );

	rollers.forEach( function( rlr ){
		initRoller( rlr );
	}, this );
	enemies.push( rollers );


}

var initAsterisk = function( ast ) {

	    initEnemy( ast );
	    
		ast.tweens.pump = game.add.tween( ast.scale );
	    ast.tweens.pump.to( 
	    	{ x: 1.4, y: 1.4 }, 
	    	250, 
	    	Phaser.Easing.TwoStep.Out, 
	    	true
	    );
	    ast.tweens.pump.yoyo( true, 250 );
	    ast.tweens.pump.repeat( -1, 2000 );

}

var initBang = function( bng ) {

    initEnemy( bng );

    bng.body.offset.x += 10;
    bng.body.offset.y += 10;

    if( bng.slideX ) {

    	bng.tweens.slideX = game.add.tween( bng.position );
    	bng.tweens.slideX.to( 
    		{ x: bng.slideX }, 
    		500, 
    		Phaser.Easing.Quintic.Out, 
    		true
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
    		true
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
		rlr.tweens.rollX.repeat( -1, 0 );

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

	asteriskLayer1.y = 0;
	asterisks.y = 0;

    asterisks.forEach( function( ast ) {
        ast.reset();
    });

    asteriskLayer1.forEach( function( ast ){
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
			sprite.visible = false;
		});

	}

}

var showEnemies = function() {

	for( var i = 0; i < enemies.length; i++ ) {

		var enemyGroup = enemies[ i ];
		
		enemyGroup.forEach( function( sprite ){
			sprite.visible = true;
		});

	}

}