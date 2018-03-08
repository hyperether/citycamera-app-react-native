import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';

class SignupForm extends Component {

    state = {username:'', email: '', password: '', error: '', loading: false };

    onButtonPress() {
        const {username, email, password} = this.state;

        this.setState({error: '', loading: true});
    }

    onSignupFail(){
        this.setState(
            { error: 'Sign Up failed. Please check your credentials and try again.', 
            loading: false}
        )
    }

    onSignupSuccess(){
        this.setState({
            username: '',
            email: '',
            password: '',
            loading: false,
            error: ''
        })
    }

    //odlučuje da li će spiner ili dugme biti u card section-u
    renderButtons(){
        if(this.state.loading){
            return < Spinner size='small'/>
        };

        return (
            <View style={styles.buttonViewStyle}>
                <Button whenPressed={this.onButtonPress.bind(this)}>
                    Register
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
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        style={{height: 40, width: 100}}                         
                    />
                </CardSection>
                
                <CardSection>                
                <Input 
                        secureTextEntry                                    
                        placeholder="Password"
                        label="Password:"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        style={{height: 40, width: 100}}                         
                    />

                </CardSection>

                <Text style={styles.errorTextStyle}>
                 {this.state.error}
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

export default SignupForm;