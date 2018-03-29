import React, { Component } from "react";
import { View, ToastAndroid, Text } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Actions } from "react-native-router-flux";
import ImageMenuItem from "./ImageMenuItem";
import { Footer } from "./common";
import TouchableMenuItem from "./TouchableMenuItem";
import OverlayChooserItem from "./OverlayChooserItem";
import API from "../services/API";
import Session from "../services/Session";
import {loginUser, imageAdded, descriptionAdded, addLocation, postSent} from "../actions";


class PostCreator extends Component {
  constructor(props) {
    super(props);
    console.log("props je", props)
    console.log('login user', this.props.loginUser)
  }

  // logOutAlert(){
  //   Alert.alert(
  //     'Log Out',
  //     'Do you want to log out?',
  //     [
  //       {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
  //       {text: 'Yes', onPress: () => console.log('OK Pressed')},
  //     ],
  //     { cancelable: false }
  //   )
  // }

  // logOut(){
  //   this.props.loginUser({})
  // }

  resetAllStates(){
    // console.log("reset all states, this props ", this.pros)
    // saljemo nove podatke u actions a posle u reducer i na kraju u state.
    this.props.imageAdded({}); 

    console.log("Image name:", this.props.imageName);    
    console.log("Image path:", this.props.imagePath);
    console.log("Image extension:", this.props.imageExtension);
    console.log("Description:", this.props.description);
    console.log("Longitude: ", this.props.longitude);
    console.log("Latitude: ", this.props.latitude); 
    console.log("User je:", Session.getUser());
  }

  onSendPress(){
    //Podaci prosledjeni iz redux-a
    console.log("Image name:", this.props.imageName);    
    console.log("Image path:", this.props.imagePath);
    console.log("Image extension:", this.props.imageExtension);
    console.log("Description:", this.props.description);
    console.log("Longitude: ", this.props.longitude);
    console.log("Latitude: ", this.props.latitude); 
    console.log("User je:", Session.getUser());
  
    var uploadURL, fileId;
  
    API.getUploadURL(
      this.props.imageName, 
      this.props.imageExtension,
      this.props.description, 
      {long: this.props.longitude, lat: this.props.lat},
    ).then (response => {
      uploadURL = response.data.url;
      fileId = response.data.fileId;
      // console.log("Odgovor je ", uploadURL)
    }).then(()=>{
      const xhr = new XMLHttpRequest()
      xhr.onreadystatechange = (err) => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // console.log("Successfully uploaded the file.");
            ToastAndroid.show("Successfully uploaded the file.", ToastAndroid.LONG);            
            this.resetAllStates();
          } else {
            // console.log("The file could not be uploaded.");
            ToastAndroid.show("The file could not be uploaded.", ToastAndroid.LONG);            
            
          }
        }
      }
      xhr.open('PUT', uploadURL)
      // xhr.setRequestHeader('X-Amz-ACL', 'public-read')
      xhr.setRequestHeader('Content-Type', this.props.imageExtension)
      xhr.send({ 
        uri: 'file://'+this.props.imagePath, 
        name: fileId 
      })
    }) 
  }

  renderItem(type, isTouchable) {
    switch (type) {
      case "photo":
        if (isTouchable) {
          return (
            <TouchableMenuItem
              imagePath={require("../assets/images/photo.png")}
              onPress={() => Actions.addPhoto()}
            />
          );
        } else {
          return (
            <ImageMenuItem
              imagePath={require("../assets/images/photo_pressed.png")}
            />
          );
        }
      case "location":
        if (isTouchable) {
          return (
            <TouchableMenuItem
              imagePath={require("../assets/images/location.png")}
              onPress={() => Actions.addLocation()}
            />
          );
        } else {
          return (
            <ImageMenuItem
              imagePath={require("../assets/images/location_pressed.png")}
            />
          );
        }
      case "description":
        if (isTouchable) {
          return (
            <TouchableMenuItem
              imagePath={require("../assets/images/about.png")}
              onPress={() => Actions.addDescription()}
            />
          );
        } else {
          return (
            <ImageMenuItem
              imagePath={require("../assets/images/about_pressed.png")}
            />
          );
        }

      case "send":
        if (isTouchable) {
          return (
            <TouchableMenuItem
              imagePath={require("../assets/images/send.png")}
              onPress={this.onSendPress.bind(this)}
            />
          );
        } else {
          return (
            <ImageMenuItem
              imagePath={require("../assets/images/send_pressed.png")}
            />
          );
        }
      default:
        return;
    }
  }

  render() {
    const {
      mainContainerStyle,
      menuItemsContainerStyle,
      menuRowStyle
    } = styles;
    return (
      <View style={mainContainerStyle}>
        <View style={menuItemsContainerStyle}>
          <OverlayChooserItem
            imagePath={require("../assets/images/square.png")}
          />
          <View style={menuRowStyle}>
            {this.renderItem("photo", true)}
            {this.renderItem("location", this.props.imageName)}
          </View>
          <View style={menuRowStyle}>
            {this.renderItem("description", this.props.imageName)}
            {this.renderItem(
              "send",
              this.props.imageName && this.props.latitude && this.props.longitude
            )}
          </View>
        </View>
        <Footer />
      </View>
    );
  }
  }

  const styles = {
  mainContainerStyle: {
    flex: 1,
    zIndex: 0
  },
  menuItemsContainerStyle: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: "column",
    alignItems: "space-around",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  menuRowStyle: {
    flex: 1,
    flexDirection: "row",
    zIndex: 2
  }
  };

  //<-- da bi prisli nekom od ovih propseva kucamo this.props.imagePath, npr
  const mapDispatchToProps = dispatch => {
    return{
      imageAdded: bindActionCreators(imageAdded, dispatch),
      descriptionAdded: bindActionCreators(descriptionAdded, dispatch)
    }
  }

  const mapStateToProps = state => { 
    return {
      imagePath: state.post.imagePath,
      imageName: state.post.imageName,
      imageExtension: state.post.imageExtension,
      description: state.post.description,
      longitude: state.post.longitude,
      latitude: state.post.latitude
    };
  };


export default connect (mapStateToProps, mapDispatchToProps)(PostCreator);
