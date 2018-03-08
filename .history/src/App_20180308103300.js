import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import { Header, Button, Spinner } from './components/common';
import Router from './Router';


class App extends Component{

    state = { logedIn: false, signUp: false};


    // renderContent() {
    //     if (this.state.logedIn){
    //         return(
    //             //ulogovan u aplikaciju
    //             <Button whenPressed={() => firebase.auth().signOut()}>
    //                 Log Out
    //             </Button>
    //         )
    //     } else if (this)

    //     return <Router />;

    // }



    render(){
        console.log(this.state.logedIn)
        
        return (
            <View>
                
                <Router />
            </View>
        );
    }
}

export default App;