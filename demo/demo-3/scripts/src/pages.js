var settingsGroup;

var settingsGfx, settingsHeading, settingsBody;

var backBtn, 
	settingsLabel, 
	controlsBtn, controlsBtnBg, controlsIcon, controlsIconOff, 
	soundBtn, soundBtnBg, soundIcon, soundIconOff,
	musicBtn, musicBtnBg, musicIcon, musicIconOff,
	settingsRestartBtn, settingsRestartBtnBg, 
	outLinkBtn, outLinkBtnBg;

var finalGroup, finalGfx, finalPlayButton, finalYesButton, 
	finalYesMessage1, finalShareMessage, finalFacebookButton,
	finalTwitterButton, finalEmailButton, finalBarLogo;

var scoreGroup, scoreGfx, scoreLabel,
	congratulations, fastestBtnBg, fastestLabel,
	totalBtnBg, totalLabe, totalTime, fastestTime;

var controlPageGroup, controlPageImg;

var initScoreScreen = function() {

	scoreGroup = game.add.group();
	scoreGroup.init 			= { x: 0, y: 0 };
	scoreGfx = game.add.graphics( 0, 0 );
	scoreGfx.beginFill( parseInt( "0x" + BG_COLOR.slice( 1, 7 ) ) );
	scoreGfx.drawRect( 0, 0, 1920, 200 );
	scoreGfx.endFill();
	scoreGfx.beginFill( 0xE6E6E6 );
	scoreGfx.drawRect( 0, 200, 1920, 10080 );
	scoreGfx.endFill();
	scoreGroup.add( scoreGfx );

	scoreGroup.fixedToCamera = true;
	scoreGroup.visible = false;

	scoreLabel						= game.add.image( 960, 95, 'spritesheet', 'score-page/score-title.png' );
	scoreLabel.anchor.set( .5 );
	scoreGroup.add( scoreLabel );

	congratulations					= game.add.image( 960, 0 , 'spritesheet', 'score-page/congratulations.png' );
	congratulations.anchor.set( .5 );
	congratulations.centerOffsetY = -175;
	congratulations.y = game.halfHeight + congratulations.offsetY;
	scoreGroup.add( congratulations );

	failed							= game.add.image( 960, 0 , 'spritesheet', 'score-page/failed.png' );
	failed.anchor.set( .5 );
	failed.centerOffsetY = -175;
	failed.y = game.halfHeight + failed.centerOffsetY;
	scoreGroup.add( failed );
	failed.renderable = false;

	fastestBtnBg					= game.add.image( 613, 0 , 'spritesheet', 'settings/field.png' );
	fastestBtnBg.centerOffsetY = 10;
	fastestBtnBg.y = game.halfHeight + fastestBtnBg.centerOffsetY;
	scoreGroup.add( fastestBtnBg );

	fastestLabel					= game.add.image( 615, 0 , 'spritesheet', 'score-page/fastest-time.png' );
	fastestLabel.centerOffsetY = -39;
	fastestLabel.y = game.halfHeight + fastestLabel.centerOffsetY;
	scoreGroup.add( fastestLabel );	

	totalBtnBg						= game.add.image( 613, 0 , 'spritesheet', 'settings/field.png' );
	totalBtnBg.centerOffsetY = 232;
	totalBtnBg.y = game.halfHeight + totalBtnBg.centerOffsetY;
	scoreGroup.add( totalBtnBg );

	totalLabel						= game.add.image( 615, 0 , 'spritesheet', 'score-page/total-time.png' );
	totalLabel.centerOffsetY = +184
	totalLabel.y = game.halfHeight + totalLabel.centerOffsetY;
	scoreGroup.add( totalLabel );	


}

var resizeScreens = function() {

	resizeScoreScreen();
	resizeSettingsScreen();
	resizeFinalScreen();

}

var resizeScoreScreen = function() {

	// offset for centerable object index
	for( var i = 2; i < scoreGroup.children.length; i++ ) {


		var child = scoreGroup.children[ i ];
		child.y = ( game.halfHeight + child.centerOffsetY ); 

	}

}

