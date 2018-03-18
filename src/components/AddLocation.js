import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const INITIAL_LONGITUDE_DELTA = 0.0421;
const INITIAL_LATITUDE_DELTA = 0.0922;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

class AddLocation extends Component {

  constructor() {
      super();
      this.state = {
        region: {
          latitude: 45.2640,
          longitude: 19.8309,
          latitudeDelta: INITIAL_LATITUDE_DELTA,
          longitudeDelta: INITIAL_LONGITUDE_DELTA,
        }
      };
    }

    componentDidMount() {
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
  }

render() {
  return (
    <View style={styles.mainContainerStyle}>
      <MapView
        provider={ PROVIDER_GOOGLE }
        style={ styles.mainContainerStyle }
        showsUserLocation
        region={ this.state.region }
        onRegionChangeComplete={ region => this.setState({region}) }
      >
        <MapView.Marker
          coordinate={ this.state.region }
          draggable
          onDragEnd={(e) => this.setState({ region: {
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude}})}
        />
      </MapView>
      <Text>Address</Text>
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
    position: 'absolute',
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
});

export default AddLocation;
