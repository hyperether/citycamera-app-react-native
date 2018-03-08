import React from 'react';
import {View, Text} from 'react-native'
import { Actions, Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Chooser from './components/Chooser';

const RouterComponent = () => {
    console.log("Ruter")
    
    return (
        <Router>
            <Scene key = 'root'>
                <Scene 
                    key = 'login'
                    title = 'Welcome to CityCam'
                    component = {LoginForm}
                    initial
                />

                <Scene 
                    key = 'signup'
                    title = 'Please signup'                
                    component = {SignupForm}
                />

                <Scene 
                    key = 'chooser'
                    title = 'Choose what to do'
                    component = {Chooser}
                />
            </Scene>
        </Router>
    );
};

export default RouterComponent;