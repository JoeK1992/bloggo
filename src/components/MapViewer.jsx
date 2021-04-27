import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import MapPopUp from '../components/MapPopUp';

class MapViewer extends React.Component {
  state = {
    popUpVisible: false,
    modalDestination: {}
  };

  handlePress = (destination) => {
    this.setState({ popUpVisible: true, modalDestination: destination });
  };

  closeModal = () => {
    console.log('closing');
    this.setState({ popUpVisible: false });
  };

  render() {
    const { destinations } = this.props;
    const { popUpVisible, modalDestination } = this.state;

    return (
      <View style={styles.container}>
        {popUpVisible && (
          <MapPopUp
            closeModal={() => {
              this.closeModal();
            }}
            style={{ position: 'absolute', top: 100, left: 50 }}
            modalDestination={modalDestination}
          />
        )}
        <MapView style={styles.map}>
          {destinations.map((destination) => {
            const { geometry } = destination.destination;
            const latitude = geometry.lat;
            const longitude = geometry.lng;

            return (
              <Marker
                coordinate={{ latitude: latitude, longitude: longitude }}
                key={destination.id}
                onPress={() => {
                  this.handlePress(destination);
                }}
              />
            );
          })}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    width: 500,
    height: 500,
    position: 'relative'
  },
  popUp: {
    position: 'absolute',
    width: 500,
    height: 500,
    left: '16vh',
    top: '16vh',
    backgroundColor: 'green'
  }
});

export default MapViewer;
