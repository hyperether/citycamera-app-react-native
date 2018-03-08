import React, { Component } from 'react';
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
                <Header headerText= 'CityCam'/>
                
                <View >
                    <Router />
                </View>    
            </View>
        );
    }
}

export default App;