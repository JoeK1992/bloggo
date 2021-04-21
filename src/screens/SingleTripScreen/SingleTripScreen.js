import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import NavBar from "../../components/NavBar";
import ProfileHeader from "../../components/ProfileHeader";
import firebase from "../../firebase/config";
import "firebase/firestore";
import "firebase/auth";
import MapViewer from "../../components/MapViewer";

const styles = StyleSheet.create({
  map: {
    height: 1000,
    width: 1000,
  },
});

class SingleTripScreen extends Component {
  state = {
    // trip: {},
    destinations: [],
  };

  componentDidMount() {
    const db = firebase.firestore();
    // const currentUserUID = firebase.auth().currentUser.uid;
    const { route } = this.props;
    const { tripUid } = route.params;

    const tripRef = db.collection("trips").doc(tripUid);
    tripRef.get().then((doc) => {
      if (!doc.exists) {
        console.log("No such document");
        // } else {
        //   this.setState({ trip: doc.data() });
      }
    });

    const destinationsRef = db
      .collection("trips")
      .doc(tripUid)
      .collection("destinations");
    destinationsRef.get().then((snapshot) => {
      if (snapshot.empty) {
        console.log("No matching documents.");
      } else {
        const newDestinations = [];
        snapshot.forEach((doc) => {
          const destination = doc.data();
          destination.id = doc.id;
          newDestinations.push(destination);
        });
        this.setState({ destinations: newDestinations });
      }
    });
  }

  render() {
    const { navigation, route } = this.props;
    const { tripUid } = route.params;
    const { destinations } = this.state;

    return (
      <View>
        <ProfileHeader />
        <View style={styles.map}>
          <MapViewer destinations={destinations} />
        </View>
        <View>
          <Text>Map Goes Here</Text>
          <Text>Trip Stats go Here</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Add Destination", { tripUid });
            }}
          >
            <Text> Add Destination</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log("Delete Trip");
            }}
          >
            <Text> Delete Trip </Text>
          </TouchableOpacity>
        </View>
        <NavBar />
      </View>
    );
  }
}

export default SingleTripScreen;
