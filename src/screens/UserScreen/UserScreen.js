import 'firebase/auth';
import 'firebase/firestore';
import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ImageBackground
} from 'react-native';
import {
  AddAvatar,
  NavBar,
  ProfileHeader,
  ColouredMap
} from '../../components';
// ActivityIndicator,
import firebase from '../../firebase/config';
// import TripsScreen from '../TripsScreen/TripsScreen';
// import AddAvatar from '../../components/AddAvatar';
// import globe from '../../images/globe.png';
// import trip from '../../images/trip.png';
// import country from '../../images/country.jpeg';
// import continent from '../../images/continents.jpg';
import first from '../../images/1.jpeg';
import second from '../../images/2.jpg';
import third from '../../images/3.jpg';
import fourth from '../../images/4.jpg';
import flagBackground from '../../images/flag.jpg';
import styles from './styles';

// const { height, width } = Dimensions.get('window');
class UserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: 0,
      tripUids: [],
      continents: [],
      countries: [],
      flags: []
      // loading: true
      // user: null,
      // userUID: '',
    };
  }

  componentDidMount() {
    const _this = this;
    let currentUserUID;
    if (_this.props.route.params) {
      const { userUid } = _this.props.route.params;
      currentUserUID = userUid;
    } else {
      currentUserUID = firebase.auth().currentUser.uid;
    }

    const db = firebase.firestore();
    const tripsRef = db.collection('trips');
    tripsRef
      .where('user', '==', currentUserUID)
      .where('summary', '!=', false)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log('No matching documents.');
        } else {
          const tripUidsArr = [];
          let trips = 0;
          snapshot.forEach((doc) => {
            const trip = doc.data();
            trip.id = doc.id;
            tripUidsArr.push(trip.id);
            trips += 1;
          });
          this.setState({ trips, tripUids: tripUidsArr });
          const { tripUids } = this.state;
          tripUids.forEach((tripUid) => {
            const destinationsRef = db
              .collection('trips')
              .doc(tripUid)
              .collection('destinations');
            destinationsRef.get().then((snapshot) => {
              if (snapshot.empty) {
                console.log('No matching documents.');
              } else {
                const continents = [];
                const countries = [];
                const flags = [];
                snapshot.forEach((doc) => {
                  const destination = doc.data();
                  const { components, annotations } = destination.destination;
                  if (!continents.includes(components.continents)) {
                    continents.push(components.continents);
                  }
                  if (!countries.includes(components.country)) {
                    countries.push(components.country);
                  }
                  if (!flags.includes(annotations.flag)) {
                    flags.push(annotations.flag);
                  }
                });
                this.setState((currState) => {
                  return {
                    countries: [...currState.countries, ...countries],
                    continents: [...currState.continents, ...continents],
                    flags: [...currState.flags, ...flags],
                  };
                });
              }
            });
          });
        }
      });
  }

  render() {
    const { route, navigation } = this.props;
    const { trips, continents, countries, flags } = this.state;

    let currentUserUID;
    let page;
    let usersOwnProfile;

    if (route.params) {
      usersOwnProfile = true;
      const { userUid } = route.params;
      currentUserUID = userUid;
    } else {
      usersOwnProfile = false;
      currentUserUID = firebase.auth().currentUser.uid;
      page = 'My Profile';
    }

    const globePercentage = Math.round((countries.length / 195) * 100);

    return (
    // <View>

    /* {loading ?  <ActivityIndicator /> :  */

      <View style={{ flex: 1, backgroundColor: '#1E6091' }}>
        <ScrollView style={styles.userScreen}>
          <ProfileHeader userUID={currentUserUID} />
          {/* <View style={styles.mapContainer} /> */}
          {usersOwnProfile && <AddAvatar />}

          <View style={styles.mapDisplay}>
            <ColouredMap countries={countries} />
          </View>

          {page === 'My Profile' && (
            <View style={styles.btnContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Trips', { page: '' })}
                style={styles.btn}
              >
                <Text style={styles.text}>My Trips</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.gamificationContainer}>
            <Text style={styles.gamificationTitle}>My World</Text>

            <View style={styles.statsCardContainer}>
              <ImageBackground
                imageStyle={{ borderRadius: 20, opacity: 0.8 }}
                source={third}
                style={styles.statsCard}
              >
                <Text style={styles.statsCardText}>
                  {continents.length === 1
                    ? '1 Continent'
                    : `${continents.length} Continents`}
                </Text>
              </ImageBackground>

              <ImageBackground
                imageStyle={{ borderRadius: 20, opacity: 0.8 }}
                source={fourth}
                style={styles.statsCard}
              >
                <Text style={styles.statsCardText}>
                  {countries.length === 1
                    ? '1 Country'
                    : `${countries.length} Countries`}
                </Text>
              </ImageBackground>

              <ImageBackground
                imageStyle={{ borderRadius: 20, opacity: 0.8 }}
                source={first}
                style={styles.statsCard}
              >
                <Text style={styles.statsCardText}>
                  {trips === 1 ? '1 Trip' : `${trips} Trips`}
                </Text>
              </ImageBackground>

              <ImageBackground
                imageStyle={{ borderRadius: 20, opacity: 0.8 }}
                source={second}
                style={styles.statsCard}
              >
                <Text style={styles.statsCardText}>
                  {`${globePercentage}% of the world`}
                </Text>
              </ImageBackground>
            </View>
            <ImageBackground
              imageStyle={{ borderRadius: 20, opacity: 0.3 }}
              source={flagBackground}
              style={styles.flagBackground}
            >
              <Text style={styles.flagText}>{flags}</Text>
            </ImageBackground>
          </View>
        </ScrollView>

        <View>
          <NavBar />
        </View>
      </View>
    );
  }
}

export default UserScreen;
