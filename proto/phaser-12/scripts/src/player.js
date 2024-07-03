// 
// PLAYER
// 

var initPlayer = function() {

	// add player
	player = game.add.sprite( levelStart.x, levelStart.y, 'dude' );
	game.physics.enable( player, Phaser.Physics.ARCADE );
	player.body.bounce.y = 0;
	player.body.collideWorldBounds = true;
	player.anchor.set( .5, .5 );
	player.currentLocation = 'name';

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

	player.body.setStanding();
	
	// blink all the time
	// player.animations.add('idle',   [ 0, 10 ],  3, true );
	// player.animations.add('left',   [ 0, 10 ],  3, true );
	// player.animations.add('turn',   [ 4 ],      3, true );
	// player.animations.add('right',  [ 5, 10 ],  3, true );
	// player.animations.add('jump',   [ 9, 10 ],  3, true );

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

	player.scale.y = 1;
	// add scale to gui
	gui.add( player.scale, 'y', .125, 1.25 ).step( .125 ).onFinishChange( restart ).name( 'height' );

}

var resetPlayer = function() {
    player.position.set( levelStart.x, levelStart.y );
    player.currentLocation = 'name';
    player.body.velocity.y = 0;
    player.body.velocity.x = 0;
    player.body.angularAcceleration = 0;
    player.body.angularVelocity = 0;
    player.rotation = 0;
    player.isDead = false;
}

var playerDie = function( player, asterisk ) {

    player.isDead = true; 
   
    // clear inputs
    jumpButton.isDown =
    cursors.left.isDown =
    cursors.right.isDown = 
    cursors.down.isDown = false
    // game.input.enabled = false;

    // death animation
    player.body.acceleration.x  = 0;

    player.body.velocity.y = game.rnd.integerInRange( 400, 600 );
    player.body.velocity.x = game.rnd.integerInRange( -180, 180 );
    player.body.angularAcceleration = game.rnd.integerInRange( -8, 8 ) * 200;
    
    // shake camera
    game.plugins.cameraShake.shake();
    game.time.events.add( 100 , function(){
        game.camera.flash(0xff9090, 600);
    } ,this );
    
    // restart
    setTimeout( function(){
        if( player.isDead ) {
            restart();    
        }
    }, 2500 );

}