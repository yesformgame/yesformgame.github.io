// 
// Audio
// 

var music = {};

var jumpSound, deathSound, explosionSound;

var ding, returnCarriage, suckDown, suckUp;

var typeSounds = {};

var coinToneVolume = .2;
var coinTypeVolume = .5;

var initAudio = function() {

	// music
	music = game.add.audio( 'maxo' );
	music.volume = .8;
	music.play();
	music.loopFull();

	// layered music
	// music.layer1 = game.add.audio( 'layer1' );
	// music.layer1.volume = .6;
	// music.layer1.play();
	// music.layer1.loopFull();

	// music.layer2 = game.add.audio( 'layer2' );
	// music.layer2.volume = .6;
	// music.layer2.play();
	// music.layer2.loopFull();

	// music.layer3 = game.add.audio( 'layer3' );
	// music.layer3.volume = .6;
	// music.layer3.play();
	// music.layer3.loopFull();

	// music.layer4 = game.add.audio( 'layer4' );
	// music.layer4.volume = .6;
	// music.layer4.play();
	// music.layer4.loopFull();

	// music.layer5 = game.add.audio( 'layer5' );
	// music.layer5.volume = .6;
	// music.layer5.play();
	// music.layer5.loopFull();

	// music.layer6 = game.add.audio( 'layer6' );
	// music.layer6.volume = .6;
	// music.layer6.play();
	// music.layer6.loopFull();

	// music.layer7 = game.add.audio( 'layer7' );
	// music.layer7.volume = .6;
	// music.layer7.play();
	// music.layer7.loopFull();

	// music.playLayers = function( num ) {

	// 	for( var i = 1; i <= 7; i++ ) {

	// 		if( i <= num ) { 
	// 			music[ 'layer' + i ].mute = false;
	// 		} else {
	// 			music[ 'layer' + i ].mute = true;
	// 		}

	// 	}
		
	// }

	// music.playLayers( 1 );


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