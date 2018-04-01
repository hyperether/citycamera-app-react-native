import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Button,
  Keyboard
 } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Geocoder from 'react-native-geocoder';
import { addLocation } from '../actions';
import {
  LOCATION_DISABLED_ALERT_TITLE,
  LOCATION_DISABLED_MSG,
  NO_LOCATION_SELECTED_ALERT_TITLE,
  NO_LOCATION_SELECTED_MSG,
  GEOCODER_NO_POSITION_TITLE,
  GEOCODER_NO_POSITION_MSG,
  ADDRESS_DECODING_FAILED_TITLE,
  ADDRESS_DECODING_FAILED_MSG,
  NO_ADDRESS_TO_SEARCH_TITLE,
  NO_ADDRESS_TO_SEARCH_MSG
} from './StringConstants';

const INITIAL_LONGITUDE_DELTA = 80;
const INITIAL_LATITUDE_DELTA = 80;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;
// Google geocoding API key for development purposes only.
const GEOCODING_API_KEY = "AIzaSyB-LBlbUjMzYNvC_itfyJXtHaxwIwwBHcI";

class AddLocation extends Component {

  constructor() {
      super();
      this.state = {
        isMounted: false,
        markers: [],
        isDeviceLocationOn: false,
        askedForLocation: false,
        keepCheckingForLocation: false,
        address: '',
        region: {
          latitude: 34.553127,
          longitude: 18.048012,
          latitudeDelta: INITIAL_LATITUDE_DELTA,
          longitudeDelta: INITIAL_LONGITUDE_DELTA,
        }
      };
    }

    // if the device location is off, ask the user to turn it on
    onLocationOff = (error) => {
      console.log(error);
      if (!this.state.askedForLocation && error.code === 2) {
        // flag to make sure that the user is asked only once to turn their location on
        this.setState({ askedForLocation: true, keepCheckingForLocation: true });
        Alert.alert(
          LOCATION_DISABLED_ALERT_TITLE,
          LOCATION_DISABLED_MSG
        )};
      // check every second and a half if the user turned their location on in the meantime
      if (this.state.keepCheckingForLocation) {
        setTimeout( () => this.checkCurrentPosition(), 1500);
      }
    }

    // obtain the user's location using the geocoder object and zoom the map on it
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
      // fallback to Google geocoding API if React Native Geocoder is not available.
      Geocoder.fallbackToGoogle(GEOCODING_API_KEY);
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
    // if there is no marker on the map, no location is selected, show error message
    if (this.state.markers.length < 1) {
      Alert.alert(
        NO_LOCATION_SELECTED_ALERT_TITLE,
        NO_LOCATION_SELECTED_MSG
      )
    } else {
      // the component is about to unmount, stop checking if the location is on
      this.setState({ keepCheckingForLocation: false });

      const { latitude, longitude } = this.state.region;
      const position = { latitude, longitude };
      this.props.addLocation(position);
      Actions.pop();
    }

  }

  // long pressing a part of the map creates a marker and selects that location
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

// takes the user entered address and attempts to retrieve the coordinates for it
decodeAddress(res) {
  console.log(res);
  if (res.length > 0) {
    var position = res[0].position;
      this.setState({
        region: {
          latitude: position.lat,
          longitude: position.lng,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        },
        markers: [{coordinates: {
          longitude: position.lng,
          latitude: position.lat
          }
        }]
      });
  } else {
    // the address is incorrect, inform the user
    Alert.alert(
      GEOCODER_NO_POSITION_TITLE,
      GEOCODER_NO_POSITION_MSG
    )
  }
}

// collects the user input for address and attempts the decoding to obtain coordinates
onSearchPress() {
  Keyboard.dismiss();
  // if no address was entered, don't even try decoding
  if (this.state.address.length === 0) {
    Alert.alert(
      NO_ADDRESS_TO_SEARCH_TITLE,
      NO_ADDRESS_TO_SEARCH_MSG
    )
  } else {
    Geocoder.geocodeAddress(this.state.address).then(res => {
      this.decodeAddress(res);
    })
    .catch(err => {
      console.log(err);
      Alert.alert(
        ADDRESS_DECODING_FAILED_TITLE,
        ADDRESS_DECODING_FAILED_MSG
      )
    });
  }
}

render() {
  const {
    mainContainerStyle,
    mapContainerStyle,
    mapStyle,
    searchAddressContainerStyle,
    searchAddressInputStyle,
    buttonsContainer,
    touchableStyle,
    smallImageStyle,
    searchButtonStyle,
    searchAndConfirmationViewStyle,
    searchButtonImageStyle
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
                    pinColor='#E64A19'
                  >

                </MapView.Marker>
                ))}
        </MapView>
      </View>
      <View style={searchAndConfirmationViewStyle}>
        <View
          style={searchAddressContainerStyle}
        >
          <TextInput
            style={searchAddressInputStyle}
            placeholder="Search for an address"
            onChangeText={(address) => this.setState({address})}
            value={this.state.address}
          />
          <TouchableOpacity
            style={searchButtonStyle}
            onPress={this.onSearchPress.bind(this)}
          >
            <Image
              source={require('../assets/images/search.png')}
              style={searchButtonImageStyle}
              resizeMode='contain'
            />
          </TouchableOpacity>
          </View>
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
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
},
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  searchAndConfirmationViewStyle: {
    position: 'relative'
  },
  buttonsContainer: {
    paddingTop: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch'
  },
  touchableStyle:{
    alignContent: 'center'
  },
  smallImageStyle: {
    height: 30,
    width: 70,
  },
  searchButtonImageStyle: {
    height: 35,
    width: 35,
    alignSelf: 'center',
    marginLeft: 5,
  },
  searchAddressContainerStyle: {
    flexDirection: 'row',
    paddingHorizontal: 5
  },
  searchAddressInputStyle: {
    fontSize: 16,
    color: 'black',
    flex: 1
  },
  searchButtonStyle: {
    alignSelf: 'flex-end'
  }
});

export default connect(null, {addLocation})(AddLocation);
