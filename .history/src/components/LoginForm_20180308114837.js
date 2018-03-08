import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {


    onLoginPress() {
        // const {email, password} = this.state;
        console.log('login')
    }

    onLoginFail(){
        console.log("login failed")
    }

    onLoginSuccess(){
        // this.setState({
        //     email: '',
        //     password: '',
        //     loading: false,
        //     error: ''
        // })
    }

    onSignupPress() {
        {Actions.signup}
    }


    //odlučuje da li će spiner ili dugme biti u card section-u
    renderButtons(){
        // if(this.state.loading){
        //     return < Spinner size='small'/>
        // };

        return (
            <View style={styles.buttonViewStyle}>
                <Button whenPressed={this.onLoginPress.bind(this)}>
                    Log In
                </Button>
                <Button whenPressed={Actions.signup}>
                    Sign Up
                </Button>
            </View>
                
            
        );
    }


    render (){
        return (
            <Card>
                <CardSection>
                    <Input 
                        placeholder="Username"
                        label="Email:"
                        // value={this.state.email}
                        // onChangeText={email => this.setState({ email })}
                        style={{height: 40, width: 100}}                         
                    />
                </CardSection>
                
                <CardSection>                
                <Input 
                        secureTextEntry                                    
                        placeholder="Password"
                        label="Password:"
                        // value={this.state.password}
                        // onChangeText={password => this.setState({ password })}
                        style={{height: 40, width: 100}}                         
                    />

                </CardSection>

                <Text style={styles.errorTextStyle}>
                 {/* {this.state.error} */}
                </Text>

                <CardSection>
                   {this.renderButtons()}
                </CardSection>
            </Card>
        );
    }
};

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },

    buttonViewStyle: {
        flex: 1,
        height:100
    }
}

export default LoginForm;