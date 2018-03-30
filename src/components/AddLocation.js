import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { addLocation } from '../actions';
import {
  LOCATION_DISABLED_ALERT_TITLE,
  LOCATION_DISABLED_MSG
} from './StringConstants';

const INITIAL_LONGITUDE_DELTA = 80;
const INITIAL_LATITUDE_DELTA = 80;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

class AddLocation extends Component {

  constructor() {
      super();
      this.state = {
        isMounted: false,
        markers: [],
        isDeviceLocationOn: false,
        askedForLocation: false,
        region: {
          latitude: 34.553127,
          longitude: 18.048012,
          latitudeDelta: INITIAL_LATITUDE_DELTA,
          longitudeDelta: INITIAL_LONGITUDE_DELTA,
        }
      };
    }

    onLocationOff = (error) => {
      console.log(error);
      if (!this.state.askedForLocation && error.code === 2) {
        this.state.askedForLocation = true;
        Alert.alert(
          LOCATION_DISABLED_ALERT_TITLE,
          LOCATION_DISABLED_MSG
        )};
      setTimeout( () => this.checkCurrentPosition(), 1000);
    }

    checkCurrentPosition() {
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log(position);
          isDeviceLocationOn = true;
          this.setState({
            region: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }
          });
        },
        (error) => {this.onLocationOff(error)},
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
      );
    }

    componentDidMount() {
      this.setState({ isMounted: true });
      this.checkCurrentPosition();
      this.watchID = navigator.geolocation.watchPosition(
        position => {
          console.log(position);
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

  onLongPress(e) {
    const latlng = {
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude
    };
    if(this.state.isMounted) {
      this.setState({
        region: {
          latitude: latlng.latitude,
          longitude: latlng.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        },
        markers: [{coordinates: {
          longitude: latlng.longitude,
          latitude: latlng.latitude
          }
        }]
      });
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
        showsUserLocation={true}
        showsMyLocationButton
        onLongPress={(newPosition) => this.onLongPress(newPosition)}
        region={ this.state.region }
        onRegionChangeComplete={ region => this.setState({region}) }
      >
      {this.state.markers.map((mark, i) =>
      (
              <MapView.Marker
                key={i}
                ref={this.setMarkerRef}
                draggable
                coordinate={mark.coordinates}

              >

            </MapView.Marker>
            ))}
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