var resizeSettingsScreen = function() {

	// offset for centerable object index
	for( var i = 3; i < settingsGroup.children.length; i++ ) {


		var child = settingsGroup.children[ i ];
		// skip geometry
		child.y = ( game.halfHeight + child.centerOffsetY ); 

	}

}


var resizeFinalScreen = function() {

	// offset for centerable object index
	for( var i = 3; i < finalGroup.children.length; i++ ) {


		var child = finalGroup.children[ i ];
		// skip geometry
		child.y = ( game.halfHeight + child.centerOffsetY ); 

	}

}

var initFinalScreen = function() {

	finalGroup = game.add.group();
	finalGroup.init = { x: 0, y: 0 };
	finalGfx = game.add.graphics( 0, 0 );
	finalGfx.beginFill( parseInt( "0x" + BG_COLOR.slice( 1, 7 ) ) );
	finalGfx.drawRect( 0, 0, 1920, game.height );
	finalGfx.endFill();
	finalGroup.add( finalGfx );

	// finalGroup.fixedToCamera			= true;
	finalGroup.visible 					= false;

	if( THE_LOGO ) {
	    finalBarLogo  = game.add.image( 130, 50, 'logo' );
	    finalGroup.add( finalBarLogo );
	}

	finalPlayButton						= game.add.image( 1540, 70, 'spritesheet', 'final/play-button.png'	);
	finalPlayButton.inputEnabled 		= true;
	finalPlayButton.events.onInputUp.add( function(){
		hideFinalPage();
		restart();
	});
	finalGroup.add( finalPlayButton );

	finalYesMessage1					= game.add.image( 400, 0, 'spritesheet', 'final/yes-message-1.png'	);
	finalGroup.add( finalYesMessage1 );
	finalYesMessage1.centerOffsetY = -85;
	finalYesMessage1.y = game.halfHeight + finalYesMessage1.centerOffsetY;

	finalYesButton						= game.add.image( 1180, 0, 'spritesheet', 'yes-button/yes-button-00.png'	);
	finalYesButton.inputEnabled 		= true;
	finalYesButton.centerOffsetY = -134;
	finalYesButton.y = game.halfHeight + finalYesButton.centerOffsetY;
	finalYesButton.events.onInputUp.add( function(){
		
	});
	finalGroup.add( finalYesButton );

	finalShareMessage					= game.add.image( 800, 0, 'spritesheet', 'final/share-score.png'	);
	finalGroup.add( finalShareMessage );
	finalShareMessage.centerOffsetY = 286;
	finalShareMessage.y = game.halfHeight + finalShareMessage.centerOffsetY;

	finalFacebookButton					= game.add.image( 800, 0, 'spritesheet', 'final/facebook.png'	);
	finalFacebookButton.inputEnabled 	= true;
	finalFacebookButton.centerOffsetY = 350;
	finalFacebookButton.y = game.halfHeight + finalFacebookButton.centerOffsetY;
	finalFacebookButton.events.onInputUp.add( function(){
		
		window.open( 'http://www.facebook.com/share.php?u=' + shareUrl + '&title=' + shareTitle );

	});
	finalGroup.add( finalFacebookButton );

	finalTwitterButton					= game.add.image( 920, 0, 'spritesheet', 'final/twitter.png'	);
	finalTwitterButton.inputEnabled 	= true;
	finalTwitterButton.centerOffsetY = 350;
	finalTwitterButton.y = game.halfHeight + finalTwitterButton.centerOffsetY;
	finalTwitterButton.events.onInputUp.add( function(){
		
		window.open( 'http://twitter.com/home?status=' + shareTitle + '+' + shareUrl );

	});
	finalGroup.add( finalTwitterButton );

	finalEmailButton					= game.add.image( 1040, 0, 'spritesheet', 'final/email.png'	);
	finalEmailButton.inputEnabled 		= true;
	finalEmailButton.centerOffsetY = 350;
	finalEmailButton.y = game.halfHeight + finalEmailButton.centerOffsetY;
	finalEmailButton.events.onInputUp.add( function(){

		window.open( 'mailto:?subject=' + shareTitle + '&body=' + shareUrl );
		
	});
	finalGroup.add( finalEmailButton );

	

}

