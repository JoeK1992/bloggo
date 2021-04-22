import React, { Component } from 'react';

import {
  GoogleApiWrapper, Map, Marker, InfoWindow,
} from 'google-maps-react';

import {
  Modal, Text, TouchableOpacity, View, StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  mapContainer: {
    position: 'relative',
    flex: 1,
  },
  popUp: {
    padding: 20,
    position: 'absolute',
    left: '50%',
    top: '50%',

    backgroundColor: 'blue',
    fontSize: 40,
  },
});

class MapDisplay extends Component {
  state = {
    markerClicked: false,
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    destinations: [],
    selecterCenter: null,
    modalDestinationKey: '',
    modalVisible: false,
    modalDestination: {},
    modalPlaceName: '',
  };

  clickMarker = (id, destination) => {
    const { modalVisible } = this.state;
    if (destination) {
      const placeName = destination.formatted;
      const commaIndex = placeName.indexOf(',');
      const formattedPlaceName = placeName.slice(0, commaIndex);

      this.setState({
        modalVisible: !modalVisible,
        modalDestination: destination,
        modalPlaceName: formattedPlaceName,
      });
    } else {
      this.setState({
        modalVisible: !modalVisible,
      });
    }
  };

  displayMarkers = () => {
    return this.props.destinations.map(({ id, destination }) => {
      return (
        <Marker
          position={destination.geometry}
          onClick={() => {
            this.clickMarker(id, destination);
          }}
          key={id}
          initialCenter={{
            lat: -1.2884,
            lng: 36.8233,
          }}
        />
      );
    });
  };

  render() {
    const { modalVisible, modalDestination, modalPlaceName } = this.state;

    let popUp;
    if (modalVisible) {
      popUp = (
        <View style={styles.popUp}>
          <Text>{modalPlaceName}</Text>
          <TouchableOpacity
            onPress={() => {
              this.clickMarker();
            }}
          >
            <Text>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log('navigating to single trip page');
            }}
          >
            <Text>This Trip</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      popUp = <View />;
    }
    return (
      <View>
        <Map
          className="map"
          google={this.props.google}
          zoom={3}
          style={{
            width: '50%',
            height: '50%',
          }}
          initialCenter={this.props.destinations[0]}
        >
          {this.displayMarkers()}
          {popUp}
        </Map>
      </View>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBlzgz8XpUdCQgmvThnz6m5IDNf0ozT8R8',
})(MapDisplay);
