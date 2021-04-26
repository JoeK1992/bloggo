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
      // .where("summary", "==", true)
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
    console.log(this.props);
    let { trips } = this.state;
    const { order, currentUserUID } = this.state;
    const { route } = this.props;
    const { page } = route.params;
    if (route.params.trips) {
      trips = route.params.trips;
    }
    const { navigation } = this.props;
    // userName, userUid,
    const Item = ({ title, startDate, endDate }) => (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.dates}>
          {moment(startDate).format('MMM Do YYYY')}
          {' '}
          -
          {moment(endDate).format('MMM Do YYYY')}
        </Text>
        {/* {page === "Explore" && (
          <TouchableOpacity
            onPress={() => {
              navigation.replace("Profile Page", { userUid });
            }}
          >
            <Text>{userName}</Text>
          </TouchableOpacity>
        )} */}
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
            userUid={item.user}
            title={item.name}
            startDate={item.startDate}
            endDate={item.endDate}
            userName={item.userName}
          />
        </TouchableOpacity>
      </>
    );

    return (
      <View style={styles.container}>
        {page === 'My Trips' && <ProfileHeader userUID={currentUserUID} />}

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
