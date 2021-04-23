import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import image from "../images/japan.png";

const ProfileHeader = () => {
  return (
    <View style={styles.userHeader}>
      <Image style={styles.tinyLogo} source={image}></Image>
      <TouchableOpacity
        style={styles.userBtn}
        onPress={() => {
          console.log("navigating to user profile");
        }}
      >
        <Text style={styles.user}> AlexTheSpaceMan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  userHeader: {
    padding: 5,
    borderRadius: 5,
    borderColor: "#52B69A",
    borderWidth: 2,
    // zIndex: 15,
    height: 30,
    position: "absolute",
    top: 20,
    right: 70,
    width: 200,
    height: 230,
    backgroundColor: "#113755",
  },
  userBtn: {
    margin: 5,
  },
  tinyLogo: {
    width: 180,
    height: 180,
    // zIndex: 21,
    position: "absolute",
    right: 8,
    top: 5,
  },
  user: {
    color: "white",
    position: "absolute",
    top: 185,
    right: 30,
  },
});

export default ProfileHeader;
