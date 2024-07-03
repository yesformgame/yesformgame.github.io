// 
// GAME CONTROLS
// 

var initControls = function() {

	cursors = game.input.keyboard.createCursorKeys();
	jumpButton = game.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR );
	restartBtn = game.input.keyboard.addKey( Phaser.Keyboard.ENTER );

}

var updateControls = function() {

	if( !player.isDead ) {

	    // level collisions
	    game.physics.arcade.collide(player, collisionLayer);

	    // coin collisions
	    game.physics.arcade.overlap(player, coins, getCoin, null, this);

	    // asterisks collisions
	    game.physics.arcade.overlap(player, asterisks, playerDie, null, this);

	    // vacuum collisions
	    game.physics.arcade.overlap(player, vacuums, handleVacuum, null, this);

	    // warp zone collisons 
	    game.physics.arcade.overlap(player, warpUps, handleUpWarps, null, this);
	    game.physics.arcade.overlap(player, warpDowns, handleDownWarps, null, this);

	    // foreground collision, use to detect current area
	    game.physics.arcade.overlap(player, foreground, handleLocation, null, this);

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
	    else if (cursors.right.isDown)
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