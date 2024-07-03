// 
// GROUPS
// 

var dropDownGroup, bgElements;

var groups = {

	'dropdown' : { children : [], complete : false },
	'checkbox' : { 
		playhead : 0,
		fallTime   : 5000,
		active 	 : false,
		children : [],
		isComplete : false 
	},
	'enemies' : {},
	'coins' : {}

};

var initGroups = function() {

 	// background elements group
    bgElements = game.add.group();


    // 
    // Drop Down Group
    // 
	groups.dropdown.hide = function(){
	
		groups.dropdown.children.forEach( function( spr ){

		    spr.visible = false;

		});

	}

	groups.dropdown.show = function(){

		groups.dropdown.children.forEach( function( spr ){

		    spr.visible = true;

		});

	}

	// 
	// Check Box Group
	// 

	groups.checkbox.mask = game.add.graphics( 100, 1760 );
	groups.checkbox.text = game.add.sprite( 100, 1760, 'checkbox1-text' );
	groups.checkbox.text.visible = false;
	groups.checkbox.mask.drawRect( 0, 0, 1720, 940 );



	groups.checkbox.show = function() {

		asteriskLayer1.mask = groups.checkbox.mask;
		groups.checkbox.text.mask = groups.checkbox.mask;
		groups.checkbox.text.visible = true;
		asteriskLayer1.visible = true;
	}

	groups.checkbox.hide = function() {

		groups.checkbox.text.visible = false;
		asteriskLayer1.visible = false;


	}

	groups.checkbox.start = function() {

		if( !groups.checkbox.isComplete ) {
			groups.checkbox.alive = true;
			player.lastYVel = player.body.velocity.y;
			player.body.velocity.y = 0;
			player.fallLock = true;
			player.body.allowGravity = false;
			
		}

	}

	groups.checkbox.update = function( ) {

		groups.checkbox.playhead += game.time.elapsed; 

		var scrollSpeed = .6;

		asteriskLayer1.y -= scrollSpeed * game.time.elapsed;
		groups.checkbox.text.y -= scrollSpeed * .6 * game.time.elapsed;

		if( groups.checkbox.playhead >= groups.checkbox.fallTime ) {

			groups.checkbox.complete();

		}

	}

	groups.checkbox.reset = function() {

		groups.checkbox.playhead = 0;
		groups.checkbox.isComplete = false;
		groups.checkbox.alive = false;
		asteriskLayer1.y = 0;
		groups.checkbox.text.y = 1760;
		player.body.allowGravity = true;
		player.fallLock = false;
		asteriskLayer1.forEach( function( ast ){

			ast.x = ast.originalPosition.x;
			ast.y = ast.originalPosition.y;

		});

	}

	groups.checkbox.complete = function() {

		
		groups.checkbox.alive = false;
		groups.checkbox.isComplete = true;
		player.body.allowGravity = true;
		player.body.velocity.y = player.lastYVel;
		player.fallLock = false;

	}
    
    

}

var updateGroups = function() {

	if( groups.checkbox.alive ) {

		groups.checkbox.update();

	}

}