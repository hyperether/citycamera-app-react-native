import React, { Component } from 'react';
import firebase from 'firebase';
import { View } from 'react-native';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component{

    state = { logedIn: false};

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyA6mpqZDVLikpRNBCOIIPIh7_Xu_4FRdZM',
            authDomain: 'auth-app-deef3.firebaseapp.com',
            databaseURL: 'https://auth-app-deef3.firebaseio.com',
            projectId: 'auth-app-deef3',
            storageBucket: 'auth-app-deef3.appspot.com',
            messagingSenderId: '406214564155'
            
        });

        firebase.auth().onAuthStateChanged((user) =>{
            if (user) {
                this.setState({logedIn: true});
            } else {
                this.setState({logedIn: false});
            }
        });
    };

    renderContent() {
        if (this.state.logedIn){
            return(
                <Button whenPressed={() => firebase.auth().signOut()}>
                    Log Out
                </Button>
            )
        }
        return <LoginForm />;
    
        // switch (this.state.logedIn){
        //     case true: 
        //     return(
        //         <Button>
        //             Log Out
        //         </Button>
        //     )
        
        //     case false:
        //        return <LoginForm />

        //     default:
        //         return <Spinner size="large" />
            
        // }
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