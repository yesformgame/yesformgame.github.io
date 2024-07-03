// 
// AREA TRANSITIONS
// 

var enterDropdown = function() {

	if( !groups.dropdown.complete ) {
		collisions = 'dropdown';
		var zoomTime = 1200;
		levelImage.tween = game.add.tween( levelImage.position );
		levelImage.tween.to( { y: 1440 }, zoomTime, Phaser.Easing.Quintic.InOut, true );
		setTimeout( function(){
			if( player.currentLocation === 'password' && !player.dead ) {
				zoomTo( 2.2, zoomTime * 1.25 );
				game.camera.lockX = 87;	
				hideEnemies();
				groups.checkbox.hide();
				hideInteractives();
				groups.dropdown.show();
			}
		}, zoomTime * .5);
		foreground.visible = false;
		addressLabel.visible = false;
		warpDowns.visible = false;
		warpUps.visible = false;
		vacuums.visible = false;

	}
	
}

var dropdownComplete = function() {

	
	var zoomTime = 1200;
	zoomTo( 1, zoomTime );
	levelImage.tween = game.add.tween( levelImage.position );
	levelImage.tween.to( { y: 0 }, zoomTime, Phaser.Easing.Linear.None, true );
	player.dropdownTween = game.add.tween( player.position );
	
	groups.dropdown.complete = true;
	player.dropdownTween.to( { y: player.y - 1440 }, zoomTime, Phaser.Easing.Linear.None, true );
	player.dropdownTween.onComplete.add( function(){
		exitDropdown();
	});
}

var exitDropdown = function() {

	collisions = 'default';
	foreground.visible = true;
	addressLabel.visible = true;
	warpDowns.visible = true;
	warpUps.visible = true;
	vacuums.visible = true;
	game.camera.lockX = null;
	showEnemies();
	showInteractives();
	groups.dropdown.hide();
	groups.checkbox.show();
	groups.checkbox.reset();

}

var enterDefaultArea = function() {

	// collisions = 'default';
	// game.camera.lockX = null;
	// groups.dropdown.hide();
	// groups.checkbox.show();

}