// 
// CUSTOM EASING
// 


Phaser.Easing.Elastobounce = {

    /**
    * ease-in.
    */
    In: function ( k ) {

        var s, a = 0.1, p = 0.4;
        if ( k === 0 ) return 0;
        if ( k === 1 ) return 1;
        if ( !a || a < 1 ) { a = 1; s = p / 4; }
        else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
        return - ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );

    },

    /**
    * ease-out.
    */
    Out: function ( k ) {

        var s = 0.2, a = 0.8, p = 0.2;
        if ( k === 0 ) return 0;
        if ( k === 1 ) return 1;      
        return ( a * Math.pow( 2, - 10 * k) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) + 1 );

    },

    /**
    * ease-in/out.
    */
    InOut: function ( k ) {

        var s, a = 0.1, p = 0.4;
        if ( k === 0 ) return 0;
        if ( k === 1 ) return 1;
        if ( !a || a < 1 ) { a = 1; s = p / 4; }
        else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
        if ( ( k *= 2 ) < 1 ) return - 0.5 * ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );
        return a * Math.pow( 2, -10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) * 0.5 + 1;

    }

};

Phaser.Easing.Superback = {

    /**
    * Back ease-in.
    *
    * @method Phaser.Easing.Back#In
    * @param {number} k - The value to be tweened.
    * @returns {number} The tweened value.
    */
    In: function ( k ) {

        var s = 1.70158 * 8;
        return k * k * ( ( s + 1 ) * k - s );

    },

    /**
    * Back ease-out.
    *
    * @method Phaser.Easing.Back#Out
    * @param {number} k - The value to be tweened.
    * @returns {number} The tweened value.
    */
    Out: function ( k ) {

        var s = 1.70158 * 8;
        return --k * k * ( ( s + 1 ) * k + s ) + 1;

    },

    /**
    * Back ease-in/out.
    *
    * @method Phaser.Easing.Back#InOut
    * @param {number} k - The value to be tweened.
    * @returns {number} The tweened value.
    */
    InOut: function ( k ) {

        var s = 1.70158 * 8 * 1.525;
        if ( ( k *= 2 ) < 1 ) return 0.5 * ( k * k * ( ( s + 1 ) * k - s ) );
        return 0.5 * ( ( k -= 2 ) * k * ( ( s + 1 ) * k + s ) + 2 );

    }

};

Phaser.Easing.TwoStep = {


    In: function ( k ) {

        var s = 0;
        if( k > .5 ) s = 1;
        return s;

    },

    Out: function ( k ) {

        var s = 0;
        if( k > .5 ) s = 1;
        return s;

    },

    InOut: function ( k ) {

        var s = 0;
        if( k > .5 ) s = 1;
        return s;

    }

};

Phaser.Easing.OneStep = {


    In: function ( k ) {

        var s = 0;
        if( k > .5 ) s = 1;
        return s;

    },

    Out: function ( k ) {

        var s = 0;
        if( k > .5 ) s = 1;
        return s;

    },

    InOut: function ( k ) {

        var s = 0;
        if( k > .5 ) s = 1;
        return s;

    }

};

Phaser.Easing.TwoStep = {


    In: function ( k ) {

        var s = 0;
        if( k > .5 ) s = .5;
        if( k === 1 ) s = 1;
        return s;

    },

    Out: function ( k ) {

        var s = 0;
        if( k > .5 ) s = .5;
        if( k === 1 ) s = 1;
        return s;

    },

    InOut: function ( k ) {

        var s = 0;
        if( k > .5 ) s = .5;
        if( k === 1 ) s = 1;
        return s;

    }

};

Phaser.Easing.ThreeStep = {


    In: function ( k ) {

        var s = 0;
        if( k > .25 ) s = .33;
        if( k > .5 ) s = .66;
        if( k > .75 ) s = 1;
        return s;

    },

    Out: function ( k ) {

        var s = 0;
        if( k > .25 ) s = .33;
        if( k > .5 ) s = .66;
        if( k > .75 ) s = 1;
        return s;

    },

    InOut: function ( k ) {

        var s = 0;
        if( k > .25 ) s = .33;
        if( k > .5 ) s = .66;
        if( k > .75 ) s = 1;
        return s;

    }

};

Phaser.Easing.FourStep = {


    In: function ( k ) {

        var s = 0;
        if( k > .2 ) s = .25;
        if( k > .4 ) s = .5;
        if( k > .6 ) s = .75;
        if( k > .8 ) s = 1;
        return s;

    },

    Out: function ( k ) {

        var s = 0;
        if( k > .2 ) s = .25;
        if( k > .4 ) s = .5;
        if( k > .6 ) s = .75;
        if( k > .8 ) s = 1;
        return s;
    },

    InOut: function ( k ) {

        var s = 0;
        if( k > .2 ) s = .25;
        if( k > .4 ) s = .5;
        if( k > .6 ) s = .75;
        if( k > .8 ) s = 1;
        return s;

    }

};

Phaser.Easing.FourStepBack = {


    Out: function ( k ) {

        var s = 0;
        if( k > .25 ) s = .5;
        if( k > .5 ) s = 1;
        if( k > .75 ) s = 1.5;
        if( k == 1 ) s = 1;
        return s;
    }

};

Phaser.Easing.FourStepBackSuper = {


    Out: function ( k ) {

        var s = 0;
        if( k > .25 ) s = .5;
        if( k > .5 ) s = 1;
        if( k > .75 ) s = 2.5;
        if( k == 1 ) s = 1;
        return s;
    }

};