import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBold,
  faGlobeAmericas,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";

const ProfileHeader = () => {
  return (
    <View style={styles.userHeader}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>
          <FontAwesomeIcon icon={faBold} style={styles.logo} size={30} />
          logg
          <FontAwesomeIcon
            icon={faGlobeAmericas}
            style={styles.logo}
            size={20}
          />
        </Text>
      </View>

      <Text style={styles.userHeaderText}>
        Gary O'Connor{" "}
        <FontAwesomeIcon
          icon={faPlaneDeparture}
          style={styles.userHeaderLogo}
          size={15}
        />
      </Text>
      <TouchableOpacity
        style={styles.userBtn}
        onPress={() => {
          console.log("navigating to user profile");
        }}
      ></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    flexDirection: "row",
    color: "#52b69a",
  },
  logo: {
    color: "#52b69a",
    alignSelf: "flex-end",
  },
  logoText: {
    fontSize: 25,
    color: "#e2f3ec",
    fontFamily: "Nunito_600SemiBold",
    alignSelf: "center",
  },
  userHeader: {
    fontSize: 18,
    color: "#f9fced",

    padding: 5,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#1e6091",
    marginBottom: 5,
  },
  userHeaderLogo: {
    color: "#f9fced",
  },
  userHeaderText: {
    fontSize: 15,
    color: "#e2f3ec",
    alignSelf: "flex-end",
    fontFamily: "Nunito_600SemiBold",
  },
  userBtn: {
    margin: 5,
  },
});

export default ProfileHeader;
