import React, { Component } from "react";

import { GoogleApiWrapper, Map, Marker, InfoWindow } from "google-maps-react";

import { Modal, Text } from "react-native";

class MapViewer extends Component {
  state = {
    markerClicked: false,
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    destinations: [],
    selecterCenter: null,
    modelDestinationKey: "",
    modelVisible: false,
    modelDestination: {},
  };

  // const

  // setSelectedCenter = (destination) => {
  //   destination
  // };

  clickMarker = (id, destination) => {
    this.setState({ modelVisible: true, modelDestination: destination });
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
            lng: 36.8233,
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

  displayModal = (modalVisible) => {
    this.setState({ modalVisible: !modalVisible });
  };
  // };

  render() {
    const { modalVisible } = this.state;
    return (
      <div>
        <Modal
          animationType="slide"
          transparent={true}
          visible={false}
          onRequestClose={() => {
            this.displayModal(modalVisible);
          }}
        >
          <Text>Hello</Text>
        </Modal>
        <Map
          className="map"
          google={this.props.google}
          zoom={3}
          style={{
            width: "50%",
            height: "50%",
          }}
          initialCenter={this.props.destinations[0]}
        >
          {this.displayMarkers()}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBlzgz8XpUdCQgmvThnz6m5IDNf0ozT8R8",
})(MapViewer);
