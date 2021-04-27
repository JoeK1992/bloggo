import 'firebase/auth';
import 'firebase/firestore';
import React, { Component } from 'react';

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground
} from 'react-native';
import ColouredMap from '../../components/ColouredMap';

import NavBar from '../../components/NavBar';
import ProfileHeader from '../../components/ProfileHeader';
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
                  console.log(destination, 'COMPONENTS');
                  continents.push(components.continents);
                  countries.push(components.country);
                  flags.push(annotations.flag);
                });
                this.setState({
                  countries,
                  flags,
                  continents
                });
              }
            });
          });
        }
      });
  }

  render() {
    // console.log(this.state.countries.length);
    let currentUserUID;
    const { route } = this.props;
    if (route.params) {
      const { userUid } = route.params;
      currentUserUID = userUid;
    } else {
      currentUserUID = firebase.auth().currentUser.uid;
    }
    const { trips, continents, countries, flags } = this.state;

    const globePercentage = Math.round((countries.length / 195) * 100);

    const { navigation } = this.props;
    return (
      <ScrollView style={styles.userScreen}>
        <ProfileHeader userUID={currentUserUID} />
        <View style={styles.mapContainer} />
        <View style={styles.mapDisplay}>
          <ColouredMap countries={countries} />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('My Trips')}
            style={styles.btn}
          >
            <Text style={styles.text}>My Trips</Text>
          </TouchableOpacity>
        </View>
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
        <NavBar style={styles.navBar} />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  userScreen: {
    backgroundColor: '#113755',
    flex: 1
  },
  gamificationTitle: {
    fontSize: 20,
    textAlign: 'center',
    color: '#113755',
    paddingBottom: 5,
    fontWeight: 'bold',
    fontFamily: 'Nunito_600SemiBold'
  },
  gamificationStat: {
    fontSize: 15,
    textAlign: 'center',
    color: '#113755',
    padding: 2,
    marginBottom: 5,
    fontFamily: 'Lato_400Regular'
  },
  gamificationFlags: {
    fontSize: 15,
    textAlign: 'center',
    marginHorizontal: 40,
    letterSpacing: 8
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

  flagBackground: {
    width: 370,
    height: 150,
    margin: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  flagText: {
    fontSize: 35,
    textAlign: 'center'
  },
  statsCardContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  statsCard: {
    width: 88,
    height: 150,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    margin: 2
  },
  statsCardText: {
    color: '#E8F3B9',
    fontSize: 18,

    mapDisplay: {
      height: 500,
      width: 500
    },

    textAlign: 'center'
  },
  // mapDisplay: {
  //   height: 500,
  //   width: 500,
  // },

  // map: {
  //   width: "100%",
  //   height: undefined,
  //   aspectRatio: 1.5,
  // },
  btn: {
    color: '#E8F3B9',
    borderRadius: 3,
    backgroundColor: '#34A0A4',
    textAlign: 'center',
    width: 120,
    padding: 10,
    fontFamily: 'Nunito_600SemiBold'
  },
  btnContainer: {
    alignItems: 'center',
    margin: 10
  },
  text: {
    fontSize: 20,
    color: '#113755',
    borderRadius: 3,
    textAlign: 'center',
    paddingVertical: 2
  },
  gamificationContainer: {
    borderRadius: 10,
    backgroundColor: '#D4EDE2',
    textAlign: 'center',
    paddingVertical: 2
  }
});

export default UserScreen;
