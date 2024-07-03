var updatePhysics = function( ) {

	if( !player.isDead && !player.justRestarted ) {
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
		player.body.velocity.x     *= 0.94; // with 60 fps
		if( player.body.velocity.y > maxFallSpeed ) player.body.velocity.y = maxFallSpeed;
	}

}