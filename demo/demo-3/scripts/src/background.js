// 
// background images
// 

// labels
var nameLabel,
	streetNameLabel,
	cityLabel,
	zipCodeLabel,
	countryLabel,
	emailLabel,
	verifyEmailLabel,
	homeNumberLabel,
	mobileNumberLabel,
	usernameLabel,
	passwordLabel,
	passwordConfirmLabel,
	paymentLabel,
	accountLabel,
	bankCodeLabel,
	accountNameLabel,
	streetNameBillingLabel,
	cityBillingLabel,
	zipCodeBillingLabel,
	countryBillingLabel,
	idTypeLabel,
	birthDateLabel,
	idNumberLabel,
	issueDateLabel,
	expirationDateLabel,
	issueStateLabel,
	taxIdLabel,
	termsAndConditionsLabel,
	privacyPolicyLabel,
	approveCreditLabel; 

var labels = { children: [] };
var heckles = { children: [] };

// shadows 
var nameShadowB,
    addressShadowT,
    addressShadowB,
    cityShadowT,
    cityShadowB,
    zipCodeShadowT,
    zipCodeShadowB,
    countryShadowT,
    countryShadowB,
    emailShadowT,
    emailShadowB,
    verifyEmailShadowT,
    verifyEmailShadowB,
    homeNumberShadowT,
    homeNumberShadowB,
    mobileNumberShadowT,
    mobileNumberShadowB,
    usernameShadowT,
    usernameShadowB,
    passwordShadowT,
    passwordShadowB,
    passwordConfirmShadowT,
    passwordConfirmShadowB,
    paymentShadowT,
    paymentShadowB,
    accountShadowT,
    accountShadowB,
    bankCodeShadowT,
    bankCodeShadowB,
    accountNameShadowT,
    accountNameShadowB,
    streetNameShadowT,
    streetNameShadowB,
    cityBillingShadowT,
    cityBillingShadowB,
    zipCodeBillingShadowT,
    zipCodeBillingShadowB,
    countryBillingShadowT,
    countryBillingShadowB,
    idTypeShadowT,
    idTypeShadowB,
    birthDateShadow1T,
    birthDateShadow1B,
    birthDateShadow2T,
    birthDateShadow2B,
    birthDateShadow3T,
    birthDateShadow3B,
    idNumberShadowT,
    idNumberShadowB,
    issueDateShadow1T,
    issueDateShadow1B,
    issueDateShadow2T,
    issueDateShadow2B,
    issueDateShadow3T,
    issueDateShadow3B,
    expirationDateShadow1T,
    expirationDateShadow1B,
    expirationDateShadow2T,
    expirationDateShadow2B,
    expirationDateShadow3T,
    expirationDateShadow3B,
    issueStateShadowT,
    issueStateShadowB,
    taxIdShadowT,
    taxIdShadowB,
    termsShadowT,
    termsShadowB,
    privacyShadowT,
    privacyShadowB,
    creditShadowT,
    creditShadowB;

var shadows = { children: [] };

var yesButtonBg, yesButton;

var dropdownHighlightBlue;
var dropdownHighlightGreen;
var dropdownHighlightBlue;

var pressEnter;

var skippingGame = false;

labels.hide = function() {
	for( var i = 0; i < labels.children.length; i++ ) {
		labels.children[ i ].visible = false;
	}
}

labels.show = function() {
	for( var i = 0; i < labels.children.length; i++ ) {
		labels.children[ i ].visible = true;
	}
}

shadows.hide = function() {
    for( var i = 0; i < shadows.children.length; i++ ) {
        shadows.children[ i ].visible = false;
    }
}

shadows.show = function() {
    for( var i = 0; i < shadows.children.length; i++ ) {
        shadows.children[ i ].visible = true;
    }
}

heckles.hide = function() {
    for( var i = 0; i < heckles.children.length; i++ ) {
        heckles.children[ i ].visible = false;
    }
}

heckles.show = function() {
    for( var i = 0; i < heckles.children.length; i++ ) {
        heckles.children[ i ].visible = true;
    }
}

var fieldImages;

