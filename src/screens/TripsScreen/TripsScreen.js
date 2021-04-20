import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import NavBar from '../../components/NavBar';
// import ProfileHeader from '../../components/ProfileHeader';
import firebase from '../../firebase/config';

import 'firebase/firestore';
import 'firebase/auth';

class TripsScreen extends Component {
  state = {
    trips: []
  };

  componentDidMount() {
    const db = firebase.firestore();
    const currentUserUID = firebase.auth().currentUser.uid;
    const tripsRef = db.collection('trips');
    tripsRef
      .where('user', '==', currentUserUID)
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

  render() {
    const { trips } = this.state;
    console.log('trips', trips);
    // const { navigation } = this.props;

    const Item = ({ title }) => (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );

    const renderItem = ({ item }) => <Item title={item.name} />;

    return (
      <View>
        <FlatList
          data={trips}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      // <View>
      //   <ProfileHeader />
      //   <TouchableOpacity
      //     onPress={() => {
      //       navigation.navigate('Single Trip');
      //     }}
      //   >
      //     <Text> Trip 1</Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity
      //     onPress={() => {
      //       navigation.navigate('Single Trip');
      //     }}
      //   >
      //     <Text> Trip 2</Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity
      //     onPress={() => {
      //       navigation.navigate('Single Trip');
      //     }}
      //   >
      //     <Text> Trip 3</Text>
      //   </TouchableOpacity>
      //   <NavBar />
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  }
});
export default TripsScreen;
