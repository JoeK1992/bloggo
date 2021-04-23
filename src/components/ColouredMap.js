import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

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
          <Marker
            coordinate={{ latitude: 0, longitude: 0 }}
            key="unique"
            onPress={() => {
              console.log('click marker');
            }}
          />
        </MapView>
      </View>
    );
  }
}

export default ColouredMap;
