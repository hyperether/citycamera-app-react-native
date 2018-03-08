import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { 
    USERNAME_CHANGED,
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL 
} from './types';

export const userNameChanged = (text) => {
    return {
        type: USERNAME_CHANGED,
        payload: text
    };
};

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text //<--novi email koji korisnik kuca
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text //<--novi pass koji korisnik kuca
    };
};

export const loginUser = ({ userName, password}) => {
    console.log({userName, password})
    return (dispatch) => {
        // disptach({type: LOGIN_USER});

        axios.post('http://mycitycamera.com/user/login', {
            username: userName,
            password: password
          })
          .then(user => {
              dispatch({type: 'LOGIN_USER_SUCCESS', payload: user});
              console.log(user);
              Actions.chooser();
             })
          .catch((error) => {
            console.log("Logovanje nije uspelo: " + error);
          });
        }
};  
    
export const registerUser = ({ userName, email, password}) => {
    console.log ({userName, email, password})
    return (dispatch) => {
        axios.post('http://mycitycamera.com/user/register', {
            username: userName,
            email: email,
            password: password
          })
          .then(user => {
              dispatch({type: 'REGISTER_USER_SUCCESS', payload: user});
              console.log(user);  
              Actions.login();            
             })
          .catch((error) => {
            console.log("Registracija nije uspela: " + error);
          });
    };
};

//Action creator preko readux-thunk-a vraca funkciju koja ce se kasnije pozvati preko dispatch - a.