import 'firebase/auth';
import 'firebase/firestore';
import React, { Component } from 'react';
import {
  FlatList, StyleSheet, Text, View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import NavBar from '../../components/NavBar';
// import ProfileHeader from '../../components/ProfileHeader';
import firebase from '../../firebase/config';

class TripsScreen extends Component {
  state = {
    trips: [],
    order: 'desc',
  };

  componentDidMount() {
    const db = firebase.firestore();
    const currentUserUID = firebase.auth().currentUser.uid;
    const tripsRef = db.collection('trips');
    tripsRef
      .where('user', '==', currentUserUID)
      .where('summary', '!=', false)
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
          this.setState({ trips: newTrips });
        }
      });
  }

  reverseOrder = () => {
    const db = firebase.firestore();
    const currentUserUID = firebase.auth().currentUser.uid;
    const { order } = this.state;

    if (order === 'desc') {
      this.setState({ order: 'asc' });
    } else {
      this.setState({ order: 'desc' });
    }

    const tripsRef = db.collection('trips');

    tripsRef
      .where('user', '==', currentUserUID)
      .where('summary', '!=', false)
      .orderBy('summary')
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
          this.setState({ trips: newTrips });
        }
      });
  };

  render() {
    let { trips } = this.state;
    const { order } = this.state;
    const { route } = this.props;
    if (route.params) {
      trips = route.params.trips;
    }
    const { navigation } = this.props;

    const Item = ({ title, startDate, endDate }) => (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.dates}>
          {moment(startDate).format('MMM Do YYYY')}
          {' '}
          -
          {moment(endDate).format('MMM Do YYYY')}
        </Text>
      </View>
    );

    const renderItem = ({ item }) => (
      <>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Single Trip', { tripUid: item.id, trips });
          }}
        >
          <Item
            title={item.name}
            startDate={item.startDate}
            endDate={item.endDate}
          />
        </TouchableOpacity>
      </>
    );

    return (
      <View style={styles.container}>
        <Text style={styles.headTitle}> Explore your trips </Text>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#113755',
  },
  item: {
    backgroundColor: '#1a759f',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    color: '#F9FCED',
    textAlign: 'center',
    fontFamily: 'Nunito_600SemiBold',
  },
  dates: {
    fontSize: 15,
    color: '#F9FCED',
    textAlign: 'center',
    fontFamily: 'Nunito_400Regular',
  },

  sortBtn: {
    flexDirection: 'row',
    left: 90,
  },
  sortText: {
    fontSize: 15,
    color: '#F9FCED',
    borderColor: '#52B69A',
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: '#113755',
    left: 10,
    marginLeft: 2,
    width: 90,
    height: 20,
    fontFamily: 'Nunito_600SemiBold',
  },
  headTitle: {
    padding: 10,
    fontSize: 15,
    textAlign: 'center',
    color: '#F9FCED',
    fontFamily: 'Nunito_600SemiBold',
  },
  sortBy: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#F9FCED',
  },
});
export default TripsScreen;
