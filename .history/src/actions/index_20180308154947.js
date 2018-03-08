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
    return (disptach) => {
        axios.post('http://mycitycamera.com/user/login', {
            username: email,
            password: password
          })
          .then(user => {
              dispatch({type: 'LOGIN_USER_SUCCESS', payload: user
          })
          .catch((error) => {
            console.log(error);
          });

    //TODO sign in user with email(username) and pass
    }

    
    
    
    //ovako ide preko firebase-a
    return (dispatch) => {
        dispatch({type: LOGIN_USER});

        firebase.auth().signInWithEmailAndPassword (email, password)
        .then (user => loginUserSuccess(dispatch, user),
            // dispatch({type: LOGIN_USER_SUCCESS, payload: user
        )
        .catch((err) => {
            console.log(err);
            firebase.auth().createUserWithEmailAndPassword (email, password)
            .then (user => {
                loginUserSuccess(dispatch, user);
                console.log('log in succes')
                // dispatch({ type: LOGIN_USER_SUCCESS, payload: user
            })
            .catch((err) => {
                loginUserFail(dispatch);
            });
        })
    };


};





//Action creator preko readux-thunk-a vraca funkciju koja ce se kasnije pozvati preko dispatch - a.