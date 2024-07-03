var updatePhysics = function( ) {

	if( !player.isDead && !player.justRestarted ) {
		// level collisions
		if( collisions === 'dropdown' ) {
			game.physics.arcade.collide( 	player, dropDownCollisionLayer				);	
		} else {
			game.physics.arcade.collide( 	player, collisionLayer						);	
		}
		
		// foreground collision, use to detect current area
		if( collisions !== 'dropdown' ) {
			game.physics.arcade.overlap(	player, foreground, handleLocation, null, this	);

			// warp zone collisons 
			game.physics.arcade.overlap(	player, warpUps, handleUpWarps, null, this		);
			game.physics.arcade.overlap(	player, warpDowns, handleDownWarps, null, this	);
			// vacuum collisions
			game.physics.arcade.overlap(	player, vacuums, handleVacuum, null, this		);

			// trigger collisions 
			game.physics.arcade.overlap(	player, triggers, handleTriggers, null, this		);
		}

		// coin collisions
		game.physics.arcade.overlap(	player, coins, getCoin, null, this				);

		// enemy collisions
		game.physics.arcade.overlap(	player, asterisks, playerDie, null, this		);
		game.physics.arcade.overlap(	player, asteriskLayer1, playerDie, null, this		);
		game.physics.arcade.overlap(	player, bangs, playerDie, null, this		);
		game.physics.arcade.overlap(	player, rollers, playerDie, null, this		);

		// classic arcade movement
		player.body.acceleration.x  = 0.0;
		player.body.velocity.x     *= 0.94; // with 60 fps
		if( player.body.velocity.y > maxFallSpeed ) player.body.velocity.y = maxFallSpeed;
	}

}