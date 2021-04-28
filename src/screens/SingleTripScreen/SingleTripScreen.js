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
import MapViewer from '../../components/MapViewer';
import NavBar from '../../components/NavBar';
import firebase from '../../firebase/config';
import s from '../../styles/styles';
import styles from './styles';
import ProfileHeader from '../../components/ProfileHeader';

class SingleTripScreen extends Component {
  state = {
    trip: {},
    destinations: [],
    currentUserUID: firebase.auth().currentUser.uid,
    loading: false,
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
              navigation.navigate('Trips', { trips: filteredTrips });
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
    const { tripUid, trips } = route.params;

    const { trip } = this.state;
    let { destinations } = this.state;
    const { currentUserUID, loading } = this.state;
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
                            trips,
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
