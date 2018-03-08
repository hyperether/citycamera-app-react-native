import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { userNameChanged, passwordChanged, loginUser } from '../actions';
import { Actions } from 'react-native-router-flux';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {

    //odlučuje da li će spiner ili dugme biti u card section-u
    onButtonPress(){
        const {email, password} = this.props;
        this.props.loginUser({email, password});
    }


    onEmailChange(text){
        this.props.userNameChanged(text);
    }

    onPasswordChange(text){
        this.props.passwordChanged(text);
    }

    render (){
        return (
            <Card>
                <CardSection>
                    <Input 
                        placeholder="Username"
                        label="Username:"
                        style={{height: 40, width: 100}} 
                        onChangeText={this.onEmailChange.bind(this)}  
                        value={this.props.email} //<-- iz mapStateToPropsa                      
                    />
                </CardSection>
                
                <CardSection>                
                    <Input 
                        secureTextEntry                                    
                        placeholder="Password"
                        label="Password:"
                        style={{height: 40, width: 100}}     
                        onChangeText={this.onPasswordChange.bind(this)} 
                        value={this.props.password}  //<-- iz mapStateToPropsa                  
                    />

                </CardSection>

                <Text style={styles.errorTextStyle}>
                 {/* {this.state.error} */}
                </Text>

                <CardSection>
                    <Button whenPressed={this.onButtonPress.bind(this)}>
                        Login
                    </Button>
                </CardSection>

                <CardSection >
                    <Text 
                        style={styles.signUpTextStyle}
                        onPress={Actions.signup}
                    >
                        Register
                    </Text>
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
        height:60
    },

    signUpTextStyle: {
        flexDirection: 'row',
        alignItems:'center',
        color: 'blue'
    }

}

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password
    }
}

export default connect(mapStateToProps,{emailChanged, passwordChanged, loginUser})(LoginForm);