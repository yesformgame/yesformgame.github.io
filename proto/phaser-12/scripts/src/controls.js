// 
// GAME CONTROLS
// 

var touchControlPadding = 200;
var cursors;
var jumpButton;
var restartBtn;
var menuBtn;
var restarting = false;

var initControls = function() {


	if( game.device.desktop === true ) {

		// console.log( 'desktop' );
		// if desktop
		cursors 	= game.input.keyboard.createCursorKeys();
		jumpButton 	= game.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR );
		restartBtn 	= game.input.keyboard.addKey( Phaser.Keyboard.ENTER );

	} else {

		// console.log( 'mobile' );
		// if mobile 
		cursors = {};
		cursors.up = {};
	    cursors.down 	= game.add.sprite( 1700, 925,	'pad-down-flat'		);
	    cursors.left 	= game.add.sprite( 170,	795,	'pad-left-flat'		);
	    cursors.right 	= game.add.sprite( 450, 795, 	'pad-right-flat'	);
		jumpButton	 	= game.add.sprite( 1700, 650, 	'pad-up-flat'		);
		restartBtn	 	= game.add.sprite( 915, 1000, 	'pad-restart'	);
		

		cursors.down.anchor.set( .5 );
		cursors.left.anchor.set( .5 );
		cursors.right.anchor.set( .5 );
		jumpButton.anchor.set( .5 );	

		cursors.down.fixedToCamera = true;
		cursors.left.fixedToCamera = true;
		cursors.right.fixedToCamera = true;
		jumpButton.fixedToCamera = true;
		restartBtn.fixedToCamera = true;

		cursors.down.alpha = .25;
		cursors.left.alpha = .25;
		cursors.right.alpha = .25;
		jumpButton.alpha = .25;
		restartBtn.alpha = .25;
		

		debug.innerHTML = '';
		debug.innerHTML += "game.scale.isFullScreen = " + game.scale.isFullScreen;

	}

	// for all platforms
	menuBtn	= game.add.sprite( 20, 20, 		'pad-menu'	);
	menuBtn.inputEnabled = true;
	menuBtn.fixedToCamera = true;
	menuBtn.alpha = .25;
	menuBtn.events.onInputUp.add(function () {

		if( !game.paused ) {
			showMenu();
		} else {
			hideMenu();
		}

	});

}

