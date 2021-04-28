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
    console.log(userUID)
    const { userUID } = this.props;
        console.log(userUID, 'user')

    const db = firebase.firestore();
    if (userUID) {
      const userRef = db.collection("users").doc(userUID);
      userRef.get().then((doc) => {
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
    console.log(userInfo)
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
    paddingVertical: 10, 
  },

  userHeader: {},
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
