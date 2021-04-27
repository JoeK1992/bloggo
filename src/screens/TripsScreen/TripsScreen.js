import 'firebase/auth';
import 'firebase/firestore';
import moment from 'moment';
import React, { Component } from 'react';
import {
  FlatList, StyleSheet, Text, View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NavBar from '../../components/NavBar';
import ProfileHeader from '../../components/ProfileHeader';
import firebase from '../../firebase/config';
import s from '../../styles/styles';

class TripsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      order: 'desc',
      currentUserUID: firebase.auth().currentUser.uid,
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
    tripsRef
      .where('user', equalSign, currentUserUID)
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

    const _this = this;
    const { currentUserUID } = this.state;
    const { page } = _this.props.route.params;

    const { order } = this.state;

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
    const { route } = this.props;
    const { page } = route.params;
    if (route.params.trips) {
      trips = route.params.trips;
    }
    const { navigation } = this.props;
    // ,
    const Item = ({
      title,
      startDate,
      endDate,
      userName,
      userUid,
      tripUid,
    }) => (
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Single Trip', { tripUid, trips });
          }}
        >
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.dates}>
            {moment(startDate).format('MMM Do YYYY')}
            {' '}
            -
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

        <Text style={styles.headTitle}>
          {' '}
          Explore your
          {' '}
          {page === 'Explore' && <Text>friends'</Text>}
          {' '}
          trips
          {' '}
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
    justifyContent: 'center',
  },
  sortText: {
    fontSize: 15,
    color: 'white',
    marginLeft: 10,
    fontFamily: 'Nunito_600SemiBold',
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  headTitle: {
    padding: 10,
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Nunito_600SemiBold',
  },

  userName: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Nunito_600SemiBold',
  },
  sortBy: {
    fontSize: 15,
    fontFamily: 'Nunito_600SemiBold',
    color: 'white',
  },
});
export default TripsScreen;
