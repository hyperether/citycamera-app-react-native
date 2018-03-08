import React from 'react';
import { Actions, Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

const RouterComponent = () => {
    
    return(
        console.log("Ruter")
        <Router>
            <Scene key = 'root'>
                <Scene 
                    key = 'login'
                    title = 'Please login'
                    component = {LoginForm}
                    initial
                />

                <Scene 
                    key = 'signup'
                    title = 'Please signup'                
                    component = {SignupForm}
                />
            </Scene>
        </Router>
    );
};

export default RouterComponent;