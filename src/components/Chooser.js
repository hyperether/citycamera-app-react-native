import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Footer } from './common';
import ImageMenuItem from './ImageMenuItem';
import TouchableMenuItem from './TouchableMenuItem';
import OverlayChooserItem from './OverlayChooserItem';

class Chooser extends Component {

  renderItem(type, isTouchable) {
    switch (type) {
      case "photo":
        if (isTouchable) {
          return(
            <TouchableMenuItem
              imagePath={require('../assets/images/photo.png')}
              onPress={() => Actions.addPhoto()}
            />
          );
        } else {
          return(
            <ImageMenuItem imagePath={require('../assets/images/photo_pressed.png')} />
          );
        }
      case "location":
        if (isTouchable) {
          return(
            <TouchableMenuItem
              imagePath={require('../assets/images/location.png')}
              //onPress={() => Actions.addLocation()}
            />
            );
        } else {
          return(
            <ImageMenuItem imagePath={require('../assets/images/location_pressed.png')} />
          );
        }
      case "about":
        if (isTouchable) {
          return(
            <TouchableMenuItem
              imagePath={require('../assets/images/about.png')}
              //onPress={() => Actions.addDescription()}
            />
            );
        } else {
          return(
            <ImageMenuItem imagePath={require('../assets/images/about_pressed.png')} />
          );
        }

      case "send":
        if (isTouchable) {
          return (
            <TouchableMenuItem
              imagePath={require('../assets/images/send.png')}
              //onPress={}
            />
          );
        } else {
          return(
            <ImageMenuItem imagePath={require('../assets/images/send_pressed.png')} />
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
  return(
    <View style={mainContainerStyle}>
      <View style={menuItemsContainerStyle}>
        <OverlayChooserItem imagePath={require('../assets/images/square.png')} />
        <View style={menuRowStyle}>
          {this.renderItem("photo", true)}
          {this.renderItem("location", false)}
        </View>
        <View style={menuRowStyle}>
          {this.renderItem("about", false)}
          {this.renderItem("send", false)}
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
        flexDirection: 'column',
        alignItems: 'space-around',
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      menuRowStyle: {
        flex: 1,
        flexDirection: 'row',
        zIndex: 2
      }
    }

export default Chooser;
