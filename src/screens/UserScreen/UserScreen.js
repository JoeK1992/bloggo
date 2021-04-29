import 'firebase/auth';
import 'firebase/firestore';
import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {
  AddAvatar,
  NavBar,
  ProfileHeader,
  ColouredMap,
} from '../../components';
import firebase from '../../firebase/config';
import first from '../../images/1.jpeg';
import second from '../../images/2.jpg';
import third from '../../images/3.jpg';
import fourth from '../../images/4.jpg';
import flagBackground from '../../images/flag.jpg';
import styles from './styles';

class UserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: 0,
      tripUids: [],
      continents: [],
      countries: [],
      flags: [],
      loading: true,
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
      })
      .then(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { route, navigation } = this.props;
    const {
      trips, continents, countries, flags, loading,
    } = this.state;
    const { page } = route.params;

    let currentUserUID;

    if (route.params.page) {
      currentUserUID = firebase.auth().currentUser.uid;
    } else {
      const { userUid } = route.params;
      currentUserUID = userUid;
    }

    const globePercentage = Math.round((countries.length / 195) * 100);

    return (
      <View style={styles.userScreen}>
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
          <ScrollView>
            <ProfileHeader userUID={currentUserUID} />
            {page === 'My Profile' && <AddAvatar />}

            <View style={styles.mapDisplay}>
              <ColouredMap countries={countries} />
            </View>

            {page === 'My Profile' ? (
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Trips', { page: 'My Trips' })}
                  style={styles.btn}
                >
                  <Text style={styles.text}>My Trips</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Trips', { page: 'Explore' })}
                  style={styles.btn}
                >
                  <Text style={styles.text}>Explore trips</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.gamificationContainer}>
              <Text style={styles.gamificationTitle}>My World</Text>

              <View style={styles.statsCardContainer}>
                <ImageBackground
                  imageStyle={{ opacity: 0.8 }}
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
                  imageStyle={{ opacity: 0.8 }}
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
                  imageStyle={{ opacity: 0.8 }}
                  source={first}
                  style={styles.statsCard}
                >
                  <Text style={styles.statsCardText}>
                    {trips === 1 ? '1 Trip' : `${trips} Trips`}
                  </Text>
                </ImageBackground>

                <ImageBackground
                  imageStyle={{ opacity: 0.8 }}
                  source={second}
                  style={styles.statsCard}
                >
                  <Text style={styles.statsCardText}>
                    {`${globePercentage}% of the world`}
                  </Text>
                </ImageBackground>
              </View>
              <ImageBackground
                imageStyle={{ opacity: 0.3 }}
                source={flagBackground}
                style={styles.flagBackground}
              >
                <Text style={styles.flagText}>{flags}</Text>
              </ImageBackground>
            </View>
          </ScrollView>
        )}

        <View>
          <NavBar />
        </View>
      </View>
    );
  }
}

export default UserScreen;
