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
    player.currentFg = 'name';

	player.tweens = {};

	// body sizing functions
	player.body.setStanding = function() {
	    player.body.position.y -= ( 8 * player.scale.y );
	    player.body.setSize( 8, 84, 12, -1 );
	    player.body.state = 'standing';
	}
	player.body.setJumping = function() {
	    player.body.setSize( 28, 54, 1, 14 );
	    player.body.state = 'jumping';
	}
	player.body.setDucking = function() {
	    player.body.position.y += ( 15 * player.scale.y );
	    player.body.setSize( 23, 50, 4, 17 );
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

    player.deaths = 0;
    player.tallies = [];

	player.originalScale = { x: 1, y: 1.25 };

	player.scale.y = player.originalScale.y;

	// player explosion emitter
	playerExplosion = game.add.emitter(0, 0, 100);
    playerExplosion.makeParticles( 'spritesheet', 'tiles/player-piece.png' );
    playerExplosion.enableBody = true;

}

var resetPlayer = function() {
    player.position.set( levelStart.x, levelStart.y );
    pressEnter.visible = false;
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

var playerDie = function( player, enemy ) {

    if( !enemy.dead && enemy.visible ) {
        
        player.isDead = true; 

        if( game.device.desktop ) pressEnter.visible = true;

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
        var dX = 0;
        while( Math.abs( dX ) < 25 ) {
            dX = game.rnd.integerInRange( -8, 8 ) * 200;
        }
        player.body.angularAcceleration = dX;

        tallyDeath();

        player.tweens.blowUp = game.add.tween( player.scale );
        setTimeout( function(){

            if( player.isDead ) {
                player.tweens.blowUp.to( { y : .25 }, 250, Phaser.Easing.Superback.Out, true );
                player.tweens.blowUp.onComplete.add( function(){
                    if( player.isDead ) {

                        explosionSound.play();
                        game.camera.shake( .01, 400 );
                        game.camera.flash( 0xff9090, 600 );
                        player.alpha = 0;
                        playerExplosion.x = player.x;
                        playerExplosion.y = player.y;
                        playerExplosion.gravity.x = player.body.velocity.x * 2;
                        playerExplosion.gravity.y = player.body.velocity.y * 2;
                        playerExplosion.explode( 2000, 6 );

                    }
                });
            }

        }, 1000 );
        
        
        // shake camera
        game.camera.shake( .01, 400 );
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
    

}

var tallyDeath = function() {

    player.deaths ++;

    var deathsOf5 = Math.floor( player.deaths / 5 );

    for( var i = 0; i < player.tallies.length; i++ ) {

        player.tallies[ i ].destroy();

    }

    player.tallies = [];

    for( var i = 0; i < deathsOf5; i++ ) {

        var tally = game.add.image( 1826, 20 + ( i * 60 ), 'spritesheet', 'tallies/tally5.png' );
        tally.fixedToCamera = true;
        bgElements.add( tally );
        player.tallies.push( tally );

    }

    if( player.deaths % 5 ) {
        var tally = game.add.image( 1838, 20 + ( deathsOf5 * 60 ), 'spritesheet', 'tallies/tally' + ( player.deaths % 5 ) + '.png' );
        tally.fixedToCamera = true;
        bgElements.add( tally );
        player.tallies.push( tally );    

    }
    

}