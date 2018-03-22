import API from '../services/API';
import Session from '../services/Session';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage, ToastAndroid } from 'react-native';
import {
    USERNAME_CHANGED,
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    POST_IMAGE_ADDED,
    POST_DESCRIPTION_ADDED,
    POST_LOCATION_ADDED
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

        API.login(userName,password)
          .then(response => {
              dispatch({type: 'LOGIN_USER_SUCCESS', payload: response});
              console.log('Response is ', response);

              try {
                AsyncStorage.setItem('user', JSON.stringify(response.data.user))

                .then(() => {
                    AsyncStorage.setItem('token', JSON.stringify(response.data.token))
                    .then(() => {
                        Session.save(response.data.user, response.data.token);
                        console.log(Session.isAuth());
                        Actions.chooser({userData: response.data.user});
                    });
                })
                .catch(() => {
                    console.log('Greska prilikom snimanja korisnika.');
                });
              } catch(error){
                  console.log(error);
              }
             })
          .catch((error) => {
            console.log("Logovanje nije uspelo: " + error);
          });
        }
};

export const registerUser = ({ userName, email, password}) => {
    console.log ({userName, email, password})
    return (dispatch) => {
          API.register(userName,email, password)
          .then(user => {
              dispatch({type: 'REGISTER_USER_SUCCESS', payload: user});
              console.log('sucess register',user);
              Actions.login();
             })
          .catch((error) => {
            console.log("Registracija nije uspela: " + error);
          });
    };
};

//Action creator preko readux-thunk-a vraca funkciju koja ce se kasnije pozvati preko dispatch - a.
//------------Post Actions --------------------
//akciju treba povezati sa reducerom preko POST_IMAGE_ADDED
export const imageAdded = (image) => {
    return {
        type: POST_IMAGE_ADDED,
        payload: image,
    }
}

export const descriptionAdded = (description) => {
    return {
        type: POST_DESCRIPTION_ADDED,
        payload: description,
    }
}

export const addLocation = (position) => {
  return {
    type: POST_LOCATION_ADDED,
    payload: position
  }
}
