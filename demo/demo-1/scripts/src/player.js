// 
// PLAYER
// 

var playerExplosion;

var initPlayer = function() {

	// add player
	player = game.add.sprite( levelStart.x, levelStart.y, 'dude' );
	game.physics.enable( player, Phaser.Physics.ARCADE );
	player.body.bounce.y = 0;
	player.body.collideWorldBounds = true;
	player.anchor.set( .5, .5 );
	player.currentLocation = 'name';

	player.tweens = {};

	// body sizing functions
	player.body.setStanding = function() {
	    player.body.position.y -= ( 8 * player.scale.y );
	    player.body.setSize( 4, 80, 14, 0 );
	    player.body.state = 'standing';
	}
	player.body.setJumping = function() {
	    player.body.setSize( 24, 50, 3, 15 );
	    player.body.state = 'jumping';
	}
	player.body.setDucking = function() {
	    player.body.position.y += ( 15 * player.scale.y );
	    player.body.setSize( 19, 46, 6, 18 );
	    player.body.state = 'ducking';
	}

	player.justRestarted = true;
	game.physics.arcade.isPaused = true;

	player.body.setStanding();

	// blink on idle only
	player.animations.add('idle',           [ 0, 5 ],  3, true );
	player.animations.add('left',           [ 0 ],  3, true );
	player.animations.add('down-right',     [ 4 ],  3, true );
	player.animations.add('down-left',      [ 1 ],  3, true );
	player.animations.add('right',          [ 0 ],  3, true );
	player.animations.add('jump-right',     [ 3 ],  3, true );
	player.animations.add('jump-left',      [ 2 ],  3, true );

	
	// custom player states
	player.isDead = false;
	player.vacuumed = false;
	player.warped = false;

	player.originalScale = { x: 1, y: 1.25 };

	player.scale.y = player.originalScale.y;
	// add scale to gui
	gui.add( player.scale, 'y', .125, 1.25 ).step( .125 ).onFinishChange( restart ).name( 'height' );

	// player explosion emitter
	playerExplosion = game.add.emitter(0, 0, 100);
    playerExplosion.makeParticles( 'player-piece' );
    playerExplosion.enableBody = true;

}

var resetPlayer = function() {
    player.position.set( levelStart.x, levelStart.y );
    if( player.tweens.blowUp ) player.tweens.blowUp.stop();
    player.currentLocation = 'name';
    player.alpha = 1;
    player.scale.set( player.originalScale.x, player.originalScale.y );
    player.body.velocity.y = 0;
    player.body.velocity.x = 0;
    player.body.angularAcceleration = 0;
    player.body.angularVelocity = 0;
    player.rotation = 0;
    player.isDead = false;
    player.body.setStanding();
    player.animations.play( 'left' ); 
    player.justRestarted = true;
    game.physics.arcade.isPaused = true;
}

var playerDie = function( player, asterisk ) {

    player.isDead = true; 

    deathSound.play();

    // clear inputs
    jumpButton.isDown =
    cursors.left.isDown =
    cursors.right.isDown = 
    cursors.down.isDown = false;

    // death animation
    player.body.acceleration.x  = 0;
    player.body.velocity.y = game.rnd.integerInRange( 400, 600 );
    player.body.velocity.x = game.rnd.integerInRange( -180, 180 );
    player.body.angularAcceleration = game.rnd.integerInRange( -8, 8 ) * 200;

    player.tweens.blowUp = game.add.tween( player.scale );
    setTimeout( function(){

    	if( player.isDead ) {
    		player.tweens.blowUp.to( { y : .25 }, 250, Phaser.Easing.Superback.Out, true );
    		player.tweens.blowUp.onComplete.add( function(){
    			if( player.isDead ) {

    				explosionSound.play();
    				game.plugins.cameraShake.shake();
    				game.camera.flash(0xff9090, 600);
    				player.alpha = 0;
    				playerExplosion.x = player.x;
    				playerExplosion.y = player.y;
    				playerExplosion.gravity.x = player.body.velocity.x * 2;
    				playerExplosion.gravity.y = player.body.velocity.y * 2;
    				playerExplosion.explode( 2000, 6 );

    			}
    		});
    	}

    }, 1000 )
    
    
    // shake camera
    game.plugins.cameraShake.shake();
    game.time.events.add( 100 , function(){
        game.camera.flash(0xff9090, 600);
    }, this );
    
    // restart
    setTimeout( function(){
        if( player.isDead ) {
            restart();    
        }
    }, 2500 );

}