var initBackground = function() {

    pressEnter = game.add.image( game.world.centerX, game.height - 120, 'spritesheet', 'background/enter-to-restart.png' );
    pressEnter.anchor.set( .5 );
    pressEnter.cacheAsBitmap = true;
    pressEnter.visible = false;
    pressEnter.fixedToCamera = true;
    

    dropdownHighlightBlue = game.add.group();
    dropdownHighlightBlue.visible = false;
    var topBlue           = game.add.image(   1, 2, 'spritesheet', 'fields/dropdown-blue-top.png' );
    dropdownHighlightBlue.add( topBlue );
    var bottomBlue        = game.add.image(   -1, 1275, 'spritesheet', 'fields/dropdown-blue-bottom.png' );
    dropdownHighlightBlue.add( bottomBlue );
    var leftBlue          = game.add.image(   -1, 29, 'spritesheet', 'fields/dropdown-blue-left.png' );
    dropdownHighlightBlue.add( leftBlue );
    var rightBlue         = game.add.image(   806, 29, 'spritesheet', 'fields/dropdown-blue-right.png' );
    dropdownHighlightBlue.add( rightBlue );

    dropdownHighlightGreen = game.add.group();
    dropdownHighlightGreen.visible = false;
    var topGreen           = game.add.image(   1, 2, 'spritesheet', 'fields/dropdown-green-top.png' );
    dropdownHighlightGreen.add( topGreen );
    var bottomGreen        = game.add.image(   -1, 1275, 'spritesheet', 'fields/dropdown-green-bottom.png' );
    dropdownHighlightGreen.add( bottomGreen );
    var leftGreen          = game.add.image(   -1, 29, 'spritesheet', 'fields/dropdown-green-left.png' );
    dropdownHighlightGreen.add( leftGreen );
    var rightGreen         = game.add.image(   806, 29, 'spritesheet', 'fields/dropdown-green-right.png' );
    dropdownHighlightGreen.add( rightGreen );

    dropdownHighlightRed = game.add.group();
    dropdownHighlightRed.visible = false;
    var topRed           = game.add.image(   1, 2, 'spritesheet', 'fields/dropdown-red-top.png' );
    dropdownHighlightRed.add( topRed );
    var bottomRed        = game.add.image(   -1, 1275, 'spritesheet', 'fields/dropdown-red-bottom.png' );
    dropdownHighlightRed.add( bottomRed );
    var leftRed          = game.add.image(   -1, 29, 'spritesheet', 'fields/dropdown-red-left.png' );
    dropdownHighlightRed.add( leftRed );
    var rightRed         = game.add.image(   806, 29, 'spritesheet', 'fields/dropdown-red-right.png' );
    dropdownHighlightRed.add( rightRed );

    giantHighlightBlue = game.add.group();
    giantHighlightBlue.visible = false;
    var topBlue           = game.add.image(   0, 0, 'spritesheet', 'fields/big-field-blue-top.png' );
    giantHighlightBlue.add( topBlue );
    var bottomBlue        = game.add.image(   0, 1000, 'spritesheet', 'fields/big-field-blue-bottom.png' );
    giantHighlightBlue.add( bottomBlue );
    var leftBlue          = game.add.image(   0, 26, 'spritesheet', 'fields/big-field-blue-left.png' );
    giantHighlightBlue.add( leftBlue );
    var rightBlue         = game.add.image(   1686, 26, 'spritesheet', 'fields/big-field-blue-right.png' );
    giantHighlightBlue.add( rightBlue );

    giantHighlightGreen = game.add.group();
    giantHighlightGreen.visible = false;
    var topGreen           = game.add.image(     0, 0, 'spritesheet', 'fields/big-field-green-top.png' );
    giantHighlightGreen.add( topGreen );
    var bottomGreen        = game.add.image(     0, 1000, 'spritesheet', 'fields/big-field-green-bottom.png' );
    giantHighlightGreen.add( bottomGreen );
    var leftGreen          = game.add.image(     0, 26, 'spritesheet', 'fields/big-field-green-left.png' );
    giantHighlightGreen.add( leftGreen );
    var rightGreen         = game.add.image(     1686, 26, 'spritesheet', 'fields/big-field-green-right.png' );
    giantHighlightGreen.add( rightGreen );

    giantHighlightRed = game.add.group();
    giantHighlightRed.visible = false;
    var topRed           = game.add.image(  0, 0, 'spritesheet', 'fields/big-field-red-top.png' );
    giantHighlightRed.add( topRed );
    var bottomRed        = game.add.image(  0, 1000, 'spritesheet', 'fields/big-field-red-bottom.png' );
    giantHighlightRed.add( bottomRed );
    var leftRed          = game.add.image(   0, 26, 'spritesheet', 'fields/big-field-red-left.png' );
    giantHighlightRed.add( leftRed );
    var rightRed         = game.add.image(  1686, 26, 'spritesheet', 'fields/big-field-red-right.png' );
    giantHighlightRed.add( rightRed );

    // field images
    fieldImages = {

        name : {
            stamp : {
                image : 'tiles/stamp.png',
                position : { x : 1730, y : 400 }
            }, 
            strike : {
                image : 'tiles/strike.png',
                position : { x : 1730, y : 400 }
            }, 
            greenOutline : {
                image : 'fields/full-field-green.png',
                position : { x : 133, y : 323 }
            },
            redOutline : {
                image : 'fields/full-field-red.png',
                position : { x : 133, y : 323 }
            },
            blueOutline : {
                image : 'fields/full-field-blue.png',
                position : { x : 133, y : 323 }
            },



        }, 

        streetName : { 
            stamp : {
                image : 'tiles/stamp.png',
                position : { x : 1730, y : 680 }
            }, 
            strike : {
                image : 'tiles/strike.png',
                position : { x : 1730, y : 680 }
            }, 
            greenOutline : {
                image : 'fields/full-field-green.png',
                position : { x : 133, y : 603 }
            },
            redOutline : {
                image : 'fields/full-field-red.png',
                position : { x : 133, y : 603 }
            },
            blueOutline : {
                image : 'fields/full-field-blue.png',
                position : { x : 133, y : 603 }
            },


        },
        city : { 
            stamp : {
                image : 'tiles/stamp.png',
                position : { x : 850, y : 960 }
            }, 
            strike : {
                image : 'tiles/strike.png',
                position : { x : 850, y : 960 }
            }, 
            greenOutline : {
                image : 'fields/half-field-green.png',
                position : { x : 133 + 1, y : 883 }
            },
            redOutline : {
                image : 'fields/half-field-red.png',
                position : { x : 133 + 1, y : 883 }
            },
            blueOutline : {
                image : 'fields/half-field-blue.png',
                position : { x : 133 + 1, y : 883 }
            },


        },
        zipCode : { 
            stamp : {
                image : 'tiles/stamp.png',
                position : { x : 1730, y : 960 }
            }, 
            strike : {
                image : 'tiles/strike.png',
                position : { x : 1730, y : 960 }
            }, 
            greenOutline : {
                image : 'fields/half-field-green.png',
                position : { x : 1013 + 1, y : 883 }
            },
            redOutline : {
                image : 'fields/half-field-red.png',
                position : { x : 1013 + 1, y : 883 }
            },
            blueOutline : {
                image : 'fields/half-field-blue.png',
                position : { x : 1013 + 1, y : 883 }
            },


        },
        country : { 
            stamp : {
                image : 'tiles/stamp.png',
                position : { x : 850, y : 1240 }
            }, 
            strike : {
                image : 'tiles/strike.png',
                position : { x : 850, y : 1240 }
            }, 
            greenOutline : {
                image : dropdownHighlightGreen,
                position : { x : 110, y : 1147 }
            },
            redOutline : {
                image : dropdownHighlightRed,
                position : { x : 110, y : 1147 }
            },
            blueOutline : {
                image : dropdownHighlightBlue,
                position : { x : 110, y : 1147 }
            },


        },
        email : { 
            stamp : {
                image : 'tiles/stamp.png',
                position : { x : 1730, y : 1520 }
            }, 
            strike : {
                image : 'tiles/strike.png',
                position : { x : 1730, y : 1520 }
            }, 
            greenOutline : {
                image : 'fields/full-field-green.png',
                position : { x : 133, y : 1443 }
            },
            redOutline : {
                image : 'fields/full-field-red.png',
                position : { x : 133, y : 1443 }
            },
            blueOutline : {
                image : 'fields/full-field-blue.png',
                position : { x : 133, y : 1443 }
            },


        },
        verifyEmail : { 
            stamp : {
                image : 'tiles/stamp.png',
                position : { x : 1730, y : 1800 }
            }, 
            strike : {
                image : 'tiles/strike.png',
                position : { x : 1730, y : 1800 }
            }, 
            greenOutline : {
                image : 'fields/full-field-green.png',
                position : { x : 133, y : 1723 }
            },
            redOutline : {
                image : 'fields/full-field-red.png',
                position : { x : 133, y : 1723 }
            },
            blueOutline : {
                image : 'fields/full-field-blue.png',
                position : { x : 133, y : 1723 }
            },


        },
        homeNumber : { 
            stamp : {
                image : 'tiles/stamp.png',
                position : { x : 850, y : 2080 }
            }, 
            strike : {
                image : 'tiles/strike.png',
                position : { x : 850, y : 2080 }
            }, 
            greenOutline : {
                image : 'fields/half-field-green.png',
                position : { x : 133 + 1, y : 2003 }
            },
            redOutline : {
                image : 'fields/half-field-red.png',
                position : { x : 133 + 1, y : 2003 }
            },
            blueOutline : {
                image : 'fields/half-field-blue.png',
                position : { x : 133 + 1, y : 2003 }
            },


        },
        mobileNumber : { 
            stamp : {
                image : 'tiles/stamp.png',
                position : { x : 1730, y : 2080 }
            }, 
            strike : {
                image : 'tiles/strike.png',
                position : { x : 1730, y : 2080 }
            }, 
            greenOutline : {
                image : 'fields/half-field-green.png',
                position : { x : 1013 + 1, y : 2003 }
            },
            redOutline : {
                image : 'fields/half-field-red.png',
                position : { x : 1013 + 1, y : 2003 }
            },
            blueOutline : {
                image : 'fields/half-field-blue.png',
                position : { x : 1013 + 1, y : 2003 }
            },


        },
        username : { 
            stamp : {
                image : 'tiles/stamp.png',
                position : { x : 1730, y : 2360 }
            }, 
            strike : {
                image : 'tiles/strike.png',
                position : { x : 1730, y : 2360 }
            }, 
            greenOutline : {
                image : 'fields/full-field-green.png',
                position : { x : 133, y : 2283 }
            },
            redOutline : {
                image : 'fields/full-field-red.png',
                position : { x : 133, y : 2283 }
            },
            blueOutline : {
                image : 'fields/full-field-blue.png',
                position : { x : 133, y : 2283 }
            },


        },
        password : { 
            stamp : {
                image : 'tiles/stamp.png',
                position : { x : 850, y : 2640 }
            }, 
            strike : {
                image : 'tiles/strike.png',
                position : { x : 850, y : 2640 }
            }, 
            greenOutline : {
                image : 'fields/half-field-green.png',
                position : { x : 133 + 1, y : 2563 }
            },
            redOutline : {
                image : 'fields/half-field-red.png',
                position : { x : 133 + 1, y : 2563 }
            },
            blueOutline : {
                image : 'fields/half-field-blue.png',
                position : { x : 133 + 1, y : 2563 }
            },


        },
        passwordConfirm : { 
            stamp : {
                image : 'tiles/stamp.png',
                position : { x : 1730, y : 2640 }
            }, 
            strike : {
                image : 'tiles/strike.png',
                position : { x : 1730, y : 2640 }
            }, 
            greenOutline : {
                image : 'fields/half-field-green.png',
                position : { x : 1013 + 1, y : 2563 }
            },
            redOutline : {
                image : 'fields/half-field-red.png',
                position : { x : 1013 + 1, y : 2563 }
            },
            blueOutline : {
                image : 'fields/half-field-blue.png',
                position : { x : 1013 + 1, y : 2563 }
            },


        },
        payment : { 
            stamp : {
                image : 'tiles/stamp.png',
                position : { x : 850, y : 2920 }
            }, 
            strike : {
                image : 'tiles/strike.png',
                position : { x : 850, y : 2920 }
            }, 
            greenOutline : {
                image : dropdownHighlightGreen,
                position : { x : 112, y : 2829 }
            },
            redOutline : {
                image : dropdownHighlightRed,
                position : { x : 112, y : 2829 }
            },
            blueOutline : {
                image : dropdownHighlightBlue,
                position : { x : 112, y : 2829 }
            },


        },
        account : { 
            stamp : {
                image : 'tiles/stamp.png',
                position : { x : 1730, y : 3200 }
            }, 
            strike : {
                image : 'tiles/strike.png',
                position : { x : 1730, y : 3200 }
            }, 
            greenOutline : {
                image : 'fields/full-field-green.png',
                position : { x : 133, y : 3123 }
            },
            redOutline : {
                image : 'fields/full-field-red.png',
                position : { x : 133, y : 3123 }
            },
            blueOutline : {
                image : 'fields/full-field-blue.png',
                position : { x : 133, y : 3123 }
            },


        },
        bankCode : { 
            stamp : {
                image : 'tiles/stamp.png',
                position : { x : 1730, y : 3480 }
            }, 
            strike : {
                image : 'tiles/strike.png',
                position : { x : 1730, y : 3480 }
            }, 
            greenOutline : {
                image : 'fields/full-field-green.png',
                position : { x : 133, y : 3403 }
            },
            redOutline : {
                image : 'fields/full-field-red.png',
                position : { x : 133, y : 3403 }
            },
            blueOutline : {
                image : 'fields/full-field-blue.png',
                position : { x : 133, y : 3403 }
            },


        },
        accountName : { 
            stamp : {
                image : 'tiles/stamp.png',
                position : { x : 1730, y : 3760 }
            }, 
            strike : {
                image : 'tiles/strike.png',
                position : { x : 1730, y : 3760 }
            }, 
            greenOutline : {
                image : 'fields/full-field-green.png',
                position : { x : 133, y : 3683 }
            },
            redOutline : {
                image : 'fields/full-field-red.png',
                position : { x : 133, y : 3683 }
            },
            blueOutline : {
                image : 'fields/full-field-blue.png',
                position : { x : 133, y : 3683 }
            },


        },
        streetNameBilling : { 
            stamp : {
                image : 'tiles/stamp.png',
                position : { x : 1730, y : 4040 }
            }, 
            strike : {
                image : 'tiles/strike.png',
                position : { x : 1730, y : 4040 }
            }, 
            greenOutline : {
                image : 'fields/full-field-green.png',
                position : { x : 133, y : 3963 }
            },
            redOutline : {
                image : 'fields/full-field-red.png',
                position : { x : 133, y : 3963 }
            },
            blueOutline : {
                image : 'fields/full-field-blue.png',
                position : { x : 133, y : 3963 }
            },


        },
        cityBilling : { 
            stamp : {
                image : 'tiles/stamp.png',
                position : { x : 850, y : 4320 }
            }, 
            strike : {
                image : 'tiles/strike.png',
                position : { x : 850, y : 4320 }
            }, 
            greenOutline : {
                image : 'fields/half-field-green.png',
                position : { x : 133 + 1, y : 4243 }
            },
            redOutline : {
                image : 'fields/half-field-red.png',
                position : { x : 133 + 1, y : 4243 }
            },
            blueOutline : {
                image : 'fields/half-field-blue.png',
                position : { x : 133 + 1, y : 4243 }
            },


        },
        zipCodeBilling : { 
            stamp : {
                image : 'tiles/stamp.png',
                position : { x : 1730, y : 4320 }
            }, 
            strike : {
                image : 'tiles/strike.png',
                position : { x : 1730, y : 4320 }
            }, 
            greenOutline : {
                image : 'fields/half-field-green.png',
                position : { x : 1013 + 1, y : 4243 }
            },
            redOutline : {
                image : 'fields/half-field-red.png',
                position : { x : 1013 + 1, y : 4243 }
            },
            blueOutline : {
                image : 'fields/half-field-blue.png',
                position : { x : 1013 + 1, y : 4243 }
            },


        },
        countryBilling : { 
            stamp : {
                image : 'tiles/stamp.png',
                position : { x : 850, y : 4600 }
            }, 
            strike : {
                image : 'tiles/strike.png',
                position : { x : 850, y : 4600 }
            }, 
            greenOutline : {
                image : dropdownHighlightGreen,
                position : { x : 112, y : 4509 }
            },
            redOutline : {
                image : dropdownHighlightRed,
                position : { x : 112, y : 4509 }
            },
            blueOutline : {
                image : dropdownHighlightBlue,
                position : { x : 112, y : 4509 }
            },


        },
        idType : { 
            stamp : {
                image : 'tiles/stamp.png',
                position : { x : 850, y : 4880 }
            }, 
            strike : {
                image : 'tiles/strike.png',
                position : { x : 850, y : 4880 }
            }, 
            greenOutline : {
                image : 'fields/half-field-green.png',
                position : { x : 133 + 1, y : 4803 }
            },
            redOutline : {
                image : 'fields/half-field-red.png',
                position : { x : 133 + 1, y : 4803 }
            },
            blueOutline : {
                image : 'fields/half-field-blue.png',
                position : { x : 133 + 1, y : 4803 }
            },


        },
        birthDate : { 
            stamp : {
                image : 'tiles/stamp.png',
                position : { x : 850, y : 5160 }
            }, 
            strike : {
                image : 'tiles/strike.png',
                position : { x : 850, y : 5160 }
            }, 
            greenOutline : {
                image : 'fields/date-field-green.png',
                position : { x : 108 + 45 - 18, y : 5069 + 35 - 20 }
            },
            redOutline : {
                image : 'fields/date-field-red.png',
                position : { x : 108 + 45 - 18, y : 5069 + 35 - 20 }
            },
            blueOutline : {
                image : 'fields/date-field-blue.png',
                position : { x : 108 + 45 - 18, y : 5069 + 35 - 20 }
            },


        },
        idNumber : { 
            stamp : {
                image : 'tiles/stamp.png',
                position : { x : 1730, y : 5160 }
            }, 
            strike : {
                image : 'tiles/strike.png',
                position : { x : 1730, y : 5160 }
            }, 
            greenOutline : {
                image : 'fields/half-field-green.png',
                position : { x : 1013 + 1, y : 5083 }
            },
            redOutline : {
                image : 'fields/half-field-red.png',
                position : { x : 1013 + 1, y : 5083 }
            },
            blueOutline : {
                image : 'fields/half-field-blue.png',
                position : { x : 1013 + 1, y : 5083 }
            },


        },
        issueDate : { 
            stamp : {
                image : 'tiles/stamp.png',
                position : { x : 850, y : 5440 }
            }, 
            strike : {
                image : 'tiles/strike.png',
                position : { x : 850, y : 5440 }
            }, 
            greenOutline : {
                image : 'fields/date-field-green.png',
                position : { x : 108 + 45 - 18, y : 5349 + 35 - 20 }
            },
            redOutline : {
                image : 'fields/date-field-red.png',
                position : { x : 108 + 45 - 18, y : 5349 + 35 - 20 }
            },
            blueOutline : {
                image : 'fields/date-field-blue.png',
                position : { x : 108 + 45 - 18, y : 5349 + 35 - 20 }
            },


        },
        expirationDate : { 
            stamp : {
                image : 'tiles/stamp.png',
                position : { x : 1730, y : 5440 }
            }, 
            strike : {
                image : 'tiles/strike.png',
                position : { x : 1730, y : 5440 }
            }, 
            greenOutline : {
                image : 'fields/date-field-green.png',
                position : { x : 988 + 45 - 18, y : 5349 + 35 - 20 }
            },
            redOutline : {
                image : 'fields/date-field-red.png',
                position : { x : 988 + 45 - 18, y : 5349 + 35 - 20 }
            },
            blueOutline : {
                image : 'fields/date-field-blue.png',
                position : { x : 988 + 45 - 18, y : 5349 + 35 - 20 }
            },


        },
        issueState : { 
            stamp : {
                image : 'tiles/stamp.png',
                position : { x : 850, y : 5720 }
            }, 
            strike : {
                image : 'tiles/strike.png',
                position : { x : 850, y : 5720 }
            }, 
            greenOutline : {
                image : 'fields/half-field-green.png',
                position : { x : 133 + 1, y : 5643 }
            },
            redOutline : {
                image : 'fields/half-field-red.png',
                position : { x : 133 + 1, y : 5643 }
            },
            blueOutline : {
                image : 'fields/half-field-blue.png',
                position : { x : 133 + 1, y : 5643 }
            },


        },
        taxId : { 
            stamp : {
                image : 'tiles/stamp.png',
                position : { x : 850, y : 6000 }
            }, 
            strike : {
                image : 'tiles/strike.png',
                position : { x : 850, y : 6000 }
            }, 
            greenOutline : {
                image : 'fields/half-field-green.png',
                position : { x : 133 + 1, y : 5923 }
            },
            redOutline : {
                image : 'fields/half-field-red.png',
                position : { x : 133 + 1, y : 5923 }
            },
            blueOutline : {
                image : 'fields/half-field-blue.png',
                position : { x : 133 + 1, y : 5923 }
            },


        },
        terms : { 
            stamp : {
                image : 'tiles/stamp.png',
                position : { x : 1730, y : 7100 }
            }, 
            strike : {
                image : 'tiles/strike.png',
                position : { x : 1730, y : 7100 }
            }, 
            greenOutline : {
                image : giantHighlightGreen,
                position : { x : 61 + 45, y : 6151 + 35 }
            },
            redOutline : {
                image : giantHighlightRed,
                position : { x : 61 + 45, y : 6151 + 35 }
            },
            blueOutline : {
                image : giantHighlightBlue,
                position : { x : 61 + 45, y : 6151 + 35 }
            },


        },
        privacy : { 
            stamp : {
                image : 'tiles/stamp.png',
                position : { x : 1730, y : 8300 }
            }, 
            strike : {
                image : 'tiles/strike.png',
                position : { x : 1730, y : 8300 }
            }, 
            greenOutline : {
                image : giantHighlightGreen,
                position : { x : 61 + 45, y : 7351 + 35 }
            },
            redOutline : {
                image : giantHighlightRed,
                position : { x : 61 + 45, y : 7351 + 35 }
            },
            blueOutline : {
                image : giantHighlightBlue,
                position : { x : 61 + 45, y : 7351 + 35 }
            },


        },
        credit : { 
            stamp : {
                image : 'tiles/stamp.png',
                position : { x : 1730, y : 9500 }
            }, 
            strike : {
                image : 'tiles/strike.png',
                position : { x : 1730, y : 9500 }
            }, 
            greenOutline : {
                image : giantHighlightGreen,
                position : { x : 61 + 45, y : 8551 + 35 }
            },
            redOutline : {
                image : giantHighlightRed,
                position : { x : 61 + 45, y : 8551 + 35 }
            },
            blueOutline : {
                image : giantHighlightBlue,
                position : { x : 61 + 45, y : 8551 + 35 }
            },


        }

    }

    // Yes Button
    yesButton               = game.add.sprite( 1560, 33, 'spritesheet', 'yes-button/yes-button-00.png' );
    yesButton.inputEnabled  = true;
    yesButton.scale.set( .7 );

    yesButton.animations.add( 'not-pressed',   
            [ 'yes-button/yes-button-00.png' ],
    3, true );

    yesButton.animations.add( 'press-down',   
            [ 
              'yes-button/yes-button-01.png',
              'yes-button/yes-button-02.png',
              'yes-button/yes-button-03.png',
              'yes-button/yes-button-04.png',
              'yes-button/yes-button-05.png',
              'yes-button/yes-button-06.png',
              'yes-button/yes-button-07.png',
              'yes-button/yes-button-08.png',
              'yes-button/yes-button-09.png',
              'yes-button/yes-button-10.png',
              'yes-button/yes-button-11.png',
              'yes-button/yes-button-12.png',
              'yes-button/yes-button-12.png',
              'yes-button/yes-button-13.png',
              'yes-button/yes-button-14.png',
              'yes-button/yes-button-15.png',
              'yes-button/yes-button-16.png',
              'yes-button/yes-button-17.png',
              'yes-button/yes-button-18.png',
              'yes-button/yes-button-19.png',
              'yes-button/yes-button-20.png',
              'yes-button/yes-button-21.png',
              'yes-button/yes-button-22.png'
             ],
    60, false );

    yesButton.events.onInputDown.add( function(){

        if( !skippingGame ) {
            skippingGame = true;
            yesButton.play( 'press-down' );

            music.pause();
            yesMusic.restart();
            yesMusic.loopFull();
            yesMusic.volume = .7;

            setTimeout( function(){

                skipGame();

            }, 400 );
        }
        

    });

    yesButtonBg     = game.add.image( 1089, 64, 'spritesheet', 'yes-button/yes-button-bg.png' );

    if( THE_LOGO ) {
        topBarLogo  = game.add.image( 130, 50, 'logo' );
        // topBarLogo.anchor.y = -.5;
    }

    thankYouButton = game.add.image( 1230, 9820, 'spritesheet', 'background/finish-active.png' );
    thankYouButton.alpha = .33;
    

    // LABELS
    nameLabel = game.add.image( 130, 256 + 10 + ( 280 * ( 1  - 1 )), 'spritesheet', 'labels/label01.png' );
    nameLabel.cacheAsBitmap = true;
    nameLabel.autoCull = true;
    labels.children.push( nameLabel );
    streetNameLabel = game.add.image( 130, 256 + 10 + ( 280 * ( 2  - 1 )), 'spritesheet', 'labels/label02.png' );
    streetNameLabel.cacheAsBitmap = true;
    streetNameLabel.autoCull = true;
    labels.children.push( streetNameLabel );
    cityLabel = game.add.image( 130, 256 + 10 + ( 280 * ( 3  - 1 )), 'spritesheet', 'labels/label03.png' );
    cityLabel.cacheAsBitmap = true;
    cityLabel.autoCull = true;
    labels.children.push( cityLabel );
    zipCodeLabel = game.add.image( 1020 - 8, 256 + 10 + ( 280 * ( 3  - 1 )), 'spritesheet', 'labels/label04.png' );
    zipCodeLabel.cacheAsBitmap = true;
    zipCodeLabel.autoCull = true;
    labels.children.push( zipCodeLabel );
    countryLabel = game.add.image( 130, 256 + 10 + ( 280 * ( 4  - 1 )), 'spritesheet', 'labels/label05.png' );
    countryLabel.cacheAsBitmap = true;
    countryLabel.autoCull = true;
    labels.children.push( countryLabel );
    emailLabel = game.add.image( 130, 256 + 10 + ( 280 * ( 5  - 1 )), 'spritesheet', 'labels/label06.png' );
    emailLabel.cacheAsBitmap = true;
    emailLabel.autoCull = true;
    labels.children.push( emailLabel );
    verifyEmailLabel = game.add.image( 130, 256 + 10 + ( 280 * ( 6  - 1 )), 'spritesheet', 'labels/label07.png' );
    verifyEmailLabel.cacheAsBitmap = true;
    verifyEmailLabel.autoCull = true;
    labels.children.push( verifyEmailLabel );
    homeNumberLabel = game.add.image( 130, 256 + 10 + ( 280 * ( 7  - 1 )), 'spritesheet', 'labels/label08.png' );
    homeNumberLabel.cacheAsBitmap = true;
    homeNumberLabel.autoCull = true;
    labels.children.push( homeNumberLabel );
    mobileNumberLabel = game.add.image( 1020 - 8, 256 + 10 + ( 280 * ( 7  - 1 )), 'spritesheet', 'labels/label09.png' );
    mobileNumberLabel.cacheAsBitmap = true;
    mobileNumberLabel.autoCull = true;
    labels.children.push( mobileNumberLabel );
    usernameLabel = game.add.image( 130, 256 + 10 + ( 280 * ( 8  - 1 )), 'spritesheet', 'labels/label10.png' );
    usernameLabel.cacheAsBitmap = true;
    usernameLabel.autoCull = true;
    labels.children.push( usernameLabel );
    passwordLabel = game.add.image( 130, 256 + 10 + ( 280 * ( 9  - 1 )), 'spritesheet', 'labels/label11.png' );
    passwordLabel.cacheAsBitmap = true;
    passwordLabel.autoCull = true;
    labels.children.push( passwordLabel );
    passwordConfirmLabel = game.add.image( 1020 - 8, 256 + 10 + ( 280 * ( 9  - 1 )), 'spritesheet', 'labels/label12.png' );
    passwordConfirmLabel.cacheAsBitmap = true;
    passwordConfirmLabel.autoCull = true;
    labels.children.push( passwordConfirmLabel );
    paymentLabel = game.add.image( 130, 256 + 10 + ( 280 * ( 10 - 1 ) ), 'spritesheet', 'labels/label13.png' );
    paymentLabel.cacheAsBitmap = true;
    paymentLabel.autoCull = true;
    labels.children.push( paymentLabel );
    accountLabel = game.add.image( 130, 256 + 10 + ( 280 * ( 11 - 1 ) ), 'spritesheet', 'labels/label14.png' );
    accountLabel.cacheAsBitmap = true;
    accountLabel.autoCull = true;
    labels.children.push( accountLabel );
    bankCodeLabel = game.add.image( 130, 256 + 10 + ( 280 * ( 12 - 1 ) ), 'spritesheet', 'labels/label15.png' );
    bankCodeLabel.cacheAsBitmap = true;
    bankCodeLabel.autoCull = true;
    labels.children.push( bankCodeLabel );
    accountNameLabel = game.add.image( 130, 256 + 10 + ( 280 * ( 13 - 1 ) ), 'spritesheet', 'labels/label16.png' );
    accountNameLabel.cacheAsBitmap = true;
    accountNameLabel.autoCull = true;
    labels.children.push( accountNameLabel );
    streetNameBillingLabel = game.add.image( 130, 256 + 10 + ( 280 * ( 14 - 1 ) ), 'spritesheet', 'labels/label17.png' );
    streetNameBillingLabel.cacheAsBitmap = true;
    streetNameBillingLabel.autoCull = true;
    labels.children.push( streetNameBillingLabel );
    cityBillingLabel = game.add.image( 130, 256 + 10 + ( 280 * ( 15 - 1 ) ), 'spritesheet', 'labels/label18.png' );
    cityBillingLabel.cacheAsBitmap = true;
    cityBillingLabel.autoCull = true;
    labels.children.push( cityBillingLabel );
    zipCodeBillingLabel = game.add.image( 1020 - 8, 256 + 10 + ( 280 * ( 15 - 1 ) ), 'spritesheet', 'labels/label19.png' );
    zipCodeBillingLabel.cacheAsBitmap = true;
    zipCodeBillingLabel.autoCull = true;
    labels.children.push( zipCodeBillingLabel );
    countryBillingLabel = game.add.image( 130, 256 + 10 + ( 280 * ( 16 - 1 ) ), 'spritesheet', 'labels/label20.png' );
    countryBillingLabel.cacheAsBitmap = true;
    countryBillingLabel.autoCull = true;
    labels.children.push( countryBillingLabel );
    idTypeLabel = game.add.image( 130, 256 + 10 + ( 280 * ( 17 - 1 ) ), 'spritesheet', 'labels/label21.png' );
    idTypeLabel.cacheAsBitmap = true;
    idTypeLabel.autoCull = true;
    labels.children.push( idTypeLabel );
    birthDateLabel = game.add.image( 130, 256 + 10 + ( 280 * ( 18 - 1 ) ), 'spritesheet', 'labels/label22.png' );
    birthDateLabel.cacheAsBitmap = true;
    birthDateLabel.autoCull = true;
    labels.children.push( birthDateLabel );
    idNumberLabel = game.add.image( 1020 - 8, 256 + 10 + ( 280 * ( 18 - 1 ) ), 'spritesheet', 'labels/label23.png' );
    idNumberLabel.cacheAsBitmap = true;
    idNumberLabel.autoCull = true;
    labels.children.push( idNumberLabel );
    issueDateLabel = game.add.image( 130, 256 + 10 + ( 280 * ( 19 - 1 ) ), 'spritesheet', 'labels/label24.png' );
    issueDateLabel.cacheAsBitmap = true;
    issueDateLabel.autoCull = true;
    labels.children.push( issueDateLabel );
    expirationDateLabel = game.add.image( 1020 - 8, 256 + 10 + ( 280 * ( 19 - 1 ) ), 'spritesheet', 'labels/label25.png' );
    expirationDateLabel.cacheAsBitmap = true;
    expirationDateLabel.autoCull = true;
    labels.children.push( expirationDateLabel );
    issueStateLabel = game.add.image( 130, 256 + 10 + ( 280 * ( 20 - 1 ) ), 'spritesheet', 'labels/label26.png' );
    issueStateLabel.cacheAsBitmap = true;
    issueStateLabel.autoCull = true;
    labels.children.push( issueStateLabel );
    taxIdLabel = game.add.image( 130, 256 + 10 + ( 280 * ( 21 - 1 ) ), 'spritesheet', 'labels/label27.png' );
    taxIdLabel.cacheAsBitmap = true;
    taxIdLabel.autoCull = true;
    labels.children.push( taxIdLabel );
    termsAndConditionsLabel = game.add.image( 130, 256 + 10 + ( 280 * ( 22 - 1 ) ), 'spritesheet', 'labels/label28.png' );
    termsAndConditionsLabel.cacheAsBitmap = true;
    termsAndConditionsLabel.autoCull = true;
    labels.children.push( termsAndConditionsLabel );
    privacyPolicyLabel = game.add.image( 130, 256 + 10 + ( 280 * ( 22 - 1 ) ) + 1200, 'spritesheet', 'labels/label29.png' );
    privacyPolicyLabel.cacheAsBitmap = true;
    privacyPolicyLabel.autoCull = true;
    labels.children.push( privacyPolicyLabel );
    approveCreditLabel = game.add.image( 130, 256 + 10 + ( 280 * ( 22 - 1 ) ) + 2400, 'spritesheet', 'labels/label30.png' );
    approveCreditLabel.cacheAsBitmap = true;
    approveCreditLabel.autoCull = true;
    labels.children.push(     approveCreditLabel );


    // heckling
    nameHeckle = game.add.image( 130, 210 + ( 280 * ( 1  )), 'spritesheet', 'heckling/heckling01.png' );
    nameHeckle.cacheAsBitmap = true;
    nameHeckle.autoCull = true;
    fieldImages.name.heckle = nameHeckle;
    nameHeckle.visible = false;
    heckles.children.push( nameHeckle );
    streetNameHeckle = game.add.image( 130, 210 + ( 280 * ( 2  )), 'spritesheet', 'heckling/heckling02.png' );
    streetNameHeckle.cacheAsBitmap = true;
    streetNameHeckle.autoCull = true;
    fieldImages.streetName.heckle = streetNameHeckle;
    streetNameHeckle.visible = false;
    heckles.children.push( streetNameHeckle );
    cityHeckle = game.add.image( 130, 210 + ( 280 * ( 3  )), 'spritesheet', 'heckling/heckling03.png' );
    cityHeckle.cacheAsBitmap = true;
    cityHeckle.autoCull = true;
    fieldImages.city.heckle = cityHeckle;
    cityHeckle.visible = false;
    heckles.children.push( cityHeckle );
    zipCodeHeckle = game.add.image( 1020 - 8, 210 + ( 280 * ( 3  )), 'spritesheet', 'heckling/heckling04.png' );
    zipCodeHeckle.cacheAsBitmap = true;
    zipCodeHeckle.autoCull = true;
    fieldImages.zipCode.heckle = zipCodeHeckle;
    zipCodeHeckle.visible = false;
    heckles.children.push( zipCodeHeckle );
    // countryHeckle = game.add.image( 130, 210 + ( 280 * ( 4  )), 'spritesheet', 'heckling/heckling05.png' );
    // countryHeckle.cacheAsBitmap = true;
    // countryHeckle.autoCull = true;
    // fieldImages.country.heckle = countryHeckle;
    // countryHeckle.visible = false;
    // heckles.children.push( countryHeckle );
    emailHeckle = game.add.image( 130, 210 + ( 280 * ( 5  )), 'spritesheet', 'heckling/heckling06.png' );
    emailHeckle.cacheAsBitmap = true;
    emailHeckle.autoCull = true;
    fieldImages.email.heckle = emailHeckle;
    emailHeckle.visible = false;
    heckles.children.push( emailHeckle );
    verifyEmailHeckle = game.add.image( 130, 210 + ( 280 * ( 6  )), 'spritesheet', 'heckling/heckling07.png' );
    verifyEmailHeckle.cacheAsBitmap = true;
    verifyEmailHeckle.autoCull = true;
    fieldImages.verifyEmail.heckle = verifyEmailHeckle;
    verifyEmailHeckle.visible = false;
    heckles.children.push( verifyEmailHeckle );
    homeNumberHeckle = game.add.image( 130, 210 + ( 280 * ( 7  )), 'spritesheet', 'heckling/heckling08.png' );
    homeNumberHeckle.cacheAsBitmap = true;
    homeNumberHeckle.autoCull = true;
    fieldImages.homeNumber.heckle = homeNumberHeckle;
    homeNumberHeckle.visible = false;
    heckles.children.push( homeNumberHeckle );
    mobileNumberHeckle = game.add.image( 1020 - 8, 210 + ( 280 * ( 7  )), 'spritesheet', 'heckling/heckling09.png' );
    mobileNumberHeckle.cacheAsBitmap = true;
    mobileNumberHeckle.autoCull = true;
    fieldImages.mobileNumber.heckle = mobileNumberHeckle;
    mobileNumberHeckle.visible = false;
    heckles.children.push( mobileNumberHeckle );
    usernameHeckle = game.add.image( 130, 210 + ( 280 * ( 8  )), 'spritesheet', 'heckling/heckling10.png' );
    usernameHeckle.cacheAsBitmap = true;
    usernameHeckle.autoCull = true;
    fieldImages.username.heckle = usernameHeckle;
    usernameHeckle.visible = false;
    heckles.children.push( usernameHeckle );
    passwordHeckle = game.add.image( 130, 210 + ( 280 * ( 9  )), 'spritesheet', 'heckling/heckling11.png' );
    passwordHeckle.cacheAsBitmap = true;
    passwordHeckle.autoCull = true;
    fieldImages.password.heckle = passwordHeckle;
    passwordHeckle.visible = false;
    heckles.children.push( passwordHeckle );
    passwordConfirmHeckle = game.add.image( 1020 - 8, 210 + ( 280 * ( 9  )), 'spritesheet', 'heckling/heckling12.png' );
    passwordConfirmHeckle.cacheAsBitmap = true;
    passwordConfirmHeckle.autoCull = true;
    fieldImages.passwordConfirm.heckle = passwordConfirmHeckle;
    passwordConfirmHeckle.visible = false;
    heckles.children.push( passwordConfirmHeckle );
    // paymentHeckle = game.add.image( 130, 210 + ( 280 * ( 10 ) ), 'spritesheet', 'heckling/heckling13.png' );
    // paymentHeckle.cacheAsBitmap = true;
    // paymentHeckle.autoCull = true;
    // fieldImages.payment.heckle = paymentHeckle;
    // paymentHeckle.visible = false;
    // heckles.children.push( paymentHeckle );
    accountHeckle = game.add.image( 130, 210 + ( 280 * ( 11 ) ), 'spritesheet', 'heckling/heckling14.png' );
    accountHeckle.cacheAsBitmap = true;
    accountHeckle.autoCull = true;
    fieldImages.account.heckle = accountHeckle;
    accountHeckle.visible = false;
    heckles.children.push( accountHeckle );
    bankCodeHeckle = game.add.image( 130, 210 + ( 280 * ( 12 ) ), 'spritesheet', 'heckling/heckling15.png' );
    bankCodeHeckle.cacheAsBitmap = true;
    bankCodeHeckle.autoCull = true;
    fieldImages.bankCode.heckle = bankCodeHeckle;
    bankCodeHeckle.visible = false;
    heckles.children.push( bankCodeHeckle );
    accountNameHeckle = game.add.image( 130, 210 + ( 280 * ( 13 ) ), 'spritesheet', 'heckling/heckling16.png' );
    accountNameHeckle.cacheAsBitmap = true;
    accountNameHeckle.autoCull = true;
    fieldImages.accountName.heckle = accountNameHeckle;
    accountNameHeckle.visible = false;
    heckles.children.push( accountNameHeckle );
    streetNameBillingHeckle = game.add.image( 130, 210 + ( 280 * ( 14 ) ), 'spritesheet', 'heckling/heckling17.png' );
    streetNameBillingHeckle.cacheAsBitmap = true;
    streetNameBillingHeckle.autoCull = true;
    fieldImages.streetNameBilling.heckle = streetNameBillingHeckle;
    streetNameBillingHeckle.visible = false;
    heckles.children.push( streetNameBillingHeckle );
    cityBillingHeckle = game.add.image( 130, 210 + ( 280 * ( 15 ) ), 'spritesheet', 'heckling/heckling18.png' );
    cityBillingHeckle.cacheAsBitmap = true;
    cityBillingHeckle.autoCull = true;
    fieldImages.cityBilling.heckle = cityBillingHeckle;
    cityBillingHeckle.visible = false;
    heckles.children.push( cityBillingHeckle );
    zipCodeBillingHeckle = game.add.image( 1020 - 8, 210 + ( 280 * ( 15 ) ), 'spritesheet', 'heckling/heckling19.png' );
    zipCodeBillingHeckle.cacheAsBitmap = true;
    zipCodeBillingHeckle.autoCull = true;
    fieldImages.zipCodeBilling.heckle = zipCodeBillingHeckle;
    zipCodeBillingHeckle.visible = false;
    heckles.children.push( zipCodeBillingHeckle );
    // countryBillingHeckle = game.add.image( 130, 210 + ( 280 * ( 16 ) ), 'spritesheet', 'heckling/heckling20.png' );
    // countryBillingHeckle.cacheAsBitmap = true;
    // countryBillingHeckle.autoCull = true;
    // fieldImages.countryBilling.heckle = countryBillingHeckle;
    // countryBillingHeckle.visible = false;
    // heckles.children.push( countryBillingHeckle );
    idTypeHeckle = game.add.image( 130, 210 + ( 280 * ( 17 ) ), 'spritesheet', 'heckling/heckling21.png' );
    idTypeHeckle.cacheAsBitmap = true;
    idTypeHeckle.autoCull = true;
    fieldImages.idType.heckle = idTypeHeckle;
    idTypeHeckle.visible = false;
    heckles.children.push( idTypeHeckle );
    birthDateHeckle = game.add.image( 130, 210 + ( 280 * ( 18 ) ), 'spritesheet', 'heckling/heckling22.png' );
    birthDateHeckle.cacheAsBitmap = true;
    birthDateHeckle.autoCull = true;
    fieldImages.birthDate.heckle = birthDateHeckle;
    birthDateHeckle.visible = false;
    heckles.children.push( birthDateHeckle );
    idNumberHeckle = game.add.image( 1020 - 8, 210 + ( 280 * ( 18 ) ), 'spritesheet', 'heckling/heckling23.png' );
    idNumberHeckle.cacheAsBitmap = true;
    idNumberHeckle.autoCull = true;
    fieldImages.idNumber.heckle = idNumberHeckle;
    idNumberHeckle.visible = false;
    heckles.children.push( idNumberHeckle );
    issueDateHeckle = game.add.image( 130, 210 + ( 280 * ( 19 ) ), 'spritesheet', 'heckling/heckling24.png' );
    issueDateHeckle.cacheAsBitmap = true;
    issueDateHeckle.autoCull = true;
    fieldImages.issueDate.heckle = issueDateHeckle;
    issueDateHeckle.visible = false;
    heckles.children.push( issueDateHeckle );
    expirationDateHeckle = game.add.image( 1020 - 8, 210 + ( 280 * ( 19 ) ), 'spritesheet', 'heckling/heckling25.png' );
    expirationDateHeckle.cacheAsBitmap = true;
    expirationDateHeckle.autoCull = true;
    fieldImages.expirationDate.heckle = expirationDateHeckle;
    expirationDateHeckle.visible = false;
    heckles.children.push( expirationDateHeckle );
    issueStateHeckle = game.add.image( 130, 210 + ( 280 * ( 20 ) ), 'spritesheet', 'heckling/heckling26.png' );
    issueStateHeckle.cacheAsBitmap = true;
    issueStateHeckle.autoCull = true;
    fieldImages.issueState.heckle = issueStateHeckle;
    issueStateHeckle.visible = false;
    heckles.children.push( issueStateHeckle );
    taxIdHeckle = game.add.image( 130, 210 + ( 280 * ( 21 ) ), 'spritesheet', 'heckling/heckling27.png' );
    taxIdHeckle.cacheAsBitmap = true;
    taxIdHeckle.autoCull = true;
    fieldImages.taxId.heckle = taxIdHeckle;
    taxIdHeckle.visible = false;
    heckles.children.push( taxIdHeckle );
    // termsAndConditionsHeckle = game.add.image( 130, 210 + ( 280 * ( 22 ) ), 'spritesheet', 'heckling/heckling28.png' );
    // termsAndConditionsHeckle.cacheAsBitmap = true;
    // termsAndConditionsHeckle.autoCull = true;
    // fieldImages.termsAndConditions.heckle = termsAndConditionsHeckle;
    // termsAndConditionsHeckle.visible = false;
    // heckles.children.push( termsAndConditionsHeckle );
    // privacyPolicyHeckle = game.add.image( 130, 210 + ( 280 * ( 22 ) ) + 1200, 'spritesheet', 'heckling/heckling29.png' );
    // privacyPolicyHeckle.cacheAsBitmap = true;
    // privacyPolicyHeckle.autoCull = true;
    // fieldImages.privacyPolicy.heckle = privacyPolicyHeckle;
    // privacyPolicyHeckle.visible = false;
    // heckles.children.push( privacyPolicyHeckle );
    // approveCreditHeckle = game.add.image( 130, 210 + ( 280 * ( 22 ) ) + 2400, 'spritesheet', 'heckling/heckling30.png' );
    // approveCreditHeckle.cacheAsBitmap = true;
    // approveCreditHeckle.autoCull = true;
    // fieldImages.approveCredit.heckle = approveCreditHeckle;
    // approveCreditHeckle.visible = false;
    // heckles.children.push(     approveCreditHeckle );


    // HECKLING WILL HECKIN GO HERE


    // SHADOWS 
    var makeShadow = function( x, y, flip ){

        var shadow = game.add.image( x, y, 'spritesheet', 'background/shadow.png' );
        bgElements.add( shadow );
        shadow.cacheAsBitmap = true;
        shadow.autoCull = true;
        shadow.scale.y = flip ? -1 : 1;
        shadow.y = flip ? shadow.y + 15 : shadow.y - 15;
        shadow.alpha = 1;

        // shadow.pulse = game.add.tween( shadow );
        // shadow.pulse.to( { alpha : .3 }, 1000, Phaser.Easing.FourStep.None, true );
        // shadow.pulse.yoyo( true, 250 );
        // shadow.pulse.repeat( -1, 500 );
        shadows.children.push( shadow );
        
        return shadow;

    };

    nameShadowB                     = makeShadow( 1640, 480, true );
    addressShadowT                  = makeShadow( 1640, 600 );
    addressShadowB                  = makeShadow( 160, 760, true );
    cityShadowT                     = makeShadow( 160, 880 );
    cityShadowB                     = makeShadow( 760, 1040, true );
    zipCodeShadowT                  = makeShadow( 1040, 880 );
    zipCodeShadowB                  = makeShadow( 1640, 1040, true );
    countryShadowT                  = makeShadow( 160, 1160 );
    countryShadowB                  = makeShadow( 760, 1320, true );
    emailShadowT                    = makeShadow( 160, 1440 );
    emailShadowB                    = makeShadow( 1640, 1600, true );
    verifyEmailShadowT              = makeShadow( 1640, 1720 );
    verifyEmailShadowB              = makeShadow( 160, 1880, true );
    homeNumberShadowT               = makeShadow( 160, 2000 );
    homeNumberShadowB               = makeShadow( 760, 2160, true );
    mobileNumberShadowT             = makeShadow( 1040, 2000 );
    mobileNumberShadowB             = makeShadow( 1640, 2160, true );
    usernameShadowT                 = makeShadow( 160, 2280 );
    usernameShadowB                 = makeShadow( 1640, 2440, true );
    passwordShadowT                 = makeShadow( 160, 2560 );
    passwordShadowB                 = makeShadow( 760, 2720, true );
    passwordConfirmShadowT          = makeShadow( 1040, 2560 );
    passwordConfirmShadowB          = makeShadow( 1640, 2720, true );
    paymentShadowT                  = makeShadow( 160, 2840 );
    paymentShadowB                  = makeShadow( 760, 3000, true );
    paymentShadowT                  = makeShadow( 160, 2840 );
    paymentShadowB                  = makeShadow( 760, 3000, true );
    accountShadowT                  = makeShadow( 160, 3120 );
    accountShadowB                  = makeShadow( 1640, 3280, true );
    bankCodeShadowT                 = makeShadow( 1640, 3400 );
    bankCodeShadowB                 = makeShadow( 160, 3560, true );
    accountNameShadowT              = makeShadow( 160, 3680 );
    accountNameShadowB              = makeShadow( 1640, 3840, true );
    streetNameShadowT               = makeShadow( 1640, 3960 );
    streetNameShadowB               = makeShadow( 160, 4120, true );
    cityBillingShadowT              = makeShadow( 160, 4240 );
    cityBillingShadowB              = makeShadow( 760, 4400, true );
    zipCodeBillingShadowT           = makeShadow( 1040, 4240 );
    zipCodeBillingShadowB           = makeShadow( 1640, 4400, true );
    countryBillingShadowT           = makeShadow( 160, 4520 );
    countryBillingShadowB           = makeShadow( 760, 4680, true );
    idTypeShadowT                   = makeShadow( 160, 4800 );
    idTypeShadowB                   = makeShadow( 760, 4960, true );
    birthDateShadow1T               = makeShadow( 160, 5080 );
    birthDateShadow1B               = makeShadow( 160, 5240, true );
    birthDateShadow2T               = makeShadow( 400, 5080 );
    birthDateShadow2B               = makeShadow( 400, 5240, true );
    birthDateShadow3T               = makeShadow( 640, 5080 );
    birthDateShadow3B               = makeShadow( 760, 5240, true );
    idNumberShadowT                 = makeShadow( 1040, 5080 );
    idNumberShadowB                 = makeShadow( 1640, 5240, true );
    issueDateShadow1T               = makeShadow( 160, 5360 );
    issueDateShadow1B               = makeShadow( 160, 5520, true );
    issueDateShadow2T               = makeShadow( 400, 5360 );
    issueDateShadow2B               = makeShadow( 400, 5520, true );
    issueDateShadow3T               = makeShadow( 640, 5360 );
    issueDateShadow3B               = makeShadow( 760, 5520, true );
    expirationDateShadow1T          = makeShadow( 1040, 5360 );
    expirationDateShadow1B          = makeShadow( 1040, 5520, true );
    expirationDateShadow2T          = makeShadow( 1280, 5360 );
    expirationDateShadow2B          = makeShadow( 1280, 5520, true );
    expirationDateShadow3T          = makeShadow( 1520, 5360 );
    expirationDateShadow3B          = makeShadow( 1640, 5520, true );
    issueStateShadowT               = makeShadow( 160, 5640 );
    issueStateShadowB               = makeShadow( 760, 5800, true );
    taxIdShadowT                    = makeShadow( 760, 5920 );
    taxIdShadowB                    = makeShadow( 160, 6080, true );
    termsShadowT                    = makeShadow( 160, 6200 );
    termsShadowB                    = makeShadow( 640, 7200, true );
    privacyShadowT                  = makeShadow( 160, 7400 );
    privacyShadowB                  = makeShadow( 640, 8400, true );
    creditShadowT                   = makeShadow( 160, 8600 );
    creditShadowB                   = makeShadow( 640, 9600, true );

}