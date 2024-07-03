// 
// Audio
// 

var jumpSound, deathSound, explosionSound;

var ding, returnCarriage, suckDown, suckUp;

var typeSounds = {};

var coinToneVolume = .2;
var coinTypeVolume = .5;

var initAudio = function() {

	// player sounds
	jumpSound = game.add.audio( 'jump' );

	deathSound = game.add.audio( 'death' );
    deathSound.volume = .75;

    explosionSound = game.add.audio( 'explosion' );
    explosionSound.volume = .5;

    // effects
    ding = game.add.sound( 'ding' );
    ding.volume = .3;

    returnCarriage = game.add.sound( 'return' );
    returnCarriage.volume = .4;

    suckDown = game.add.sound( 'suck-down' );
	suckDown.volume = .6;
    suckUp = game.add.sound( 'suck-up' );
	suckUp.volume = .6; 

	// coins
	for( var i = 1; i <= 20; i++ ) {

		var thisTypeSound = 'type' + i;
		typeSounds[ thisTypeSound ] = game.add.audio( thisTypeSound );
		typeSounds[ thisTypeSound ].volume = coinTypeVolume;

	}

	for( var i = 1; i <= 4; i++ ) {

		var thisTypeSound = 'tone' + i;
		typeSounds[ thisTypeSound ] = game.add.audio( thisTypeSound );
		typeSounds[ thisTypeSound ].volume = coinToneVolume;

	}



}