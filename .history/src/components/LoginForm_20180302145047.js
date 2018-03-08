import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {

    state = { email: '', password: '', error: '', loading: false };

    onButtonPress() {
        const {email, password} = this.state;

        this.setState({error: '', loading: true});

    }

    onLoginFail(){
        this.setState({ error: 'Authentication failed.', loading: false})
    }

    onLoginSuccess(){
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        })
    }

    //odlučuje da li će spiner ili dugme biti u card section-u
    renderButton(){
        if(this.state.loading){
            return < Spinner size='small'/>
        };

        return (
            <Button whenPressed={this.onButtonPress.bind(this)}>
               Log In
            </Button> 
        );
    }


    render (){
        return (
            <Card>
                <CardSection>
                    <Input 
                        placeholder="user@gmail.com"
                        label="Email:"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        style={{height: 40, width: 100}}                         
                    />
                </CardSection>
                
                <CardSection>                
                <Input 
                        secureTextEntry                                    
                        placeholder="password"
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
                   {this.renderButton()}
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
    }
}

export default LoginForm;