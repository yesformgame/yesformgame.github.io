var Checkbox = function( options ) {
	
	var _this 			= this;
	var opt 			= options || {};

	_this.children		= [];
	_this.asterisks		= opt.asterisks;

	_this.yTop 			= opt.yTop || 0;

	_this.playhead		= 0;
	_this.fallTime	  	= opt.fallTime || 5000;
	_this.active	 	= false;
	_this.isComplete	= false;

	_this.scrollSpeed   = opt.scrollSpeed || .6;
	_this.textScrollSpeed   = opt.textScrollSpeed || .6;

	_this.mask 			= opt.mask || game.add.graphics( 100, 1760 );
	_this.text 			= opt.text || game.add.image( 100, 1760, 'terms' );
	_this.text.visible 	= false;
	_this.mask.drawRect( 0, 0, _this.mask.y - 40, 940 );

	_this.check 		= opt.check || game.add.image( 762, _this.yTop + 1034, 'spritesheet', 'background/check.png' );

	_this.show = function() {
		_this.asterisks.mask = _this.mask;
		_this.text.mask = _this.mask;
		_this.text.visible = true;
		_this.asterisks.visible = true;
		for( var i = 0; i < _this.asterisks.children.length; i++ ) {
			_this.asterisks.children[ i ].visible = true;
		}
	}

	_this.hide = function() {

		_this.text.visible = false;
		_this.asterisks.visible = false;
		for( var i = 0; i < _this.asterisks.children.length; i++ ) {
			_this.asterisks.children[ i ].visible = false;
		}

	}

	_this.start = function() {

		if( !_this.isComplete ) {
			_this.active = true;
			player.lastYVel = player.body.velocity.y;
			player.body.velocity.y = 0;
			player.fallLock = true;
			player.body.allowGravity = false;
			_this.check.visible = false;
		}

	}

	_this.updateScroll = function( ) {

		_this.playhead += game.time.elapsed; 

		_this.asterisks.y -= _this.scrollSpeed * game.time.elapsed;
		_this.text.y -= _this.scrollSpeed * _this.textScrollSpeed * game.time.elapsed;

		if( _this.playhead >= _this.fallTime ) {

			_this.complete();

		}

	}

	_this.update = function() {

        if( !_this.alive && _this.yTop >= game.camera.view.top && _this.yTop <= game.camera.view.bottom ) {
            // console.log( 'heroes never die' );
            _this.visible = true;
            _this.alive = true;
            _this.show();
        } else if( _this.alive && _this.yTop < game.camera.view.top || _this.alive && _this.yTop > game.camera.view.bottom ) {
            // console.log( 'kill him!' );
            _this.visible = false;
            _this.alive = false;
            _this.hide();
            _this.reset();
        }
	    
	}

	_this.reset = function() {

		_this.playhead = 0;
		_this.isComplete = false;
		_this.active = false;
		_this.asterisks.y = 0;
		_this.text.y = _this.yTop;
		player.body.allowGravity = true;
		player.fallLock = false;
		_this.asterisks.forEach( function( ast ){

			ast.x = ast.originalPosition.x;
			ast.y = ast.originalPosition.y;

		});

	}

	_this.complete = function() {

		_this.active = false;
		_this.isComplete = true;
		player.body.allowGravity = true;
		player.body.velocity.y = player.lastYVel;
		player.fallLock = false;
		_this.check.visible = true;

	}

}