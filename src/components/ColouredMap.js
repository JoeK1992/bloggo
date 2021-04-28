import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Polygon } from 'react-native-maps';
import { fetchPolygonCoordinates } from './utils/GeoJsonUtils';

// const mapstyle = [
//   {
//     elementType: 'labels',
//     stylers: [
//       {
//         visibility: 'off'
//       }
//     ]
//   },
//   {
//     featureType: 'administrative',
//     elementType: 'geometry',
//     stylers: [
//       {
//         visibility: 'off'
//       }
//     ]
//   },
//   {
//     featureType: 'administrative.neighborhood',
//     stylers: [
//       {
//         visibility: 'off'
//       }
//     ]
//   },
//   {
//     featureType: 'landscape.man_made',
//     elementType: 'geometry.fill',
//     stylers: [
//       {
//         color: '#ffea05'
//       }
//     ]
//   },
//   {
//     featureType: 'poi',
//     stylers: [
//       {
//         visibility: 'off'
//       }
//     ]
//   },
//   {
//     featureType: 'road',
//     stylers: [
//       {
//         visibility: 'off'
//       }
//     ]
//   },
//   {
//     featureType: 'road',
//     elementType: 'labels.icon',
//     stylers: [
//       {
//         visibility: 'off'
//       }
//     ]
//   },
//   {
//     featureType: 'transit',
//     stylers: [
//       {
//         visibility: 'off'
//       }
//     ]
//   }
// ];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#52b69a',
    borderWidth: 7,
    // alignSelf: 'center'
  },
  map: {
    flex: 1,
    width: 300,
    height: 250,
    position: 'relative',
  },
});

class ColouredMap extends Component {
  render() {
    const { countries } = this.props;

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 15.1201,
            longitude: -23.6052,
            latitudeDelta: 180,
            longitudeDelta: 250,
          }}
          mapType="standard"
          liteMode
          // customMapStyle={mapstyle}
        >
          {countries.map((country) => {
            return fetchPolygonCoordinates(country).map((polygon, index) => {
              return (
                <Polygon
                  coordinates={polygon}
                  fillColor="rgba(255, 0, 0, 0.5)"
                  strokeColor="rgba(46, 49, 49, 0.05)"
                  key={index}
                />
              );
            });
          })}
        </MapView>
      </View>
    );
  }
}

export default ColouredMap;
