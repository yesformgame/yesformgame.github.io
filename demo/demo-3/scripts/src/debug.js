// 
// DEBUG LOGIC
// called in render() in script.js
// 

var updateDebug = function() {


	// game.debug.body(player);

	// game.debug.text(game.time.fps, 300, 32 );

	// triggers.forEach( function( v ){
	//     game.debug.body( v );
	// });

    game.debug.text( game.time.fps, 1, 25, 'white', '36 Arial');
    if( window.debugMessage ) game.debug.text( window.debugMessage, 1, 100, 'white', '36 Arial');

    // warpDowns.forEach( function( v ){
    //     game.debug.body( v );
    // });
    // game.debug.text( window.innerHeight, 1, 50, 'white', '36 Arial');
    // game.debug.text( game.height, 1, 75, 'white', '36 Arial');
    

    // game.debug.text(game.time.physicsElapsed, 32, 72 );
    // game.debug.body(player);
    // game.debug.bodyInfo(player, 64, 24);
    // vacuums.forEach( function( v ){
    //     game.debug.body( v );
    // });
	


}