var updateControls = function() {

	
	if( game.device.desktop != true  ) {

		cursors.down.isDown = false;
		cursors.left.isDown = false;
		cursors.right.isDown = false;
		jumpButton.isDown = false;
		restartBtn.isDown = false;

		// debug.innerHTML = '';

		for( var i = 0; i < game.input.pointers.length; i++ ) {

			var pointer = game.input.pointers[ i ];
			// debug.innerHTML += "<br> pointer " + pointer.id + ": isDown = " + pointer.isDown + ": active = " + pointer.active + ": isUp = " + pointer.isUp;

			if( pointer.active ) {
				// debug.innerHTML += "<br> pointer " + pointer.id + ": x = " + Math.floor( pointer.x ) + ": y = " + Math.floor( pointer.y );

				if( game.physics.arcade.distanceToXY( cursors.down.cameraOffset, 	pointer.x, pointer.y ) < touchControlPadding || cursors.down.isDown ) {
					cursors.down.isDown = true;
				} 
				if( game.physics.arcade.distanceToXY( cursors.right.cameraOffset, 	pointer.x, pointer.y ) < touchControlPadding || cursors.right.isDown ) {
					cursors.right.isDown = true;
				} 
				if( game.physics.arcade.distanceToXY( cursors.left.cameraOffset, 	pointer.x, pointer.y ) < touchControlPadding || cursors.left.isDown ) {
					cursors.left.isDown = true;
				} 
				if( game.physics.arcade.distanceToXY( jumpButton.cameraOffset, 		pointer.x, pointer.y ) < touchControlPadding || jumpButton.isDown ) {
					jumpButton.isDown = true;
				} 
				if( game.physics.arcade.distanceToXY( restartBtn.cameraOffset, 		pointer.x, pointer.y ) < touchControlPadding || restartBtn.isDown ) {
					restartBtn.isDown = true;
				} 

			}
			
		}
		
	}

	// update physics and world
	if( !player.isDead ) {

	    // level collisions
	    game.physics.arcade.collide( 	player, collisionLayer							);

	    // coin collisions
	    game.physics.arcade.overlap(	player, coins, getCoin, null, this				);

	    // asterisks collisions
	    game.physics.arcade.overlap(	player, asterisks, playerDie, null, this		);

	    // vacuum collisions
	    game.physics.arcade.overlap(	player, vacuums, handleVacuum, null, this		);

	    // warp zone collisons 
	    game.physics.arcade.overlap(	player, warpUps, handleUpWarps, null, this		);
	    game.physics.arcade.overlap(	player, warpDowns, handleDownWarps, null, this	);

	    // foreground collision, use to detect current area
	    game.physics.arcade.overlap(	player, foreground, handleLocation, null, this	);

	    // classic arcade movement
	    player.body.acceleration.x  = 0.0;
	    // player.body.velocity.x     *= 0.88; // with 30 fps
	    player.body.velocity.x     *= 0.94; // with 60 fps
	    if( player.body.velocity.y > maxFallSpeed ) player.body.velocity.y = maxFallSpeed;

	    if( player.body.onFloor() && player.body.state == 'jumping' && player.body.state != 'ducking' )
	    {
	        player.body.setStanding();
	    }

	    if ( cursors.left.isDown )
	    {

	        
	        // classic arcade movement
	        player.body.acceleration.x = -accel;

	        if (facing != 'left' && player.body.onFloor() )
	        {
	            player.animations.play( 'left' ); 
	            if( player.frame == 10 ) {
	                player.animations.currentAnim.setFrame( 10, true );
	            } 

	            facing = 'left';
	        }
	    }
	    else if ( cursors.right.isDown )
	     {
	        
	        // classic arcade movement
	        player.body.acceleration.x = accel;

	        if (facing != 'right' && player.body.onFloor() )
	        {
	            player.animations.play( 'right' ); 
	            if( player.frame == 10 ) { 
	                player.animations.currentAnim.setFrame( 10, true );
	            } 
	            facing = 'right';
	        }
	    }
	    else
	    {
	        if (  facing != 'idle' && player.body.onFloor() && !cursors.down.isDown )
	        {
	            player.animations.play( 'idle' ); 

	            if( player.frame == 10 ) {
	                player.animations.currentAnim.setFrame( 10, true );
	            } 

	            facing = 'idle';
	        }
	    }

	    if ( cursors.down.isDown )
	    {

	        if ( facing != 'down' && player.body.onFloor() )
	        {
	            if( facing == 'left' ) {
	                player.animations.play( 'down-left' ); 
	            } else {
	                player.animations.play( 'down-right' ); 
	            }
	            facing = 'down';
	            if( player.body.state != 'ducking' ) { 
	                player.body.setDucking();
	            }
	        } else if ( !player.body.onFloor() && !lock.down )
	        {
	            window.fastFallSpeed = 50;
	            player.body.velocity.y += window.fastFallSpeed;
	        }


	    } else if( player.body.state != 'standing' && player.body.onFloor() ) {


	        player.body.setStanding();

	    }
	    
	    
	    
	    if ( jumpButton.isDown && player.body.onFloor() && !lock.jump )
	    {
	        
	        // long jump
	        if( cursors.down.isDown  ) {
	            player.body.velocity.y = -jumpHeight * 1.2;
	            player.body.velocity.x *= 2.5;
	            lock.down = true;
	        } else {
	            player.body.velocity.y = -jumpHeight;  
	        }

	        lock.jump = true;
	        
	        player.body.setJumping();
	        if( facing == 'left' ) {
	            player.animations.play( 'jump-left' ); 
	        } else {
	            player.animations.play( 'jump-right' ); 
	        }
	        facing = 'jump';
	        
	    }

	}

	if( restartBtn.isDown ) {

	    restart();

	}

}

var showMenu = function() {

	game.paused = true;

}

var hideMenu = function() {

	game.paused = false;

}


var handleKeyLocks = function() {

	if( !cursors.down.isDown ) {
	    lock.down = false;
	}

	if( !cursors.left.isDown ) {
	    lock.left = false;
	}

	if( !cursors.up.isDown ) {
	    lock.up = false;
	}

	if( !cursors.right.isDown ) {
	    lock.right = false;
	}

	if( !jumpButton.isDown ) {
	    lock.jump = false
	}

}

var pointerOnSprite = function( sprite ) {

	var overlap = game.physics.arcade.distanceToPointer( sprite );

}