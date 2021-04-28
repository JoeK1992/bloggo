import 'firebase/auth';
import 'firebase/firestore';
import moment from 'moment';
import React, { Component } from 'react';
import { FlatList, Text, View, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavBar, ProfileHeader } from '../../components';
import firebase from '../../firebase/config';
import s from '../../styles/styles';
import styles from './styles';

class TripsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      order: 'desc',
      currentUserUID: firebase.auth().currentUser.uid
    };
  }

  componentDidMount() {
    const _this = this;
    const { currentUserUID } = this.state;
    const { page } = _this.props.route.params;
    const db = firebase.firestore();

    let equalSign;
    if (page === 'Explore') {
      equalSign = '!=';
    } else {
      equalSign = '==';
    }
    const tripsRef = db.collection('trips');
    tripsRef.where('user', equalSign, currentUserUID).onSnapshot((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents.');
      } else {
        const newTrips = [];

        snapshot.forEach((doc) => {
          const trip = doc.data();
          trip.id = doc.id;
          newTrips.push(trip);
        });
        this.setState({ trips: newTrips });
      }
    });
  }

  reverseOrder = () => {
    const db = firebase.firestore();

    const _this = this;
    const { currentUserUID, order } = this.state;
    const { page } = _this.props.route.params;

    if (order === 'desc') {
      this.setState({ order: 'asc' });
    } else {
      this.setState({ order: 'desc' });
    }

    const tripsRef = db.collection('trips');
    tripsRef

      .orderBy('startDate', order)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log('No matching documents.');
        } else {
          const newTrips = [];
          snapshot.forEach((doc) => {
            const trip = doc.data();
            trip.id = doc.id;
            newTrips.push(trip);
          });
          const filtered = newTrips.filter((trip) => {
            return trip.user !== currentUserUID;
          });
          const myTrips = newTrips.filter((trip) => {
            return trip.user === currentUserUID;
          });
          const selectedTrips = page === 'Explore' ? filtered : myTrips;
          this.setState({ trips: selectedTrips });
        }
      });
  };

  render() {
    let { trips } = this.state;
    const { order, currentUserUID } = this.state;
    const { route, navigation } = this.props;
    const { page } = route.params;
    if (route.params.trips) {
      trips = route.params.trips;
    }
    const Item = ({
      title,
      startDate,
      endDate,
      userName,
      userUid,
      tripUid
    }) => (
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Single Trip', { tripUid, trips });
          }}
        >
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.dates}>
            {moment(startDate).format('MMM Do YYYY')} -
            {moment(endDate).format('MMM Do YYYY')}
          </Text>
        </TouchableOpacity>

        {page === 'Explore' && (
          <TouchableOpacity
            style={s.button}
            onPress={() => {
              navigation.replace('Profile Page', { userUid });
            }}
          >
            <Text style={styles.userName}>{userName}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
    const renderItem = ({ item }) => (
      <>
        <Item
          userUid={item.user}
          title={item.name}
          startDate={item.startDate}
          endDate={item.endDate}
          userName={item.userName}
          tripUid={item.id}
        />
      </>
    );

    return (
      <View style={styles.container}>
        {page === 'My Trips' && <ProfileHeader userUID={currentUserUID} />}
        <ActivityIndicator />
        <Text style={styles.headTitle}>
          {' '}
          Explore your {page === 'Explore' && <Text>friends'</Text>} trips{' '}
        </Text>

        <View style={styles.sortBtn}>
          <Text style={styles.sortBy}> Sort by:</Text>
          {order === 'desc' ? (
            <TouchableOpacity onPress={this.reverseOrder}>
              <Text style={styles.sortText}>Oldest trips</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={this.reverseOrder}>
              <Text style={styles.sortText}>Most recent trips</Text>
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          style={styles.text}
          data={trips}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <NavBar />
      </View>
    );
  }
}

export default TripsScreen;
