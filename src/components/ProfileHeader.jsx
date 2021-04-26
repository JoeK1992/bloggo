import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { Component } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import firebase from "../firebase/config";

class ProfileHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
    };
  }

  componentDidMount() {
    const _this = this;
    // const { page } = _this.props;
    const { userUID } = _this.props;
    const db = firebase.firestore();
    // const currentUserUID = firebase.auth().currentUser.uid;
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
    const { userInfo } = this.state;
    console.log(userInfo.firstName);
    return (
      <View>
        {userInfo && (
          <Image
            style={styles.userImage}
            source={{ uri: userInfo.profileImage }}
          ></Image>
        )}

        {userInfo && (
          <Text style={styles.userHeaderText}>
            {`${userInfo.firstName} ${userInfo.lastName}`}
            <FontAwesomeIcon
              icon={faPlaneDeparture}
              style={styles.userHeaderLogo}
              size={15}
            />
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoContainer: {},

  userHeader: {},
  userHeaderLogo: {
    color: "#f9fced",
  },
  userHeaderText: {
    fontSize: 15,
    color: "#e2f3ec",
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
