var updatePhysics = function( ) {

	if( !player.isDead && !player.justRestarted ) {
		// level collisions
		if( collisions === 'country' || collisions === 'payment' || collisions === 'countryBilling' ) {
			game.physics.arcade.collide( 	player, dropdownCollisionLayer						);	
			game.physics.arcade.collide( 	player, dropdownInteriorCollisionLayer				);	
		} else {
			game.physics.arcade.collide( 	player, collisionLayer								);	
		}
		
		// foreground collision, use to detect current area
		if( collisions == 'default' ) {
			
			// vacuum collisions
			game.physics.arcade.overlap(	player, vacuums, 	handleVacuum, null, this		);

			// warp zone collisons 
			game.physics.arcade.overlap(	player, warpUps, 	handleUpWarps, null, this		);
			game.physics.arcade.overlap(	player, warpDowns, 	handleDownWarps, null, this		);

			// foreground collison for location
			game.physics.arcade.overlap(	player, foreground, handleLocation, null, this		);
			
			// trigger collisions 
			game.physics.arcade.overlap(	player, triggers, 	handleTriggers, null, this		);
		}

		// coin collisions
		game.physics.arcade.overlap(	player, coins, getCoin, null, this						);

		if( player.currentLocation == 'terms' || player.currentLocation == 'privacy' || player.currentLocation == 'credit' ) {

			if( groups.terms.active ) {
				game.physics.arcade.overlap(	player, termsAsterisks, playerDie, null, this			);	
			}
			if( groups.privacy.active ) {
				game.physics.arcade.overlap(	player, privacyAsterisks, playerDie, null, this			);
			}
			if( groups.credit.active ) {
				game.physics.arcade.overlap(	player, creditAsterisks, playerDie, null, this			);
			}

		} else {

			// enemy collisions
			game.physics.arcade.overlap(	player, asterisks, playerDie, null, this				);
			game.physics.arcade.overlap(	player, bangs, playerDie, null, this					);
			game.physics.arcade.overlap(	player, rollers, playerDie, null, this					);	

		}

		

		// classic arcade movement
		player.body.acceleration.x  = 0.0;
		player.body.velocity.x     *= 0.94; // with 60 fps
		if( player.body.velocity.y > maxFallSpeed ) player.body.velocity.y = maxFallSpeed;
	}
}