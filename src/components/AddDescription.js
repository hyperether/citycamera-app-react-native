import React, {Component} from 'react';
import { View, Image, TouchableOpacity, AsyncStorage, ToastAndroid } from 'react-native';
import ImagePicker from 'react-native-image-picker';

class AddDescription extends Component {

  render(){
    const {
      mainContainerStyle,
      imageContainerStyle,
      largeImageStyle,
      buttonsContainer,
      smallImageStyle,
      touchableStyle
    } = styles;
    return (
      <View style={mainContainerStyle}>
       <Text>Description</Text>
      </View>
    );
  };
};


const styles = {
  mainContainerStyle: {
    backgroundColor: '#cdf6f7',
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 50
  },
  imageContainerStyle: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignContent: 'center',
    paddingVertical: 20
  },
  largeImageStyle: {
    height: 200,
    width: 230,
    alignSelf: 'center'
  },
  buttonsContainer: {
    flex:1,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-start'
  },
  touchableStyle:{
    paddingHorizontal: 20
  },
  smallImageStyle: {
    height: 50,
    width: 100,
    alignSelf: 'center'
  }
}

export default AddDescription;
