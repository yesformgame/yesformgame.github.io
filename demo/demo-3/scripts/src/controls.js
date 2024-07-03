// 
// GAME CONTROLS
// 

var touchControlPadding = touchControlPaddingInit = 180;
var cursors;
var jumpButton;
var restartBtn;
var menuBtn;
var restarting = false;
var fastFallSpeed = 50;

var initControls = function() {

	console.log( 'init controls' );

	if( game.device.desktop === true ) {

		// console.log( 'desktop' );
		// if desktop
		cursors 	= game.input.keyboard.createCursorKeys();
		jumpButton 	= game.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR );
		restartBtn 	= game.input.keyboard.addKey( Phaser.Keyboard.ENTER );
		game.input.keyboard.onDownCallback = function() {
			if( player.justRestarted ) {
				// activate first area
				areas[ player.currentLocation ].onActive();
				player.justRestarted = false;
				game.physics.arcade.isPaused = false;
			}
			
		}

	} else {

		// console.log( 'mobile' );
		// if mobile 
		cursors = {

			layout : {
				current : 'right',
				rightHanded : {

					left : { x : 170, y : game.height - 275 },
					right : { x : 450, y : game.height - 275 },
					down : { x : 1700, y : game.height - 150 },
					jump : { x : 1700, y : game.height - 425 }

				},
				leftHanded : {

					left : { x : 1420, y : game.height - 275 },
					right : { x : 1700, y : game.height - 275 },
					down : { x : 170, y : game.height - 150 },
					jump : { x : 170, y : game.height - 425 }

				}
			}

		};

		// rightHanded : {

		// 			left : { x : 170, y : 795 },
		// 			right : { x : 450, y : 795 },
		// 			down : { x : 1700, y : 925 },
		// 			jump : { x : 1700, y : 650 }

		// 		},

		cursors.up = {};
		// on right

		jumpButton	 	= game.add.image( cursors.layout.rightHanded.jump.x, cursors.layout.rightHanded.jump.y, 'spritesheet',	'controls/control-up.png'		);
	    cursors.down 	= game.add.image( cursors.layout.rightHanded.down.x, cursors.layout.rightHanded.down.y, 'spritesheet',	'controls/control-down.png'		);
	    cursors.left 	= game.add.image( cursors.layout.rightHanded.left.x, cursors.layout.rightHanded.left.y, 'spritesheet',	'controls/control-left.png'		);
	    cursors.right 	= game.add.image( cursors.layout.rightHanded.right.x, cursors.layout.rightHanded.right.y,  'spritesheet', 'controls/control-right.png'	);
		

		restartBtn	 	= game.add.image( 915, game.height - 120,  'spritesheet', 'controls/restart.png'		);

		cursors.down.anchor.set( .5 );
		cursors.left.anchor.set( .5 );
		cursors.right.anchor.set( .5 );
		jumpButton.anchor.set( .5 );	

		cursors.down.fixedToCamera = true;
		cursors.left.fixedToCamera = true;
		cursors.right.fixedToCamera = true;
		jumpButton.fixedToCamera = true;
		restartBtn.fixedToCamera = true;

		cursors.down.init = { x : cursors.down.x, y : cursors.down.y };
		cursors.left.init = { x : cursors.left.x, y : cursors.left.y };
		cursors.right.init = { x : cursors.right.x, y : cursors.right.y };
		jumpButton.init = { x : jumpButton.x, y : jumpButton.y };
		restartBtn.init = { x : restartBtn.x, y : restartBtn.y };

		cursors.down.alpha = 1;
		cursors.left.alpha = 1;
		cursors.right.alpha = 1;
		jumpButton.alpha = 1;
		restartBtn.alpha = 1;

		// cursors.down.blendingMode = Phaser.blendModes.LIGHTEN;
		// cursors.left.blendingMode = Phaser.blendModes.LIGHTEN;
		// cursors.right.blendingMode = Phaser.blendModes.LIGHTEN;
		// jumpButton.blendingMode = Phaser.blendModes.LIGHTEN;
		// restartBtn.blendingMode = Phaser.blendModes.LIGHTEN;

		// debug.innerHTML = '';
		// debug.innerHTML += "game.scale.isFullScreen = " + game.scale.isFullScreen;

	}

	// for all platforms
	menuBtn	= game.add.image( 40, 20, 'spritesheet', 'controls/settings.png'	);
	menuBtn.inputEnabled = true;
	menuBtn.fixedToCamera = true;
	menuBtn.init = { x: menuBtn.x, y: menuBtn.y };
	menuBtn.hitArea = new Phaser.Rectangle(-20, -20, 60, 60);

	// menuBtn.blendingMode = Phaser.blendModes.LIGHTEN;
	menuBtn.events.onInputUp.add(function () {

		if( !menuScreen ) {
			showMenu();
		} else {
			hideMenu();
		}

	});


}

