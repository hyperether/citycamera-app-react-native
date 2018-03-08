import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Actions } from 'react-native-router-flux';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {

    //odlučuje da li će spiner ili dugme biti u card section-u
    renderButtons(){
        // if(this.state.loading){
        //     return < Spinner size='small'/>
        // };

        return (
            <View style={styles.buttonViewStyle}>
                <Button whenPressed={this.onButtonPress.bind(this)}>
                    Login
                </Button>
            </View>
        );
    }


    onEmailChange(text){
        this.props.emailChanged(text);
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
                   {this.renderButtons()}
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