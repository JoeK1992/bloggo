import {
  faHome,
  faMapMarkedAlt,
  faSignOutAlt,
  faUser,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import firebase from "../firebase/config";


const handlePress = () => {
  firebase.auth().signOut();

};
const NavBar = () => {
  const navigation = useNavigation();

  return (

    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <FontAwesomeIcon icon={faHome} style={styles.logo} size={30} />
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.replace("Profile Page", {
            userUid: firebase.auth().currentUser.uid,
            page: 'My Profile'
          })
        }
      >
        <FontAwesomeIcon icon={faUser} style={styles.logo} size={30} />
        <Text style={styles.text}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.replace("Trips", { page: "My Trips" })}
      >
        <FontAwesomeIcon icon={faMapMarkedAlt} style={styles.logo} size={30} />
        <Text style={styles.text}>Trips</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.replace("Trips", { page: "Explore" })}
      >
        <FontAwesomeIcon icon={faUserFriends} style={styles.logo} size={30} />
        <Text style={styles.text}>Explore</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePress}>
        <FontAwesomeIcon icon={faSignOutAlt} style={styles.logo} size={30} />
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#113755",
    color: "white",
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "space-around",
    marginTop: 10,
  },
  text: {
    color: "#f9fced",
    textAlign: "center",
    paddingVertical: 2,
    fontSize: 8,
    fontFamily: "Nunito_600SemiBold",
  },
  logo: {
    color: "white",
  },
});

export default NavBar;
