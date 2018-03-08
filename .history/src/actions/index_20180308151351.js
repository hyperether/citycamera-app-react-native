import { 
    EMAIL_CHANGED,
    PASSWORD_CHANGED 
} from './types';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text //<--novi email koji korisnik kuca
    }
}

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text //<--novi pass koji korisnik kuca
    };
};

export const loginUser = ({ email, password}) => {
    //TODO sign in user with email(username) and pass

};





//Action creator preko readux-thunk-a vraca funkciju koja ce se kasnije pozvati preko dispatch - a