var updateControlPositions = function() {

	jumpButton.fixedToCamera = false;
	cursors.down.fixedToCamera = false;
	cursors.left.fixedToCamera = false;
	cursors.right.fixedToCamera = false;
	restartBtn.fixedToCamera = false;

	jumpButton.y 	= jumpButton.init.y 	= ( ( game.height - 425 ) / zoom.y );
	cursors.down.y 	= cursors.down.init.y 	= ( ( game.height - 150 ) / zoom.y );
	cursors.left.y 	= cursors.left.init.y 	= ( ( game.height - 275 ) / zoom.y );
	cursors.right.y = cursors.right.init.y 	= ( ( game.height - 275 ) / zoom.y );
	restartBtn.y 	= restartBtn.init.y 	= ( ( game.height - 120 ) / zoom.y );

	jumpButton.fixedToCamera = true;
	cursors.down.fixedToCamera = true;
	cursors.left.fixedToCamera = true;
	cursors.right.fixedToCamera = true;
	restartBtn.fixedToCamera = true;

}

var updateControls = function() {

	
	if( game.device.desktop != true  ) {

		cursors.down.isDown = false;
		cursors.left.isDown = false;
		cursors.right.isDown = false;
		jumpButton.isDown = false;
		restartBtn.isDown = false;


		for( var i = 0; i < game.input.pointers.length; i++ ) {

			if( player.justRestarted ){
				player.justRestarted = false;
				game.physics.arcade.isPaused = false;
				areas[ player.currentLocation ].onActive();
			}

			var pointer = game.input.pointers[ i ];
			// debug.innerHTML += "<br> pointer " + pointer.id + ": isDown = " + pointer.isDown + ": active = " + pointer.active + ": isUp = " + pointer.isUp;
		
			if( pointer.active && game.physics.arcade.distanceToXY( cursors.down.cameraOffset, 	pointer.x, pointer.y ) < touchControlPadding || cursors.down.isDown ) {
				cursors.down.isDown = true;
				cursors.down.wasPressed = true;
				cursors.down.loadTexture( 'spritesheet', 'controls/control-down-pressed.png' );
			} else {
				
				if( cursors.down.wasPressed ) {
					cursors.down.loadTexture( 'spritesheet', 'controls/control-down.png' );	
					cursors.down.wasPressed = false;	
				}
				
			}
			if( pointer.active && game.physics.arcade.distanceToXY( cursors.right.cameraOffset, 	pointer.x, pointer.y ) < touchControlPadding || cursors.right.isDown ) {
				cursors.right.isDown = true;
				cursors.right.wasPressed = true;
				cursors.right.loadTexture( 'spritesheet', 'controls/control-right-pressed.png' );
			} else {
				if( cursors.right.wasPressed ) {
					cursors.right.loadTexture( 'spritesheet', 'controls/control-right.png' );	
					cursors.right.wasPressed = false;	
				}
			}
			if( pointer.active && game.physics.arcade.distanceToXY( cursors.left.cameraOffset, 	pointer.x, pointer.y ) < touchControlPadding || cursors.left.isDown ) {
				cursors.left.isDown = true;
				cursors.left.wasPressed = true;
				cursors.left.loadTexture( 'spritesheet', 'controls/control-left-pressed.png' );
			} else {
				if( cursors.left.wasPressed ) {
					cursors.left.loadTexture( 'spritesheet', 'controls/control-left.png' );	
					cursors.left.wasPressed = false;	
				}
			}
			if( pointer.active && game.physics.arcade.distanceToXY( jumpButton.cameraOffset, 		pointer.x, pointer.y ) < touchControlPadding || jumpButton.isDown ) {
				jumpButton.isDown = true;
				jumpButton.wasPressed = true;
				jumpButton.loadTexture( 'spritesheet', 'controls/control-up-pressed.png' );
			} else {
				if( jumpButton.wasPressed ) {
					jumpButton.loadTexture( 'spritesheet', 'controls/control-up.png' );	
					jumpButton.wasPressed = false;	
				}
			}
			if( pointer.active && game.physics.arcade.distanceToXY( restartBtn.cameraOffset, 		pointer.x, pointer.y ) < touchControlPadding || restartBtn.isDown ) {
				restartBtn.isDown = true;
			} 

		}

	}

	// update physics and world
	if( !player.isDead && !controlOverride && !stopTime ) {

		if( controlPageGroup ) {
			if( controlPageGroup.visible && cursors.left.isDown || cursors.right.isDown || cursors.down.isDown || jumpButton.isDown ) {
				controlPageGroup.visible = false;
			}
		}
		

		if( !player.body.onFloor() && player.body.state != 'jumping' && !player.justRestarted )
		{
		    
		    if( cursors.left.isDown ) {
		        player.animations.play( 'jump-left' ); 
		    } else {
		        player.animations.play( 'jump-right' ); 
		    }
		    player.body.setJumping();
		    facing = 'jump';
		}

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
	        } else if ( !player.body.onFloor() && !lock.down && !player.fallLock )
	        {
	            player.body.velocity.y += 50;
	        }


	    } else if( player.body.state != 'standing' && player.body.onFloor() ) {

	        player.body.setStanding();

	    }
	    
	    
	    
	    if ( jumpButton.isDown  && player.body.onFloor() && !lock.jump && !lock.up || 
	         cursors.up.isDown  && player.body.onFloor() && !lock.jump && !lock.up )
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
	        
	        
	        if( cursors.left.isDown ) {
	            player.animations.play( 'jump-left' ); 
	        } else {
	            player.animations.play( 'jump-right' ); 
	        }
	        player.body.setJumping();
	        facing = 'jump';
	        
	    }

	}

	if( restartBtn.isDown ) {

	    restart();

	}

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