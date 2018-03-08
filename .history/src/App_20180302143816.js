import React, { Component } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component{

    state = { logedIn: false};


    renderContent() {
        if (this.state.logedIn){
            return(
                <Button whenPressed={() => firebase.auth().signOut()}>
                    Log Out
                </Button>
            )
        }
        return <LoginForm />;

    }



    render(){
        console.log(this.state.logedIn)
        
        return (
            <View>
                <Header headerText= 'Authentication'/>
                
                <View style={{height:50}}>
                    {this.renderContent()}
                </View>    
            </View>
        );
    }
}

export default App;