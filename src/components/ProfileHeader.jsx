import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { Component } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import firebase from "../firebase/config";

class ProfileHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
    };
  }

  componentDidMount() {
    const { userUID } = this.props;

    const db = firebase.firestore();
    if (userUID) {
      const userRef = db.collection("users").doc(userUID);
      userRef.onSnapshot((doc) => {
        if (!doc.exists) {
          console.log("No such user");
        } else {
          const userInfo = doc.data();
          this.setState({ userInfo });
        }
      });
    }
  }
  render() {
    const { userInfo } = this.state;
    return (
      <View style={styles.container}>
        {userInfo && (
          <Image
            style={styles.userImage}
            source={{ uri: userInfo.profileImage }}
          ></Image>
        )}

        {userInfo && (
          <Text style={styles.userHeaderText}>
            {`${userInfo.firstName} ${userInfo.lastName}`}

          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoContainer: {},
  container: {
    paddingTop: 20, 
  },

  userHeaderLogo: {
    color: "#f9fced",
  },
  userHeaderText: {
    fontSize: 16,
    color: "white",
    alignSelf: "center",
    fontFamily: "Nunito_600SemiBold",
  },
  userBtn: {
    margin: 5,
  },

  userImage: {
    justifyContent: "center",
    alignSelf: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    resizeMode: "cover",
  },
});

export default ProfileHeader;
