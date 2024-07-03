var initEnemy = function( spr ) {
	
    game.physics.enable( spr, Phaser.Physics.ARCADE );

    if( spr.group ) {
    	groups[ spr.group ].children.push( spr );
    }

    if( spr.field ) {
        // add enemey to area in effects
        areas[ spr.field ].enemies.push( spr );

    }



    spr.body.allowGravity = false;
    spr.body.immovable = true;
    spr.body.setSize( 16, 16, 0, 0 );
    spr.position.x += 10;
    spr.position.y += 10;
    spr.originalPosition = { x: spr.position.x, y: spr.position.y };
    spr.anchor.set( .5 );

    
     
    spr.tweens = {};

    spr.die = function() {

        spr.body.allowGravity = true;
        spr.body.immovable = false;
        spr.dead = true;
        var dY = game.rnd.integerInRange( 200, 600 );
        var dX = 0;
        while( !dX ) {
            dX = game.rnd.integerInRange( -250, 250 )
        }
        var dAng = 0;
        while( !dAng ) {
            dAng = game.rnd.integerInRange( -180, 180 )
        }
        spr.body.velocity.y = dY;
        spr.body.velocity.x = dX;
        spr.body.angularAcceleration = dAng;

        setTimeout( function(){
        	if( spr.dead ) {
        		spr.visible = false;
        	}
        }, 2000 );

    }

    spr.reset = function() {

        spr.dead = false;
        spr.body.allowGravity = false;
        spr.body.immovable = true;
        spr.body.velocity.y = 0;
        spr.body.velocity.x = 0;
        spr.body.angularAcceleration = 0;
        spr.body.angularVelocity = 0;

        if( !spr.startsHidden ) {
            spr.visible = true;    
        }

        spr.scale.x = 1;
        spr.scale.y = 1;
        spr.position.x = spr.originalPosition.x;
        spr.position.y = spr.originalPosition.y;
        spr.angle = 0;

    }


}