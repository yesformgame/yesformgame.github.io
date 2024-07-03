// game object organization
var fields = [

    'name',
    'email',
    'password',
    'passwordConfirm',
    'address',
    // 'username'

];

var areas = {};

// results
var text = {}; // built in buildText()
text.style = {
    complete    : { font: "110px Times", fill: "#A0A0A0", align: "left" },
    clock       : { font: "32px Arial", fill: "#000000", align: "left" },
    progress    : { font: "110px Times", fill: "rgba( 64, 64, 64, .1 )", align: "left" }
} ;

var fieldText = {

    name : { 
        text : 'Kerry Cline',
        position: { x : 145, y : 480 }
    },
    email : { 
        text : 'coolmom22@gmail.com',
        position: { x : 145, y : 740 }
    },
    password : { 
        text : 'password',
        position: { x : 145, y : 1000 }
    },
    passwordConfirm : { 
        text : 'password',
        position: { x : 1045, y : 1000 }
    },
    address : { 
        text : '123 Drury Lane',
        position: { x : 145, y : 1260 }
    }


};

var fieldImages = {

    name : {
        stamp : {
            image : 'stamp',
            position : { x : 1750, y : 500 }
        }, 
        strike : {
            image : 'strike',
            position : { x : 1750, y : 500 }
        }, 
        greenOutline : {
            image : 'full-field-green-outline',
            position : { x : 100, y : 460 }
        },
        redOutline : {
            image : 'full-field-red-outline',
            position : { x : 100, y : 460 }
        },


    }, 

    email : {
        stamp : {
            image : 'stamp',
            position : { x : 1750, y : 760 }
        }, 
        strike : {
            image : 'strike',
            position : { x : 1750, y : 760 }
        }, 
        greenOutline : {
            image : 'full-field-green-outline',
            position : { x : 100, y : 720 }
        },
        redOutline : {
            image : 'full-field-red-outline',
            position : { x : 100, y : 720 }
        },



    }, 

    password : {
        stamp : {
            image : 'stamp',
            position : { x : 850, y : 1020 }
        }, 
        strike : {
            image : 'strike',
            position : { x : 850, y : 1020 }
        }, 
        greenOutline : {
            image : 'half-field-green-outline',
            position : { x : 100, y : 980 }
        },
        redOutline : {
            image : 'half-field-red-outline',
            position : { x : 100, y : 980 }
        },



    }, 

    passwordConfirm : {
        stamp : {
            image : 'stamp',
            position : { x : 1750, y : 1020 }
        }, 
        strike : {
            image : 'strike',
            position : { x : 1750, y : 1020 }
        }, 
        greenOutline : {
            image : 'half-field-green-outline',
            position : { x : 1000, y : 980 }
        },
        redOutline : {
            image : 'half-field-red-outline',
            position : { x : 1000, y : 980 }
        },



    }, 

    address : {
        stamp : {
            image : 'stamp',
            position : { x : 1750, y : 1280 }
        }, 
        strike : {
            image : 'strike',
            position : { x : 1750, y : 1280 }
        }, 
        greenOutline : {
            image : 'full-field-green-outline',
            position : { x : 100, y : 1240 }
        },
        redOutline : {
            image : 'full-field-red-outline',
            position : { x : 100, y : 1240 }
        },



    }, 

}