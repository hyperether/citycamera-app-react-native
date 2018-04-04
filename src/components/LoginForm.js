import React, { Component } from "react";
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Keyboard } from "react-native";
import { connect } from "react-redux";
import { userNameChanged, passwordChanged, loginUser } from "../actions";
import { Actions } from "react-native-router-flux";
import { Card, CardSection, Input, Spinner } from "./common";
import backgroundImage from "../assets/images/bg.jpg"

class LoginForm extends Component {

  constructor(props){
    super(props);
  }

  onButtonPress() {
    const { userName, password } = this.props;
    this.props.loginUser({ userName, password });
    Keyboard.dismiss();
    // this.onUserNameChange('');
    // this.onPasswordChange('')
  }

  onUserNameChange(text) {
    this.props.userNameChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  renderError(){
    if (this.props.error){
      return (
        <View>
          <Text style={styles.errorTextStyle}>
              {this.props.error}
          </Text>
        </View>
      )
    }
  }

  renderLogInButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return <Button title="Login" onPress={this.onButtonPress.bind(this)}/>;
  }

  render() {
    return (
      <ImageBackground 
        source={backgroundImage}          
        style={styles.backgroundImage}
      >
        
          <View style={styles.container}>
              <View style={styles.inputContainer}>
                <TextInput 
                  style={styles.input} 
                  placeholder="username" 
                  placeholderTextColor= "white"                
                  underlineColorAndroid="transparent"
                  onChangeText={this.onUserNameChange.bind(this)}
                  value={this.props.userName} //<-- iz mapStateToPropsa(iz reducera)
                />
                <TextInput 
                  style={styles.input} 
                  secureTextEntry
                  placeholder="password" 
                  placeholderTextColor= "white"
                  underlineColorAndroid="transparent"
                  onChangeText={this.onPasswordChange.bind(this)}
                  value={this.props.password} //<-- iz mapStateToPropsa
                />
            </View>
            {this.renderError()}
            {this.renderLogInButton()}
            <Text style={styles.signUpTextStyle} onPress={Actions.signup}>
              Register
            </Text>
        </View>
        
      </ImageBackground>







      // <Card>
      //   <CardSection>
      //     <Input
      //       placeholder="Username"
      //       label="Username:"
      //       style={{ height: 40, width: 100 }}
      //       onChangeText={this.onUserNameChange.bind(this)}
      //       value={this.props.userName} //<-- iz mapStateToPropsa(iz reducera)
      //     />
      //   </CardSection>

      //   <CardSection>
      //     <Input
      //       secureTextEntry
      //       placeholder="Password"
      //       label="Password:"
      //       style={{ height: 40, width: 100 }}
      //       onChangeText={this.onPasswordChange.bind(this)}
      //       value={this.props.password} //<-- iz mapStateToPropsa
      //     />
      //   </CardSection>

      //   

      //   <CardSection>
      //     {this.renderLogInButton()}
      //   </CardSection>

      //   <CardSection>
      //     <Text style={styles.signUpTextStyle} onPress={Actions.signup}>
      //       Register
      //     </Text>
      //   </CardSection>
      // </Card>
    );
  }
}

// const styles = {
//   errorTextStyle: {
//     fontSize: 20,
//     alignSelf: "center",
//     color: "red"
//   },

//   buttonViewStyle: {
//     flex: 1,
//     height: 60
//   },

//   signUpTextStyle: {
//     flexDirection: "row",
//     alignItems: "center",
//     color: "blue"
//   }
// };

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  backgroundImage: {
    width: "100%",
    flex: 1,
  },

  backgroundOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)'
  },

  inputContainer: {
    width:"70%",
    marginBottom: 15,
  },

  input: {
    color: "white",
    width: "100%",
    height: 40,    
    backgroundColor:"rgba(0,0,0,0.5)",
    padding: 5,
    paddingLeft: 15,
    margin: 8,
  },

  signUpTextStyle: {
    flexDirection: "row",
    alignItems: "center",
    color: "white",
    fontWeight: "bold",
    marginTop: 10,
  },

  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "white",
    backgroundColor: "transparent",
    fontWeight: "bold",
    textShadowColor:"red",
    textShadowOffset: {width: -1, height: 1}
    
  },
})


//mapStateToProps helper služi za komunikaciju iz reducera u komponentu, tj da vratimo properti koji hoćemo iz
//reducera u komponentu.
const mapStateToProps = state => {
  return {
    userName: state.auth.userName, //<--iz AuthReducer-a
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading
  };
};

export default connect(mapStateToProps, {
  userNameChanged,
  passwordChanged,
  loginUser
})(LoginForm);
