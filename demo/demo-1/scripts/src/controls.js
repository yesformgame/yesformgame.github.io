// 
// GAME CONTROLS
// 

var touchControlPadding = 180;
var cursors;
var jumpButton;
var restartBtn;
var menuBtn;
var restarting = false;
var fastFallSpeed = 50;

var initControls = function() {


	if( game.device.desktop === true ) {

		// console.log( 'desktop' );
		// if desktop
		cursors 	= game.input.keyboard.createCursorKeys();
		jumpButton 	= game.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR );
		restartBtn 	= game.input.keyboard.addKey( Phaser.Keyboard.ENTER );
		game.input.keyboard.onDownCallback = function() {
			player.justRestarted = false;
			game.physics.arcade.isPaused = false;
		}

	} else {

		// console.log( 'mobile' );
		// if mobile 
		cursors = {};
		cursors.up = {};
		// on right
		jumpButton	 	= game.add.sprite( 1700, 650, 	'pad-up-flat'		);
	    cursors.down 	= game.add.sprite( 1700, 925,	'pad-down-flat'		);

	    // on left
	    // cursors.down 	= game.add.sprite( 305, 925,	'pad-down-flat'		);
	    // jumpButton	 	= game.add.sprite( 1700, 795, 	'pad-up-flat'		);

	    cursors.left 	= game.add.sprite( 170,	795,	'pad-left-flat'		);
	    cursors.right 	= game.add.sprite( 450, 795, 	'pad-right-flat'	);
		
		
		restartBtn	 	= game.add.sprite( 915, 1000, 	'pad-restart'		);


		

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

		cursors.down.blendingMode = Phaser.blendModes.MULTIPLY;
		cursors.left.blendingMode = Phaser.blendModes.MULTIPLY;
		cursors.right.blendingMode = Phaser.blendModes.MULTIPLY;
		jumpButton.blendingMode = Phaser.blendModes.MULTIPLY;
		restartBtn.blendingMode = Phaser.blendModes.MULTIPLY;

		debug.innerHTML = '';
		debug.innerHTML += "game.scale.isFullScreen = " + game.scale.isFullScreen;

	}

	// for all platforms
	menuBtn	= game.add.sprite( 20, 20, 		'pad-menu'	);
	menuBtn.inputEnabled = true;
	menuBtn.fixedToCamera = true;
	menuBtn.alpha = .25;
	menuBtn.blendingMode = Phaser.blendModes.MULTIPLY;
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

			if( player.justRestarted = false );

			var pointer = game.input.pointers[ i ];
			// debug.innerHTML += "<br> pointer " + pointer.id + ": isDown = " + pointer.isDown + ": active = " + pointer.active + ": isUp = " + pointer.isUp;
		
			if( pointer.active && game.physics.arcade.distanceToXY( cursors.down.cameraOffset, 	pointer.x, pointer.y ) < touchControlPadding || cursors.down.isDown ) {
				cursors.down.isDown = true;
				cursors.down.loadTexture( 'pad-down-pressed' );
			} else {
				cursors.down.loadTexture( 'pad-down-flat' );
			}
			if( pointer.active && game.physics.arcade.distanceToXY( cursors.right.cameraOffset, 	pointer.x, pointer.y ) < touchControlPadding || cursors.right.isDown ) {
				cursors.right.isDown = true;
				cursors.right.loadTexture( 'pad-right-pressed' );
			} else {
				cursors.right.loadTexture( 'pad-right-flat' );
			}
			if( pointer.active && game.physics.arcade.distanceToXY( cursors.left.cameraOffset, 	pointer.x, pointer.y ) < touchControlPadding || cursors.left.isDown ) {
				cursors.left.isDown = true;
				cursors.left.loadTexture( 'pad-left-pressed' );
			} else {
				cursors.left.loadTexture( 'pad-left-flat' );
			}
			if( pointer.active && game.physics.arcade.distanceToXY( jumpButton.cameraOffset, 		pointer.x, pointer.y ) < touchControlPadding || jumpButton.isDown ) {
				jumpButton.isDown = true;
				jumpButton.loadTexture( 'pad-up-pressed' );
			} else {
				jumpButton.loadTexture( 'pad-up-flat' );
			}
			if( pointer.active && game.physics.arcade.distanceToXY( restartBtn.cameraOffset, 		pointer.x, pointer.y ) < touchControlPadding || restartBtn.isDown ) {
				restartBtn.isDown = true;
			} 

		}

	}

	// update physics and world
	if( !player.isDead ) {

	   	Phaser.Keyb

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
	            player.body.velocity.y += 50;
	        }


	    } else if( player.body.state != 'standing' && player.body.onFloor() ) {


	        player.body.setStanding();

	    }
	    
	    
	    
	    if ( jumpButton.isDown && player.body.onFloor() && !lock.jump )
	    {
	        

	    	jumpSound.play();

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