import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';


export default combineReducers ({

    auth: AuthReducer //<-- Key Auth is peace of state produced from Authreducer

});

