import 'firebase/auth';
import 'firebase/firestore';
import React, { Component } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import s from '../../styles/styles';

import NavBar from '../../components/NavBar';
import ProfileHeader from '../../components/ProfileHeader';
import firebase from '../../firebase/config';

// import MapDisplay from '../../components/MapDisplay';

class SingleTripScreen extends Component {
  state = {
    trip: {},
    destinations: []
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
              navigation.navigate('My Trips');
            });
          }
        },
        {
          text: 'Cancel',
          onPress: () => {
            'cancel';
          }
        }
      ],
      { cancelable: true }
    );
  };

  render() {
    const { navigation, route } = this.props;
    const { tripUid } = route.params;

    const { trip, destinations } = this.state;

    const Item = ({ title }) => (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );

    const renderItem = ({ item }) => (
      <>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Single Destination', {
              destinationUid: item.id,
              tripUid,
              destinations,
              tripName: trip.name
            });
          }}
        >
          <Item title={item.destination.formatted} />
        </TouchableOpacity>
      </>
    );

    return (
      <View>
        <ProfileHeader />
        {/* <View style={styles.mapDisplay}>
          <MapDisplay destinations={destinations} />
        </View> */}
        <View>
          <Text>Map Goes Here</Text>
          <Text>Trip Stats go Here</Text>
        </View>
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
        <View>
          <FlatList
            data={destinations}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>

        <NavBar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  },
  mapDisplay: {
    height: 1000,
    width: 1000
  }
});

export default SingleTripScreen;
