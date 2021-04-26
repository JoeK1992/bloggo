import {
  faHome,
  faMapMarkedAlt,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// import styles from "../styles/styles";

const { height, width } = Dimensions.get("window");

const NavBar = () => {
  const navigation = useNavigation();

  return (
    // <StickyContainer>
    //   <Sticky>
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <FontAwesomeIcon icon={faHome} style={styles.logo} size={30} />
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Profile Page")}>
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
        <FontAwesomeIcon icon={faSignOutAlt} style={styles.logo} size={30} />
        <Text style={styles.text}>Explore</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesomeIcon icon={faSignOutAlt} style={styles.logo} size={30} />
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
    //   </Sticky>
    // </StickyContainer>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#113755",
    color: "white",
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "space-around",
    // position: "absolute",
    // bottom: 0,
    // left: 0,
    // right: 0,
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
    color: "#f9fced",
  },
});

export default NavBar;
