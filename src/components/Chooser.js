import React, { Component } from "react";
import { View } from "react-native";
import { Actions } from "react-native-router-flux";
import { Footer } from "./common";
import ImageMenuItem from "./ImageMenuItem";
import TouchableMenuItem from "./TouchableMenuItem";
import OverlayChooserItem from "./OverlayChooserItem";
import { connect } from "react-redux";
import { 
  imageAdded, 
  imageExtensionAdded, 
  descriptionAdded,
  addLocation 
  } from "../actions";

class Chooser extends Component {

  constructor(props) {
    super(props);
  }

  onSendPress(){
    //Podaci prosledjeni iz redux-a
    console.log("User data id: ", this.props.userData._id);
    console.log("Image name:", this.props.imageName);    
    console.log("Image path:", this.props.imagePath);
    console.log("Image extension:", this.props.imageExtension);
    console.log("Description:", this.props.description);
    console.log("Longitude: ", this.props.longitude);
    console.log("Latitude: ", this.props.latitude); 
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


const mapStateToProps = state => { //<-- da bi prisli nekom od ovih propseva kucamo this.props.imagePath, npr
  return {
    imagePath: state.post.imagePath,
    imageName: state.post.imageName,
    imageExtension: state.post.imageExtension,
    description: state.post.description,
    longitude: state.post.longitude,
    latitude: state.post.latitude
  };
};

export default connect(mapStateToProps, {
  imageAdded,
  descriptionAdded,
  addLocation
})(Chooser);
