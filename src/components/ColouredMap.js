import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Polygon } from 'react-native-maps';
import { fetchCoordinates } from './utils/GeoJsonUtils';

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
  }
});

class ColouredMap extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map}>
          {fetchCoordinates('Indonesia').map((polygon) => {
            return <Polygon coordinates={polygon} fillColor="#0000ff" />;
          })}
        </MapView>
      </View>
    );
  }
}

export default ColouredMap;
