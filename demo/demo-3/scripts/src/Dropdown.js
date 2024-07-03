var Dropdown = function( options ) {

	var _this = this;
	var opt = options || {};

	_this.children = [];
	_this.isComplete = false;
	_this.active = false;
	_this.field = opt.field || console.warn( 'this dropdown requires an attribute "field"' );
	_this.image = opt.image || console.warn( 'this dropdown requires an attribute "image"' );
	_this.toHide = opt.toHide;

	_this.origin = opt.origin;

	_this.backgrounds = [];

	// _this.placeholder = opt.placeholder || console.warn( 'dropdown missing placeholder' );
	// _this.arrows = opt.arrows || console.warn( 'dropdown missing arrows' );
	// _this.options = opt.options || console.warn( 'dropdown missing options' );

	if( _this.image.length ) {
		for( var i = 0; i < _this.image.length; i++ ) {
			_this.image[ i ].originalY = _this.image[ i ].position.y;
		}
	} else {
		_this.image.originalY = _this.image.position.y;		
	}


	
	_this.placeholder = game.add.image( _this.origin.x + 25, _this.origin.y + 40, 'spritesheet', opt.placeholder );
	_this.placeholder.alpha = .1;
	_this.backgrounds.push( _this.placeholder );
	_this.arrow = game.add.image( _this.origin.x + 700, _this.origin.y + 45, 'spritesheet', opt.arrow );
	_this.backgrounds.push( _this.arrow );

	_this.options = [];

	for( var i = 0; i < opt.options.length; i++ ) {

		var thisOpt = game.add.image( _this.origin.x + 25, _this.origin.y + ( 160 * i ) + 40, 'spritesheet', opt.options[ i ] );
		thisOpt.alpha = .1;
		_this.options.push( thisOpt );		
		// _this.backgrounds.push( thisOpt );

	}

	_this.showBackgrounds = function() {
		_this.backgrounds.forEach( function( img ) {
			img.visible = true;
		});
	}

	_this.hideBackgrounds = function() {
		_this.backgrounds.forEach( function( img ) {
			img.visible = false;
		});
	}

	_this.hide = function() {
		_this.children.forEach( function( spr ){
		    spr.visible = false;
		});

		_this.options.forEach( function( img ) {
			img.visible = false;
		});


		for( var i = 0; i < groups.dropdowns.length; i++ ) {

			if( !groups.dropdowns[ i ].isComplete ) {
				groups.dropdowns[ i ].showBackgrounds();	
			}
			
		}
	}

	_this.show = function(){
		_this.children.forEach( function( spr ){
		    spr.visible = true;
		});
		_this.options.forEach( function( img ) {
			img.visible = true;
		});
		

		for( var i = 0; i < groups.dropdowns.length; i++ ) {

			groups.dropdowns[ i ].hideBackgrounds();

		}
	}

	_this.enter = function() {

		if( !_this.isComplete && !_this.active && !restarting && player.currentLocation == _this.field ) {
			// console.log( 'enter dropdown ' + _this.field );
			collisions = _this.field;
			_this.active = true; 
			var zoomTime = 1200;
			if( _this.image.length ) {
				for( var i = 0; i < _this.image.length; i++ ) {
					_this.image[ i ].tween = game.add.tween( _this.image[ i ].position );
					_this.image[ i ].tween.to( { y: _this.image[ i ].position.y + 1400 }, zoomTime, Phaser.Easing.Quintic.InOut, true );
				}
			} else {
				_this.image.tween = game.add.tween( _this.image.position );
				_this.image.tween.to( { y: _this.image.position.y + 1400 }, zoomTime, Phaser.Easing.Quintic.InOut, true );
			}

			superHideInteractives();
			superHideEnemies();
			
			setTimeout( function(){
				if( !player.dead && !restarting && player.currentLocation == _this.field ) {
					zoomTo( 2.2, zoomTime * 1.25 );
					game.camera.lockX = 87;	
					groups.checkboxes.hide();
					labels.hide();
					heckles.hide();
					shadows.hide();
					_this.show();

					menuBtn.visible = false;
					for( var i = 0; i < player.tallies.length; i++ ) {
					    player.tallies[ i ].visible = false;    
					}

				}
			}, zoomTime * .5 );
			foreground.visible = false;
			warpDowns.visible = false;
			warpUps.visible = false;
			vacuums.visible = false;
		}
	}

	_this.reset = function() {

		_this.hide();



		if( _this.image.length ) {
			for( var i = 0; i < _this.image.length; i++ ) {
				if( _this.image[ i ].tween ) _this.image[ i ].tween.pause();
				_this.image[ i ].position.y = _this.image[ i ].originalY;
			}
		} else {
			if( _this.image.tween ) _this.image.tween.pause();
			_this.image.position.y = _this.image.originalY;
		}

		
		_this.isComplete = false;
		_this.active = false;

	}

	_this.complete = function() {

		var zoomTime = 1200;
		zoomTo( 1, zoomTime );

		_this.options.forEach( function( img ) {
			img.visible = false;
		});

		if( _this.image.length ) {
			for( var i = 0; i < _this.image.length; i++ ) {
				_this.image[ i ].tween = game.add.tween( _this.image[ i ].position );
				_this.image[ i ].tween.to( { y: _this.image[ i ].originalY }, zoomTime, Phaser.Easing.Linear.InOut, true );	
			}
		} else {
			_this.image.tween = game.add.tween( _this.image.position );
			_this.image.tween.to( { y: _this.image.originalY }, zoomTime, Phaser.Easing.Linear.InOut, true );
		}

		player.dropdownTween = game.add.tween( player.position );
		
		_this.isComplete = true;

		player.dropdownTween.to( { y: player.y - 1160 }, zoomTime, Phaser.Easing.Linear.None, true );
		player.dropdownTween.onComplete.add( function(){
			_this.exit();
		});

	}

	_this.exit = function() {

		collisions = 'default';
		_this.active = false; 
		foreground.visible = true;
		labels.show();
		shadows.show();
		warpDowns.visible = true;
		warpUps.visible = true;
		vacuums.visible = true;
		game.camera.lockX = null;
		enemiesRenderable( true );
		interactivesRenderable( true );
		// showInteractives();
		_this.hide();

		menuBtn.visible = true;
		for( var i = 0; i < player.tallies.length; i++ ) {
		    player.tallies[ i ].visible = true;    
		}

	}


}