import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { Actions, Scene, Router, NavBar } from "react-native-router-flux";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import AddPhoto from "./components/AddPhoto";
import AddDescription from "./components/AddDescription";
import AddLocation from "./components/AddLocation";
import PostCreator from "./components/PostCreator";
import { imageAdded, descriptionAdded, addLocation, loginUser, postSent } from "./actions"

class RouterComponent extends Component  {

  constructor (props){
    super(props)
  };

  renderBackButton = () => {
    return (
      <TouchableOpacity
      //TODO - logOutAlert
        onPress={() => {this.logOutAlert()}}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft:18 }}>
          <Image
                  source={require('./assets/images/exit.png')}
                  resizeMode={'contain'}/>
          {/* <Text>Back</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  logOutAlert(){
    Alert.alert(
      'Log Out',
      'Do you want to log out?',
      [
        {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => this.logOut()},
      ],
      { cancelable: false }
    )
  }

  logOut(){
    this.props.loginUser({});
    this.props.postSent({});
    Actions.pop()
  }

  render(){
    return (
      <Router>
        <Scene key="root" >
          <Scene
            hideNavBar
            key="login"
            title="Welcome to CityCam"
            component={LoginForm}
            initial
          />
          <Scene 
            key="signup" 
            title="Please signup" 
            component={SignupForm} 
          />
  
  
          {/* <Scene key="main"> */}
            <Scene						
              key="postCreator"
              title="Create a new post"
              component={PostCreator}
              renderBackButton={this.renderBackButton}
            />
            <Scene 
              key="addPhoto" 
              title="Add a photo" 
              component={AddPhoto} />
            <Scene
              key="addLocation"
              title="Select a location"
              component={AddLocation}
            />
            <Scene
              key="addDescription"
              title="Add description"
              component={AddDescription}
            />
          {/* </Scene> */}
        </Scene>
      </Router>
    );
  };
}
  
const mapDispatchToProps = dispatch => {
  return{
    loginUser: bindActionCreators(loginUser, dispatch),
    postSent: bindActionCreators(postSent, dispatch),
  }
}

export default connect (null, mapDispatchToProps)(RouterComponent);
