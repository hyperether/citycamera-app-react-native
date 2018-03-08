import React from 'react';
import { Actions, Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';

const Router = () => {
    <Router>
        <Scene key = 'root'>
            <Scene 
                key = 'login'
                component = {LoginForm}
                initial
            >
            </Scene>
        </Scene>
    </Router>
}