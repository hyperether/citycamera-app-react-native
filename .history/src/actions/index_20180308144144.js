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