var initControlScreen = function() {

	controlPageGroup = game.add.group();
	controlPageGroup.init = { x: 0, y: 0 };
	controlPageGfx = game.add.graphics( 0, 0 );
	controlPageGfx.beginFill( 0x000000 );
	controlPageGfx.drawRect( 0, 0, 1920, game.height );
	controlPageGfx.endFill();
	controlPageGfx.inputEnabled = true;
	controlPageGroup.add( controlPageGfx );

	controlPageImg = game.add.image( 383, game.halfHeight, 'control-image' );
	controlPageImg.y -= controlPageImg.height / 2;


	controlPageGroup.add( controlPageImg );

	controlPageGroup.alpha = .66;

}

var initMenu = function() {

	settingsGroup = game.add.group();
	settingsGroup.init 			= { x: 0, y: 0 };
	settingsGfx = game.add.graphics( 0, 0 );
	settingsGfx.beginFill( parseInt( "0x" + BG_COLOR.slice( 1, 7 ) ) );
	settingsGfx.drawRect( 0, 0, 1920, 200 );
	settingsGfx.endFill();
	settingsGfx.beginFill( 0xE6E6E6 );
	settingsGfx.drawRect( 0, 200, 1920, 10080 );
	settingsGfx.endFill();
	settingsGroup.add( settingsGfx );

	backBtn					= game.add.image( 40, 40, 'spritesheet', 'settings/back.png'	);
	backBtn.inputEnabled 	= true;
	backBtn.fixedToCamera 	= true;
	backBtn.init 			= { x: backBtn.x, y: backBtn.y };
	backBtn.events.onInputUp.add(function () {
		hideMenu();
	});
	settingsGroup.add( backBtn );

	settingsLabel			= game.add.image( 960, 95, 'spritesheet', 'settings/settings.png' );
	settingsLabel.anchor.set( .5 );
	settingsGroup.add( settingsLabel );

	if( game.device.desktop !== true ) {
		controlsBtnBg			= game.add.image( 960, 0, 'spritesheet', 'settings/field.png' );
		controlsBtnBg.anchor.set( .5 );
		controlsBtnBg.scale.x = .8625;
		controlsBtnBg.centerOffsetY = 389;
		controlsBtnBg.y = game.halfHeight + controlsBtnBg.centerOffsetY;
		controlsBtnBg.inputEnabled = true;
		controlsBtnBg.events.onInputUp.add( function(){
			toggleControls();
		});
		settingsGroup.add( controlsBtnBg );

		controlsBtn				= game.add.image( 698, 0, 'spritesheet', 'settings/swap-controls.png' );
		controlsBtn.centerOffsetY = 367;
		controlsBtn.y = game.halfHeight + controlsBtn.centerOffsetY;
		controlsBtn.inputEnabled = true;
		controlsBtn.events.onInputUp.add( function(){
			toggleControls();
		});
		settingsGroup.add( controlsBtn );

		controlsIcon			= game.add.image( 1108, 0, 'spritesheet', 'settings/controlR.png' );
		controlsIcon.centerOffsetY = 359;
		controlsIcon.y = game.halfHeight + controlsIcon.centerOffsetY;
		controlsIcon.inputEnabled = true;
		controlsIcon.events.onInputUp.add( function(){
			toggleControls();
		});
		settingsGroup.add( controlsIcon );

		controlsIconOff			= game.add.image( 1108, 0, 'spritesheet', 'settings/controlL.png' );
		controlsIconOff.centerOffsetY = 359;
		controlsIconOff.y = game.halfHeight + controlsIconOff.centerOffsetY;
		controlsIconOff.inputEnabled = true;
		controlsIconOff.events.onInputUp.add( function(){
			toggleControls();
		});
		controlsIconOff.visible = false;
		settingsGroup.add( controlsIconOff );
	}

	soundBtnBg				= game.add.image( 960, 0, 'spritesheet', 'settings/field.png' );
	soundBtnBg.anchor.set( .5 );
	soundBtnBg.scale.x = .8625;
	soundBtnBg.centerOffsetY = -61;
	soundBtnBg.y = game.halfHeight + soundBtnBg.centerOffsetY;
	soundBtnBg.inputEnabled = true;
	soundBtnBg.events.onInputUp.add(function(){
		toggleSound();
	});
	settingsGroup.add( soundBtnBg );

	soundBtn				= game.add.image( 698, 0, 'spritesheet', 'settings/sound.png' );
	soundBtn.centerOffsetY = -79;
	soundBtn.y = game.halfHeight + soundBtn.centerOffsetY;
	soundBtn.inputEnabled = true;
	soundBtn.events.onInputUp.add(function(){
		toggleSound();
	});
	settingsGroup.add( soundBtn );
	
	soundIcon			= game.add.image( 1144, 0, 'spritesheet', 'settings/speaker.png' );
	soundIcon.centerOffsetY = -82;
	soundIcon.y = game.halfHeight + soundIcon.centerOffsetY;
	soundIcon.inputEnabled = true;
	soundIcon.events.onInputUp.add(function(){
		toggleSound();
	});
	settingsGroup.add( soundIcon );
	

	soundIconOff			= game.add.image( 1144 - 7, 0, 'spritesheet', 'settings/soundoff.png' );
	soundIconOff.centerOffsetY = -90;
	soundIconOff.y = game.halfHeight + soundIconOff.centerOffsetY;
	soundIconOff.inputEnabled = true;
	soundIconOff.visible = false;
	soundIconOff.events.onInputUp.add(function(){
		toggleSound();
	});
	settingsGroup.add( soundIconOff );


	musicBtnBg				= game.add.image( 960, 0, 'spritesheet', 'settings/field.png' );
	musicBtnBg.anchor.set( .5 );
	musicBtnBg.scale.x = .8625;
	musicBtnBg.centerOffsetY = 89;
	musicBtnBg.y = game.halfHeight + musicBtnBg.centerOffsetY;
	musicBtnBg.inputEnabled = true;
	musicBtnBg.events.onInputUp.add(function(){
		toggleMusic();
	});
	settingsGroup.add( musicBtnBg );

	musicBtn				= game.add.image( 698, 0, 'spritesheet', 'settings/music.png' );
	musicBtn.centerOffsetY = 71;
	musicBtn.y = game.halfHeight + musicBtn.centerOffsetY;
	musicBtn.inputEnabled = true;
	musicBtn.events.onInputUp.add(function(){
		toggleMusic();
	});
	settingsGroup.add( musicBtn );

	musicIcon				= game.add.image( 1150, 0, 'spritesheet', 'settings/music-icon.png' );
	musicIcon.centerOffsetY = 63;
	musicIcon.y = game.halfHeight + musicIcon.centerOffsetY;
	musicIcon.inputEnabled = true;
	musicIcon.events.onInputUp.add(function(){
		toggleMusic();
	});
	settingsGroup.add( musicIcon );

	musicIconOff			= game.add.image( 1150 - 7, 0, 'spritesheet', 'settings/musicoff.png' );
	musicIconOff.centerOffsetY = 63;
	musicIconOff.y = game.halfHeight + musicIconOff.centerOffsetY;
	musicIconOff.inputEnabled = true;
	musicIconOff.events.onInputUp.add(function(){
		toggleMusic();
	});
	musicIconOff.visible = false;
	settingsGroup.add( musicIconOff );

	settingRestartBtnBg		= game.add.image( 960, 0, 'spritesheet', 'settings/field.png' );
	settingRestartBtnBg.anchor.set( .5 );
	settingRestartBtnBg.scale.x = .8625;
	settingRestartBtnBg.centerOffsetY = 239;
	settingRestartBtnBg.y = game.halfHeight + settingRestartBtnBg.centerOffsetY;
	settingRestartBtnBg.inputEnabled = true;
	settingRestartBtnBg.events.onInputUp.add(function(){
		restart();
		hideMenu();
	});
	settingsGroup.add( settingRestartBtnBg );

	settingsRestartBtn		= game.add.image( 698, 0, 'spritesheet', 'settings/restart.png' );
	settingsRestartBtn.centerOffsetY = 220;
	settingsRestartBtn.y = game.halfHeight + settingsRestartBtn.centerOffsetY;
	settingsRestartBtn.inputEnabled = true;
	settingsRestartBtn.events.onInputUp.add(function(){
		restart();
		hideMenu();
	});
	settingsGroup.add( settingsRestartBtn );

	outLinkBtnBg			= game.add.image( 960, 0, 'spritesheet', 'settings/field.png' );
	outLinkBtnBg.anchor.set( .5 );
	outLinkBtnBg.scale.x = .8625;
	outLinkBtnBg.centerOffsetY = -211;
	outLinkBtnBg.y = game.halfHeight + outLinkBtnBg.centerOffsetY;
	outLinkBtnBg.inputEnabled = true;
	outLinkBtnBg.events.onInputUp.add(function(){
		window.open( OUT_LINK );
	});
	settingsGroup.add( outLinkBtnBg );

	outLinkBtn				= game.add.image( 698, 0, 'spritesheet', 'settings/yes-website.png' );
	outLinkBtn.centerOffsetY = -229;
	outLinkBtn.y = game.halfHeight + outLinkBtn.centerOffsetY;
	outLinkBtn.inputEnabled = true;
	outLinkBtn.events.onInputUp.add(function(){
		window.open( OUT_LINK );
	});
	settingsGroup.add( outLinkBtn );

	settingsGroup.fixedToCamera = true;
	settingsGroup.visible = false;

}

