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
    complete    : { font: "80px Times", fill: "#A0A0A0", align: "left" },
    clock       : { font: "32px Arial", fill: "#000000", align: "left" },
    progress    : { font: "80px Times", fill: "rgba( 64, 64, 64, .1 )", align: "left" }
} ;

var fieldText = {

    name : { 
        text : 'Kerry Cline',
        position: { x : 145, y : 295 }
    },
    email : { 
        text : 'coolmom22@gmail.com',
        position: { x : 145, y : 495 }
    },
    password : { 
        text : '••••••••',
        position: { x : 145, y : 695 }
    },
    passwordConfirm : { 
        text : '••••••••',
        position: { x : 825, y : 695 }
    },
    address : { 
        text : '123 Drury Lane',
        position: { x : 145, y : 895 }
    }


};

var fieldImages = {

    name : {
        stamp : {
            image : 'stamp',
            position : { x : 1375, y : 320 }
        }, 
        strike : {
            image : 'strike',
            position : { x : 1375, y : 320 }
        }, 
        greenOutline : {
            image : 'full-field-green-outline',
            position : { x : 120, y : 280 }
        },
        redOutline : {
            image : 'full-field-red-outline',
            position : { x : 120, y : 280 }
        },


    }, 

    email : {
        stamp : {
            image : 'stamp',
            position : { x : 1375, y : 520 }
        }, 
        strike : {
            image : 'strike',
            position : { x : 1375, y : 520 }
        }, 
        greenOutline : {
            image : 'full-field-green-outline',
            position : { x : 120, y : 480 }
        },
        redOutline : {
            image : 'full-field-red-outline',
            position : { x : 120, y : 480 }
        },



    }, 

    password : {
        stamp : {
            image : 'stamp',
            position : { x : 675, y : 720 }
        }, 
        strike : {
            image : 'strike',
            position : { x : 675, y : 720 }
        }, 
        greenOutline : {
            image : 'half-field-green-outline',
            position : { x : 120, y : 680 }
        },
        redOutline : {
            image : 'half-field-red-outline',
            position : { x : 120, y : 680 }
        },



    }, 

    passwordConfirm : {
        stamp : {
            image : 'stamp',
            position : { x : 1375, y : 720 }
        }, 
        strike : {
            image : 'strike',
            position : { x : 1375, y : 720 }
        }, 
        greenOutline : {
            image : 'half-field-green-outline',
            position : { x : 800, y : 680 }
        },
        redOutline : {
            image : 'half-field-red-outline',
            position : { x : 800, y : 680 }
        },



    }, 

    address : {
        stamp : {
            image : 'stamp',
            position : { x : 1375, y : 920 }
        }, 
        strike : {
            image : 'strike',
            position : { x : 1375, y : 920 }
        }, 
        greenOutline : {
            image : 'full-field-green-outline',
            position : { x : 120, y : 880 }
        },
        redOutline : {
            image : 'full-field-red-outline',
            position : { x : 120, y : 880 }
        },



    }, 

}