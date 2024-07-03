// 
// Audio
// 

var music = {};

var jumpSound, deathSound, explosionSound;

var ding, returnCarriage, suckDown, suckUp;

var typeSounds = {};

var yesMusic;

var coinToneVolume = .1;
var coinTypeVolume = .25;

var initAudio = function() {

	// music
	music = game.add.audio( 'maxo' );
	music.volume = .5;
	music.play();
	music.loopFull();

	yesMusic = game.add.audio( 'ohya' );
	yesMusic.volume = .8;
	yesMusic.loopFull();
	yesMusic.pause();
	

	// player sounds
	jumpSound = game.add.audio( 'jump' );
	jumpSound.volume = .5;

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