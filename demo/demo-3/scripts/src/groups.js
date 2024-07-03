// 
// GROUPS
// 

var dropDownGroup, bgElements, fgElements;

var groups = {

	
	'enemies' : {},
	'coins' : {},
	'dropdowns' : [],
	'checkboxes' : { children: [] }

};

var initGroups = function() {

	groups.checkboxes.hide = function() {

		groups.checkboxes.children.forEach( function( chkbx ){
			chkbx.hide();
		});

	}

	groups.checkboxes.show = function() {

		groups.checkboxes.children.forEach( function( chkbx ){
			chkbx.show();
		});

	}

	groups.checkboxes.reset = function() {

		groups.checkboxes.children.forEach( function( chkbx ){
			chkbx.reset();
		});

	}

 	// background elements group
    bgElements = game.add.group();

    // dropdowns 
    groups.country = new Dropdown( { 
    	field : 'country',
    	origin : { x : 120, y : 1160 },
    	arrow : 'background/dropdown-arrow.png',
    	options : 
    		[ 
    			'options/Country.png',
    			'options/Argentina.png',
    			'options/Belgium.png',
    			'options/Brazil.png',
    			'options/Chile.png',
    			'options/China.png',
    			'options/Denmark.png',
    			'options/Germany.png'
    		],
    	placeholder : 'options/Country.png',
    	image : paymentDropdownLevelImage
    } );
    groups.country.hide();
    groups.dropdowns.push( groups.country );

    groups.countryBilling = new Dropdown( { 
    	field : 'countryBilling',
    	origin : { x : 120, y : 4520 },
    	arrow : 'background/dropdown-arrow.png',
    	options : 
    		[ 
    			'options/Country.png',
    			'options/Argentina.png',
    			'options/Belgium.png',
    			'options/Brazil.png',
    			'options/Chile.png',
    			'options/China.png',
    			'options/Denmark.png',
    			'options/Germany.png'
    		],
    	placeholder : 'options/Country.png',
    	image : idTypeDropdownLevelImage
    } );
    groups.countryBilling.hide();
    groups.dropdowns.push( groups.countryBilling );

	groups.payment = new Dropdown( { 
		field : 'payment',
		origin : { x : 120, y : 2840 },
		arrow : 'background/dropdown-arrow.png',
		options : 
			[ 
				'options/advance-payment.png',
				'options/app-payment.png',
				'options/credit-card.png',
				'options/cryptocurrency.png',
				'options/direct-debit.png',
				'options/gift-card.png',
				'options/pay-on-account.png',
				'options/bank-transfer.png',
			],
		placeholder : 'options/choose-payment.png',
		image : countryBillingDropdownLevelImage
    } );
    groups.payment.hide();
    groups.dropdowns.push( groups.payment );


}

var initCheckboxes = function() {

	// 
	// Check Box Group
	// 

	groups.terms = new Checkbox( {

		asterisks 		: termsAsterisks,
		check			: game.add.image( 772, 7234, 'spritesheet', 'background/check.png' ),
		yTop			: 6200,
		text 	  		: (function(){ 
							var t = game.add.image( 120 + 40, 6200 + 10, 'terms' );
							t.scale.set( 2 );
							return t;
						})(),
		mask 	  		: game.add.graphics( 120, 6200 ),
		textScrollSpeed : .4

	} );
	groups.checkboxes.children.push( groups.terms );

	groups.privacy = new Checkbox( {

		asterisks 		: privacyAsterisks,
		check			: game.add.image( 645, 8448, 'spritesheet', 'background/check.png' ),
		yTop			: 7400,
		text 	  		: (function(){ 
							var t = game.add.image( 120 + 40, 7400 + 10, 'privacy' );
							t.scale.set( 2 );
							return t;
						})(),
		mask 	  		: game.add.graphics( 120, 7400 ),
		textScrollSpeed : .4

	} );
	groups.checkboxes.children.push( groups.privacy );

	groups.credit = new Checkbox( {

		asterisks 		: creditAsterisks,
		check			: game.add.image( 618, 9660, 'spritesheet', 'background/check.png' ),
		yTop			: 8600,
		text 	  		: (function(){ 
							var t = game.add.image( 120 + 40, 8600 + 10, 'credit' );
							t.scale.set( 2 );
							return t;
						})(),
		mask 	  		: game.add.graphics( 120, 8600 ),
		textScrollSpeed : .4

	} );
	groups.checkboxes.children.push( groups.credit );
	

}

var updateGroups = function() {

	if( groups.terms.active ) {
		groups.terms.updateScroll();
	}

	if( groups.privacy.active ) {
		groups.privacy.updateScroll();
	}

	if( groups.credit.active ) {
		groups.credit.updateScroll();
	}

	groups.terms.update();
	groups.privacy.update();
	groups.credit.update();


}