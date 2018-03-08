import {
     EMAIL_CHANGED,
     PASSWORD_CHANGED 
    } from '../actions/types'

const INITIAL_STATE = { //<---default podesavanja. Prazni stringovi.
    email: '',
    password: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return {...state, email: action.payload}; // <--napravi novi objekat, uzmi sve propertije iz state objekata i ubaci ih u novi objekat. Zatim uzmi actio.payload prop i ubaci ga na pocetak (ako vec postoji, pregazi ga.)
        
        case PASSWORD_CHANGED:
            return {...state, password: action.payload};
    
        default:
            return state;
    }
};