var showMenu = function() {

	settingsGroup.visible = true;
	stopTime = true;
	controlOverride = true;
	menuScreen = true;

}

var hideMenu = function() {

	settingsGroup.visible = false;
	stopTime = false;
	controlOverride = false;
	menuScreen = false;
	
}

var toggleControls = function() {

	if( cursors.layout.current == 'right' ) {

		// console.log( 'toggle controls to left' );


		// fixed to camera locks position
		cursors.down.fixedToCamera = false;
		cursors.left.fixedToCamera = false;
		cursors.right.fixedToCamera = false;
		jumpButton.fixedToCamera = false;
		restartBtn.fixedToCamera = false;

		cursors.layout.current = 'left';
		jumpButton.position.set( cursors.layout.leftHanded.jump.x, cursors.layout.leftHanded.jump.y );
	    cursors.down.position.set( cursors.layout.leftHanded.down.x, cursors.layout.leftHanded.down.y );
	    cursors.left.position.set( cursors.layout.leftHanded.left.x, cursors.layout.leftHanded.left.y );
	    cursors.right.position.set( cursors.layout.leftHanded.right.x, cursors.layout.leftHanded.right.y );
	    cursors.down.init = { x : cursors.down.x, y : cursors.down.y };
	    cursors.left.init = { x : cursors.left.x, y : cursors.left.y };
	    cursors.right.init = { x : cursors.right.x, y : cursors.right.y };
	    jumpButton.init = { x : jumpButton.x, y : jumpButton.y };
	    controlsIcon.visible = false;
		controlsIconOff.visible = true;

		cursors.down.fixedToCamera = true;
		cursors.left.fixedToCamera = true;
		cursors.right.fixedToCamera = true;
		jumpButton.fixedToCamera = true;
		restartBtn.fixedToCamera = true;

	} else {

		// console.log( 'toggle controls to right' );

		// fixed to camera locks position
		cursors.down.fixedToCamera = false;
		cursors.left.fixedToCamera = false;
		cursors.right.fixedToCamera = false;
		jumpButton.fixedToCamera = false;
		restartBtn.fixedToCamera = false;

		cursors.layout.current = 'right';
		jumpButton.position.set( cursors.layout.rightHanded.jump.x, cursors.layout.rightHanded.jump.y );
	    cursors.down.position.set( cursors.layout.rightHanded.down.x, cursors.layout.rightHanded.down.y );
	    cursors.left.position.set( cursors.layout.rightHanded.left.x, cursors.layout.rightHanded.left.y );
	    cursors.right.position.set( cursors.layout.rightHanded.right.x, cursors.layout.rightHanded.right.y );
	    cursors.down.init = { x : cursors.down.x, y : cursors.down.y };
	    cursors.left.init = { x : cursors.left.x, y : cursors.left.y };
	    cursors.right.init = { x : cursors.right.x, y : cursors.right.y };
	    jumpButton.init = { x : jumpButton.x, y : jumpButton.y };
	    controlsIcon.visible = true;
		controlsIconOff.visible = false;

		cursors.down.fixedToCamera = true;
		cursors.left.fixedToCamera = true;
		cursors.right.fixedToCamera = true;
		jumpButton.fixedToCamera = true;
		restartBtn.fixedToCamera = true;
	}

}

