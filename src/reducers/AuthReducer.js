import {
     USERNAME_CHANGED,
     EMAIL_CHANGED,
     PASSWORD_CHANGED, 
     AUTH_SET_TOKEN
    } from '../actions/types'

const INITIAL_STATE = { //<---default podesavanja. Prazni stringovi.
    email: '',
    password: ''
};

export default (state = INITIAL_STATE, action) => {

    console.log(action);

    switch (action.type) {
       
        case USERNAME_CHANGED:
            return {...state, userName: action.payload}; // <--napravi novi objekat, uzmi sve propertije iz state objekata i ubaci ih u novi objekat. Zatim uzmi actio.payload prop i ubaci ga na pocetak (ako vec postoji, pregazi ga.)
        
        case EMAIL_CHANGED:
            return {...state, email: action.payload};

        case PASSWORD_CHANGED:
            return {...state, password: action.payload};
    

        default:
            return state;
    };
};