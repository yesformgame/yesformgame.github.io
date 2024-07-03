
// text settings
var text = {}; // built in buildText()
text.style = {
    // complete    : { font: "110px Graphik", fill: "#808080", align: "left" },
    complete    : { font: "80pt Graphik", fill: "#000000", align: "left" },
    clock       : { font: "32px Arial", fill: "#ffffff", align: "center" },
    retina       : { font: "66px Retina", fill: "#000000", align: "center" },
    pixel       : { font: "110px Pixel", fill: "#000000", align: "left" },
    // progress    : { font: "110px Graphik", fill: "#808080", align: "left" }
    progress    : { font: "80pt Graphik", fill: "rgba( 64, 64, 64, .1 )", align: "left" }
};


// game field organization
var fields = [

    'name',
    'streetName',
    'city',
    'zipCode',
    'country', // dropdown
    'email',
    'verifyEmail',
    'homeNumber',
    'mobileNumber',
    'username',
    'password',
    'passwordConfirm',
    'payment', // dropdown
    'account',
    'bankCode',
    'accountName',
    'streetNameBilling',
    'cityBilling',
    'zipCodeBilling',
    'countryBilling', // dropdown
    'idType', // dropdown
    'birthDate',
    'idNumber',
    'issueDate',
    'expirationDate',
    'issueState',
    'taxId',
    'terms',
    'privacy',
    'credit'
    

];

// field text
var fieldText = {

    name : { 
        text : 'Niklas von Cursor',
        position: { x : 145, y : 342 + 23 }
    },
    streetName : { 
        text : 'Strobelallee 50 Apt 3L',
        position: { x : 145, y : 622 + 23 }
    },

    city : { 
        text : 'Frankfurt',
        position: { x : 145, y : 902 + 23 }
    },
    zipCode : { 
        text : '60437',
        position: { x : 1025, y : 902 + 23 }
    }
    ,
    country : { 
        text : '.', // Deutschland
        position: { x : 145, y : 1182 + 23 }
    },
    email : { 
        text : 'niklas@voncursor.co',
        position: { x : 145, y : 1462 + 23 }
    },
    verifyEmail : { 
        text : 'niklas@voncursor.co',
        position: { x : 145, y : 1742 + 23 }
    },

    homeNumber : {
        text: '49 89 23531 7150',
        position: { x : 145, y : 2022 + 23 }
    },
    mobileNumber : {
        text: '49 151 6295331',
        position: { x : 1025, y : 2022 + 23 }
    },


    username : {
        text: 'niklascursor1987',
        position: { x : 145, y : 2302 + 23 }
    },

    password : {
        text: '1987voncursor!',
        position: { x : 145, y : 2582 + 23 }
    },
    passwordConfirm : {
        text: '1987voncursor!',
        position: { x : 1025, y : 2582 + 23 }
    },


    payment : {
        text: '.', // Bank Transfer
        position: { x : 145, y : 2862 + 23 }
    },

    account : {
        text: 'DE84 5201 1517 7407 3449 91',
        position: { x : 145, y : 3142 + 23 }
    },
    bankCode : {
        text: 'BANKDEFF300',
        position: { x : 145, y : 3422 + 23 }
    },
    accountName : {
        text: 'Niklas von Cursor',
        position: { x : 145, y : 3702 + 23 }
    },
    streetNameBilling : {
        text: 'Strobelallee 50 Apt 3L',
        position: { x : 145, y : 3982 + 23 }
    },
    cityBilling : {
        text: 'Frankfurt',
        position: { x : 145, y : 4262 + 23 }
    },
    zipCodeBilling : {
        text: '60437',
        position: { x : 1025, y : 4262 + 23 }
    },
    countryBilling : {
        text: '.', // Deutschland
        position: { x : 145, y : 4542 + 23 }
    },
    idType : {
        text: 'Fuhrerschein', // Personalausweis
        position: { x : 145, y : 4822 + 23 }
    },
    birthDate : {
        text: ' 15        11       1987',
        position: { x : 145, y : 5102 + 23 }
    },
    idNumber : {
        text: 'B072RRE2I52',
        position: { x : 1025, y : 5102 + 23 }
    },
    issueDate : {
        text: ' 25       01       2014',
        position: { x : 145, y : 5382 + 23 }
    },
    expirationDate : {
        text: ' 26       01       2019',
        position: { x : 1025, y : 5382 + 23 }
    },
    issueState : {
        text: 'Frankfurt',
        position: { x : 145, y : 5662 + 23 }
    },
    taxId : {
        text: '01020304955',
        position: { x : 145, y : 5942 + 23 }
    },
    terms : {
        text: '.',
        position: { x : -99999, y : -99999 + 23 }
    },
    privacy : {
        text: '.',
        position: { x : -99999, y : -99999 + 23 }
    },
    credit : {
        text: '.',
        position: { x : -99999, y : -99999 + 23 }
    }


};
