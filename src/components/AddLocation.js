import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { addLocation } from '../actions';

const INITIAL_LONGITUDE_DELTA = 0.0421;
const INITIAL_LATITUDE_DELTA = 0.0922;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

class AddLocation extends Component {

  constructor() {
      super();
      this.state = {
        isMounted: false,
        region: {
          latitude: 45.2640,
          longitude: 19.8309,
          latitudeDelta: INITIAL_LATITUDE_DELTA,
          longitudeDelta: INITIAL_LONGITUDE_DELTA,
        }
      };
    }

    componentDidMount() {
      this.setState({ isMounted: true });
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      },
    (error) => console.log(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
    this.setState({ isMounted: false });
  }

  saveLocation() {
    const { latitude, longitude } = this.state.region;
    const position = { latitude, longitude };
    this.props.addLocation(position);
    Actions.pop();
  }

  onLongPress(newPosition) {
    if(this.state.isMounted) {
      this.setState({ region: {
        latitude: newPosition.nativeEvent.coordinate.latitude,
        longitude: newPosition.nativeEvent.coordinate.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }});
    }
  }

render() {
  const {
    mainContainerStyle,
    mapContainerStyle,
    mapStyle,
    confirmContainerStyle,
    confirmationTextStyle,
    buttonsContainer,
    touchableStyle,
    smallImageStyle
  } = styles;
  return (
    <View style={mainContainerStyle}>
      <View
        style={mapContainerStyle}
      >
      <MapView
        provider={ PROVIDER_GOOGLE }
        style={mapStyle}
        showsUserLocation
        onLongPress={(newPosition) => this.onLongPress(newPosition)}
        region={ this.state.region }
        onRegionChangeComplete={ region => this.setState({region}) }
      >
        <MapView.Marker
          coordinate={ this.state.region }
          pinColor='#e23d14'
        />
      </MapView>
      </View>
      <View
      style={confirmContainerStyle}
      >
        <Text style={confirmationTextStyle}>Confirm selected location?</Text>
        <View style={buttonsContainer}>
          <TouchableOpacity
            style={touchableStyle}
            onPress={this.saveLocation.bind(this)}
            >
            <Image
              source={require('../assets/images/yes1.png')}
              style={smallImageStyle}
              resizeMode='contain'
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={touchableStyle}
            onPress={() => Actions.pop()}
            >
            <Image
              source={require('../assets/images/no1.png')}
              style={smallImageStyle}
              resizeMode='contain'
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>


  );
}
}

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    padding: 5
  },
  mapContainerStyle: {
    flex: 6,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
},
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonsContainer: {
    flex:1,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'flex-start'
  },
  touchableStyle:{
    paddingHorizontal: 20
  },
  smallImageStyle: {
    height: 30,
    width: 70,
    alignSelf: 'center'
  },
  confirmContainerStyle: {
    flex: 1
  },
  confirmationTextStyle: {
    fontSize: 18,
    color: 'black',
    paddingStart: 15
  }
});

export default connect(null, {addLocation})(AddLocation);
