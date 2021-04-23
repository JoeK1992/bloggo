import 'firebase/auth';
import 'firebase/firestore';
import React, { Component } from 'react';
import {
  FlatList, StatusBar, StyleSheet, Text, View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
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

    const Item = ({ title }) => (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );

    const renderItem = ({ item }) => (
      <>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Single Trip', { tripUid: item.id, trips });
          }}
        >
          <Item title={item.name} />
        </TouchableOpacity>
      </>
    );

    return (
      <View style={styles.page}>
        <View style={styles.head}>
          <Text style={styles.headTitle}> Choose One of Your Trips! </Text>
        </View>

        <View style={styles.sortBtn}>
          <Text style={styles.sortBy}> Sort your Trips by:</Text>
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
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#52B69A',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 15,
    borderColor: '#F9FCED',
    borderWidth: 2,
  },
  title: {
    fontSize: 32,
    color: '#F9FCED',
    textAlign: 'center',
  },
  page: {
    backgroundColor: '#1E6091',
  },
  sortBtn: {
    flexDirection: 'row',
    left: 90,
  },
  sortText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#F9FCED',
    borderColor: '#52B69A',
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: '#113755',
    left: 10,
    marginLeft: 2,
    width: 90,
    height: 20,
  },
  headTitle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#F9FCED',
  },
  sortBy: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#F9FCED',
  },
});
export default TripsScreen;
