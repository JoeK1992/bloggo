import "firebase/auth";
import "firebase/firestore";
import React, { Component } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import NavBar from "../../components/NavBar";
import ProfileHeader from "../../components/ProfileHeader";
import firebase from "../../firebase/config";

// const styles = StyleSheet.create( {
//     tripDetails: {},
//     tripButtons
// });

class SingleTripScreen extends Component {
  state = {
    trip: {},
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
      } else {
        this.setState({ trip: doc.data() });
      }
    });
  }

  render() {
    const { navigation, route } = this.props;
    const { tripUid } = route.params;

    const { trip } = this.state;
    console.log(trip);

    return (
      <View>
        <ProfileHeader />
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
            <TouchableOpacity />
            <Text> Add Destination</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Single Destination");
            }}
          >
            <Text> Display Destination</Text>
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
