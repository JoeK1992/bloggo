import React, { Component } from 'react';

import { GoogleApiWrapper, Map, Marker, InfoWindow } from 'google-maps-react';

import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mapContainer: {
    postition: 'relative',
    flex: 1
  },
  popUp: {
    padding: 20,
    position: 'absolute',
    left: '50%',
    top: '50%',
    // bottom: '20vh',
    // right: '20vh',
    backgroundColor: 'blue',
    fontSize: 40
  }
});

class MapViewer extends Component {
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
    modalPlaceName: ''
  };

  // const

  // setSelectedCenter = (destination) => {
  //   destination
  // };

  clickMarker = (id, destination) => {
    const { modalVisible } = this.state;
    if (destination) {
      const placeName = destination.formatted;
      const commaIndex = placeName.indexOf(',');
      const formattedPlaceName = placeName.slice(0, commaIndex);
      //This function gets the first line of the address of each destination when a marker is clicked
      this.setState({
        modalVisible: !modalVisible,
        modalDestination: destination,
        modalPlaceName: formattedPlaceName
      });
    } else {
      this.setState({
        modalVisible: !modalVisible
      });
    }
  };

  displayMarkers = () => {
    return this.props.destinations.map(({ id, destination }) => {
      return (
        <Marker
          // className="pic"
          position={destination.geometry}
          onClick={() => {
            this.clickMarker(id, destination);
          }}
          key={id}
          initialCenter={{
            lat: -1.2884,
            lng: 36.8233
          }}
          // icon={{
          //   url:
          //     "https://pbs.twimg.com/profile_images/1333392601450426370/x_DT51WI_400x400.jpg",
          //   scaledSize: new this.props.google.maps.Size(60, 60),
          // }}
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
      <div>
        <Map
          // style={styles.mapContainer}
          className="map"
          google={this.props.google}
          zoom={3}
          style={{
            width: '50%',
            height: '50%'
          }}
          initialCenter={this.props.destinations[0]}
        >
          {this.displayMarkers()}
          {popUp}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBlzgz8XpUdCQgmvThnz6m5IDNf0ozT8R8'
})(MapViewer);
