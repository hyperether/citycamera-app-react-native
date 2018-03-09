import React from 'react';
import { View, Text } from 'react-native';

const Chooser = (props) => {
    
    return(
        <View>
            <Text style={{fontSize: 25}}>Welcome {props.dataUserName}.</Text>
        </View>
    )}

export default Chooser