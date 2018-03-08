import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { View } from 'react-native';
import { Header, Button, Spinner } from './components/common';
import reducers from './reducers'
import Router from './Router';


class App extends Component{

    render(){
        // console.log(this.state.logedIn)
        
        return (
            <Provider store={createStore(reducers)}>
                <Router />
            </Provider>
        );
    }
}

export default App;