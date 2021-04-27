import 'firebase/auth';
import 'firebase/firestore';
import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import NavBar from '../../components/NavBar';
import ProfileHeader from '../../components/ProfileHeader';
import firebase from '../../firebase/config';
// import TripsScreen from '../TripsScreen/TripsScreen';
// import AddAvatar from '../../components/AddAvatar';
import map from '../../images/map.jpg';

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
    let currentUserUID;
    const { route } = this.props;
    if (route.params) {
      const { userUid } = route.params;
      currentUserUID = userUid;
    } else {
      currentUserUID = firebase.auth().currentUser.uid;
    }
    const { trips, continents, countries, flags } = this.state;
    const { navigation } = this.props;
    return (
      <ScrollView style={styles.userScreen}>
        <ProfileHeader userUID={currentUserUID} />
        <View style={styles.mapContainer} />
        <Image style={styles.map} source={map} />
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
          <Text style={styles.gamificationStat}>
            {continents.length === 1
              ? '1 Continent'
              : `${continents.length} Continents`}
            |
            {countries.length === 1
              ? '1 Country'
              : `${countries.length} Countries`}
            | {trips === 1 ? '1 Trip' : `${trips} Trips`}
          </Text>
          <Text style={styles.gamificationFlags}>{flags}</Text>
        </View>
        <NavBar style={styles.navBar} />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  userScreen: {
    backgroundColor: '#E7F5E8',
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

  map: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.5
  },
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
