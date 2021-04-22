import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, StatusBar } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import NavBar from "../../components/NavBar";
// import ProfileHeader from '../../components/ProfileHeader';
import firebase from "../../firebase/config";

import "firebase/firestore";
import "firebase/auth";

class TripsScreen extends Component {
  state = {
    trips: [],
    order: "desc",
  };

  componentDidMount() {
    const db = firebase.firestore();
    const currentUserUID = firebase.auth().currentUser.uid;
    const tripsRef = db.collection("trips");
    tripsRef
      .where("user", "==", currentUserUID)
      .where("summary", "!=", false)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("No matching documents.");
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

    if (order === "desc") {
      this.setState({ order: "asc" });
    } else {
      this.setState({ order: "desc" });
    }

    const tripsRef = db.collection("trips");

    tripsRef
      .where("user", "==", currentUserUID)
      .where("summary", "!=", false)
      .orderBy("summary")
      .orderBy("startDate", order)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("No matching documents.");
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
    let { trips, order } = this.state;
    if (this.props.route.params) {
      trips = this.props.route.params.trips;
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
            navigation.navigate("Single Trip", { tripUid: item.id, trips });
          }}
        >
          <Item title={item.name} />
        </TouchableOpacity>
      </>
    );

    return (
      <View>
        {order === "desc" ? (
          <TouchableOpacity onPress={this.reverseOrder}>
            <Text>Oldest trips</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={this.reverseOrder}>
            <Text>Most recent trips</Text>
          </TouchableOpacity>
        )}

        <FlatList
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
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
export default TripsScreen;
