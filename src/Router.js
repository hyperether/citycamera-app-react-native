import React from 'react';
import {View, Text} from 'react-native'
import { Actions, Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Chooser from './components/Chooser';
import AddPhoto from './components/AddPhoto';
import AddDescription from './components/AddDescription';

const RouterComponent = () => {
    console.log("Ruter")

    return (
        <Router>
            <Scene key = 'root' hideNavBar>
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

                <Scene key="main">
                  <Scene
                      key = 'chooser'
                      title = 'Create a new post'
                      component = {Chooser}
                      initial
                  />
                  <Scene
                    key = "addPhoto"
                    title = "Add a photo"
                    component = {AddPhoto}
                  />
                  <Scene
                    key = "addDescription"
                    title = "Add description"
                    component = {AddDescription}
                    
                  />
                </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;
