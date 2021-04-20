import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NavBar = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Profile Page")}
        style={styles.navbarBtn}
      >
        <Text>Username</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("My Trips")}
        style={styles.navbarBtn}
      >
        <Text>My Trips</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navbarBtn}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flex: 1,
    padding: 5,
    borderRadius: 5,
    borderColor: "red",
    borderWidth: 2,
    flexDirection: "row",
  },
  navbarBtn: {
    margin: 5,
  },
});

export default NavBar;
