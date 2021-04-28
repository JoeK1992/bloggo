import 'firebase/auth';
import 'firebase/firestore';
import React, { Component } from 'react';
import {
  Alert,
  FlatList,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NavBar from '../../components/NavBar';
import firebase from '../../firebase/config';
import s from '../../styles/styles';

import MapViewer from '../../components/MapViewer';

class SingleTripScreen extends Component {
  state = {
    trip: {},
    destinations: [],
    currentUserUID: firebase.auth().currentUser.uid,
  };

  componentDidMount() {
    const db = firebase.firestore();
    const { route } = this.props;
    const { tripUid } = route.params;

    const tripRef = db.collection('trips').doc(tripUid);
    tripRef.get().then((doc) => {
      if (!doc.exists) {
        console.log('No such document');
      } else {
        this.setState({ trip: doc.data() });
      }
    });

    const destinationsRef = db
      .collection('trips')
      .doc(tripUid)
      .collection('destinations');
    destinationsRef.get().then((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents.');
      } else {
        const newDestinations = [];
        snapshot.forEach((doc) => {
          const destination = doc.data();
          destination.id = doc.id;
          newDestinations.push(destination);
        });
        this.setState({ destinations: newDestinations });
      }
    });
  }

  deleteTrip = () => {
    const { route } = this.props;
    const { trips, tripUid } = route.params;

    const filteredTrips = trips.filter((trip) => {
      return trip.id !== tripUid;
    });
    Alert.alert(
      'Delete',
      'Are you sure you want to delete your trip?',
      [
        {
          text: 'Confirm',
          onPress: () => {
            const { route, navigation } = this.props;
            const { tripUid } = route.params;

            const db = firebase.firestore();
            const tripRef = db.collection('trips').doc(tripUid);
            tripRef.delete().then(() => {
              navigation.replace('My Trips', { trips: filteredTrips });
            });
          },
        },
        {
          text: 'Cancel',
          onPress: () => {
            'cancel';
          },
        },
      ],
      { cancelable: true },
    );
  };

  render() {
    const { navigation, route } = this.props;
    const { tripUid } = route.params;

    const { trip } = this.state;
    let { destinations } = this.state;
    const { currentUserUID } = this.state;
    if (route.params.destinations) {
      destinations = route.params.destinations;
    }

    const Item = ({ title }) => (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );

    const renderItem = ({ item }) => (
      <View style={styles.itemContainer}>
        <ImageBackground
          source={{ uri: item.uploadedUrl }}
          imageStyle={{ opacity: 0.5 }}
          style={styles.image}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Single Destination', {
                destinationUid: item.id,
                tripUid,
                destinations,
                tripName: trip.name,
              });
            }}
          >
            {/* <Image source={image} style={styles.image}></Image>; */}
            <Item title={item.destination.formatted} />
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );

    return (
      <FlatList
        style={styles.page}
        ListHeaderComponent={(
          <>
            <View>
              {destinations
                && destinations[0]
                && destinations[0].destination && (
                <MapViewer destinations={destinations} />
              )}
              <Text style={styles.stats}>
                Places visited:
                {' '}
                {destinations.length}
              </Text>
            </View>

            {currentUserUID === trip.user && (
              <View>
                <TouchableOpacity
                  style={s.button}
                  onPress={() => {
                    navigation.navigate('Add Destination', { tripUid });
                  }}
                >
                  <TouchableOpacity />
                  <Text style={s.buttonText}> Add Destination</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.button} onPress={this.deleteTrip}>
                  <Text style={s.buttonText}> Delete Trip </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
        data={destinations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={<NavBar />}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },

  stats: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Nunito_600SemiBold',
    alignSelf: 'center',
    marginVertical: 10,
  },
  item: {
    borderRadius: 5,
    marginVertical: 10,
  },
  itemContainer: {
    borderRadius: 5,
    width: 300,
    alignSelf: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Nunito_600SemiBold',
    color: 'white',
    alignSelf: 'center',
  },
  mapDisplay: {
    height: 500,
    width: 500,
  },
  image: {
    borderRadius: 5,
    height: 80,
    display: 'flex',
    marginVertical: 10,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  page: {
    backgroundColor: '#1E6091',
  },
});

export default SingleTripScreen;
