import 'firebase/auth';
import 'firebase/firestore';
import React, { Component } from 'react';
import {
  Alert,
  FlatList,
  ImageBackground,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MapViewer, NavBar, ProfileHeader } from '../../components';
import firebase from '../../firebase/config';
import s from '../../styles/styles';
import styles from './styles';

class SingleTripScreen extends Component {
  state = {
    trip: {},
    destinations: [],
    currentUserUID: firebase.auth().currentUser.uid,
    loading: true,
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
        this.setState({ trip: doc.data(), loading: false });
      }
    });

    const destinationsRef = db
      .collection('trips')
      .doc(tripUid)
      .collection('destinations');

    destinationsRef.onSnapshot((querySnapshot) => {
      const newDestinations = [];

      querySnapshot.forEach((doc) => {
        const destination = doc.data();
        destination.id = doc.id;
        newDestinations.push(destination);
      });
      this.setState({ destinations: newDestinations, loading: false });
    });
  }

  deleteTrip = () => {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete your trip?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            'cancel';
          },
        },
        {
          text: 'Confirm',
          onPress: () => {
            const { route, navigation } = this.props;
            const { tripUid } = route.params;

            const db = firebase.firestore();
            const tripRef = db.collection('trips').doc(tripUid);
            tripRef.delete().then(() => {
              navigation.navigate('Trips', { page: 'My Trips' });
            });
          },
        },
      ],
      { cancelable: true },
    );
  };

  render() {
    const { navigation, route } = this.props;
    const { tripUid } = route.params;
    const { trip, currentUserUID, loading } = this.state;
    let { destinations } = this.state;
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
          imageStyle={{ opacity: 0.5, borderRadius: 10 }}
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
            <Item title={item.destination.formatted} />
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
    return (
      <View style={{ flex: 1, backgroundColor: '#1E6091' }}>
        <ScrollView>
          {loading ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 20,
              }}
            >
              <ActivityIndicator size="large" color="#52b69a" />
            </View>
          ) : (
            <FlatList
              style={styles.page}
              ListHeaderComponent={(
                <>
                  <View>
                    {trip.user && trip.user !== currentUserUID && (
                      <ProfileHeader userUID={trip.user} />
                    )}
                    <Text style={styles.stats}>{trip.name}</Text>
                    <Text style={styles.summary}>{trip.summary}</Text>

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
                          navigation.navigate('Add Destination', {
                            tripUid,
                          });
                        }}
                      >
                        <TouchableOpacity />
                        <Text style={s.buttonText}> Add Destination</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={s.button}
                        onPress={this.deleteTrip}
                      >
                        <Text style={s.buttonText}> Delete Trip </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              )}
              data={destinations}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          )}
        </ScrollView>
        <View>
          <NavBar />
        </View>
      </View>
    );
  }
}

export default SingleTripScreen;
