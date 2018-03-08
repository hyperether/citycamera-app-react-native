import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { userNameChanged, emailChanged, passwordChanged, registerUser} from '../actions'
import { Button, Card, CardSection, Input, Spinner } from './common';

class SignupForm extends Component {

    onButtonPress() {
       const {userName, email, password} = this.props;
       this.props.registerUser({userName, email, password});
    }

    onUserNameChange(text) {
        this.props.userNameChanged(text);
    };

    onEmailChange(text) {
        this.props.emailChanged(text);
    };

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    };

    render (){
        return (
            <Card>
                <CardSection>
                    <Input 
                        placeholder="Username"
                        label="User:"
                        onChangeText={this.onUserNameChange.bind(this)}
                        style={{height: 40, width: 100}}    
                        value={this.props.userName}
                                             
                    />
                </CardSection>

                <CardSection>
                    <Input 
                        placeholder="Email"
                        label="Email:"
                        onChangeText={this.onEmailChange.bind(this)}
                        style={{height: 40, width: 100}} 
                        value={this.props.email}
                                                
                    />
                </CardSection>
                
                <CardSection>                
                    <Input 
                        secureTextEntry                                    
                        placeholder="Password"
                        label="Password:"
                        onChangeText={this.onPasswordChange.bind(this)}
                        style={{height: 40, width: 100}}   
                        value={this.props.password}
                                                
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                 {/* {this.state.error} */}
                </Text>

                <CardSection>
                    <Button whenPressed={this.onButtonPress.bind(this)}>
                        Register
                    </Button>
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

const mapStateToProps = state => {
    return {
        userName: state.auth.userName,
        email: state.auth.email,
        password: state.auth.password
    }
}

export default connect(mapStateToProps,{userNameChanged, emailChanged, passwordChanged, registerUser}) (SignupForm);