var toggleSound = function() {

	if( game.sound.mute ) {

		game.sound.mute = false;
		soundIcon.visible = true;
		soundIconOff.visible = false;

	} else {

		game.sound.mute = true;
		soundIcon.visible = false;
		soundIconOff.visible = true;

	}

}

var toggleMusic = function() {

	if( music.mute ) {

		music.mute = false;
		musicIcon.visible = true;
		musicIconOff.visible = false;

	} else {

		music.mute = true;
		musicIcon.visible = false;
		musicIconOff.visible = true;

	}

}

var showFinalPage = function() {

	zoomTo( 1, 25 );

	finalGroup.y = 10080 + game.height;

	finalGroup.slideUp = game.add.tween( finalGroup.position );
	finalGroup.slideUp.to( { y : 10080 - game.height }, 800, Phaser.Easing.Quintic.Out, true );

	finalGroup.visible = true;
	// game.paused = true;

}

var hideFinalPage = function() {

	finalGroup.visible = false;
	game.paused = false;

}

var showScorePage = function() {

	zoomTo( 1, 25 );

	if( fastestTime ) {
		fastestTime.destroy();
	}

	if( game.completed ) {
		fastestTime					= game.add.bitmapText( 960, game.halfHeight, 'retina', msToTime( timer.current ), '66' );
		fastestTime.centerOffsetY = 40;
		fastestTime.y += fastestTime.centerOffsetY;
		fastestTime.x -= fastestTime.width / 2;
		congratulations.renderable = true;
		failed.renderable = false;
	} else {
		fastestTime					= game.add.image( 735, game.halfHeight, 'spritesheet', 'score-page/incomplete.png' );
		fastestTime.centerOffsetY = 40;
		fastestTime.y += fastestTime.centerOffsetY;
		congratulations.renderable = false;
		failed.renderable = true;
	}
	scoreGroup.add( fastestTime );

	if( totalTime ) totalTime.destroy();
	totalTime						= game.add.bitmapText( 960, game.halfHeight, 'retina', msToTime( Date.now() - timer.firstStart ), '66' );
	totalTime.centerOffsetY = 265;
	totalTime.y += totalTime.centerOffsetY;
	totalTime.x -= totalTime.width / 2;
	scoreGroup.add( totalTime );

	scoreGroup.visible = true;
	stopTime = true;

}

var hideScorePage = function() {

	scoreGroup.visible = false;

	if( fastestTime ) {
		fastestTime.destroy();
	}

	if( totalTime ) {
		totalTime.destroy();	
	}

}