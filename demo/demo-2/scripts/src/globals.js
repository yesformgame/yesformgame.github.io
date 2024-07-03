// game object organization
var fields = [

    'name',
    'email',
    'password',
    'passwordConfirm',
    'address',
    'field6',
    'checkbox',
    // 'username'

];

// areas for coins and enemies
var areas = {};

// results
var text = {}; // built in buildText()
text.style = {
    // complete    : { font: "110px Graphik", fill: "#808080", align: "left" },
    complete    : { font: "110px Graphik", fill: "#000000", align: "left" },
    clock       : { font: "32px Arial", fill: "#000000", align: "left" },
    // progress    : { font: "110px Graphik", fill: "#808080", align: "left" }
    progress    : { font: "110px Graphik", fill: "rgba( 64, 64, 64, .1 )", align: "left" }
};

var fieldText = {

    name : { 
        text : 'Hey you guys',
        position: { x : 145, y : 480 }
    },
    email : { 
        text : 'coolmom22@gmail.com',
        text : 'there r def some bugs!!',
        position: { x : 145, y : 740 }
    },
    password : { 
        text : '!',
        position: { x : 145, y : 1000 }
    },
    passwordConfirm : { 
        text : 'hi daniel',
        position: { x : 1045, y : 1000 }
    },
    address : { 
        text : 'this is a demo',
        position: { x : 145, y : 1260 }
    },
    field6 : { 
        text : 'forms are bad!',
        position: { x : 145, y : 1260 }
    },
    checkbox : { 
        text : '.',
        position: { x : -99999, y : -999999 }
    }


};

var fieldImages = {

    name : {
        stamp : {
            image : 'stamp',
            position : { x : 1725, y : 520 }
        }, 
        strike : {
            image : 'strike',
            position : { x : 1725, y : 520 }
        }, 
        greenOutline : {
            image : 'full-field-green-outline',
            position : { x : 113, y : 460 }
        },
        redOutline : {
            image : 'full-field-red-outline',
            position : { x : 113, y : 460 }
        },


    }, 

    email : {
        stamp : {
            image : 'stamp',
            position : { x : 1725, y : 780 }
        }, 
        strike : {
            image : 'strike',
            position : { x : 1725, y : 780 }
        }, 
        greenOutline : {
            image : 'full-field-green-outline',
            position : { x : 113, y : 720 }
        },
        redOutline : {
            image : 'full-field-red-outline',
            position : { x : 113, y : 720 }
        },



    }, 

    password : {
        stamp : {
            image : 'stamp',
            position : { x : 850, y : 1040 }
        }, 
        strike : {
            image : 'strike',
            position : { x : 850, y : 1040 }
        }, 
        greenOutline : {
            image : 'half-field-green-outline',
            position : { x : 105, y : 980 }
        },
        redOutline : {
            image : 'half-field-red-outline',
            position : { x : 105, y : 980 }
        },



    }, 

    passwordConfirm : {
        stamp : {
            image : 'stamp',
            position : { x : 1725, y : 1040 }
        }, 
        strike : {
            image : 'strike',
            position : { x : 1725, y : 1040 }
        }, 
        greenOutline : {
            image : 'half-field-green-outline',
            position : { x : 973, y : 980 }
        },
        redOutline : {
            image : 'half-field-red-outline',
            position : { x : 973, y : 980 }
        },



    }, 

    address : {
        stamp : {
            image : 'stamp',
            position : { x : 1725, y : 1300 }
        }, 
        strike : {
            image : 'strike',
            position : { x : 1725, y : 1300 }
        }, 
        greenOutline : {
            image : 'full-field-green-outline',
            position : { x : 113, y : 1240 }
        },
        redOutline : {
            image : 'full-field-red-outline',
            position : { x : 113, y : 1240 }
        },



    }, 

    field6 : {
        stamp : {
            image : 'stamp',
            position : { x : 1725, y : 1560 }
        }, 
        strike : {
            image : 'strike',
            position : { x : 1725, y : 1560 }
        }, 
        greenOutline : {
            image : 'full-field-green-outline',
            position : { x : 113, y : 1240 }
        },
        redOutline : {
            image : 'full-field-red-outline',
            position : { x : 113, y : 1240 }
        },



    }, 

    checkbox : {
        stamp : {
            image : 'stamp',
            position : { x : 1725, y : 1760 }
        }, 
        strike : {
            image : 'strike',
            position : { x : 1725, y : 1760 }
        }, 
        greenOutline : {
            image : 'full-field-green-outline',
            position : { x : -99999, y : -99999 }
        },
        redOutline : {
            image : 'full-field-red-outline',
            position : { x : -99999, y : -99999 }
        },



    }, 

}