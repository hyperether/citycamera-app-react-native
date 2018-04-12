import React from 'react';
import { View, Image, Text } from 'react-native';

const OverlaySendingItem = ({ imagePath }) => {
  const { overlayItemStyle, imageStyle, textStyle } = styles;

  return(
    <View style={overlayItemStyle}>
      <Image
        source={imagePath}
        style={imageStyle} />
        {/* <Text style={textStyle}>Sending...</Text> */}
    </View>
  );
};

const styles = {
  overlayItemStyle: {
    position: 'absolute',
    zIndex: 5
  },
  imageStyle: {
    height: 110,
    width: 110
  },
  textStyle: {
    fontSize: 20,
    alignItems: 'center',
    paddingLeft: 10,
    color: 'black'
  }
};

export default OverlaySendingItem;
