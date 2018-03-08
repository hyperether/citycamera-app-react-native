import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import { Header, Button, Spinner } from './components/common';
import Router from './Router';


class App extends Component{

    render(){
        console.log(this.state.logedIn)
        
        return (
            <Provider>
                
                <Router />
            </Provider>
        );
    }
}

export default App;