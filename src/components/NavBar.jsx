import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { Sticky, StickyContainer } from "react-sticky";

const NavBar = () => {
  const navigation = useNavigation();
  return (
    // <StickyContainer>
    //   <Sticky>
    <View style={styles.navbar}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Profile Page")}
        style={styles.navbarBtn}
      >
        <Text style={styles.text}>Username</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("My Trips")}
        style={styles.navbarBtn}
      >
        <Text style={styles.text}>My Trips</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navbarBtn}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
    //   </Sticky>
    // </StickyContainer>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#0096c7",
    color: "white",
    flexDirection: "row",
    paddingVertical: 5,
    width: "100%",
    backgroundColor: "#113755",
    height: 30,
    position: "absolute",
    flexDirection: "row",
    bottom: 0,
    justifyContent: "space-between",
    borderRadius: 5,
    right: 5,

    // position: "-webkit - sticky",
    // position: "sticky",
    // top: 0,
  },
  navbarBtn: {},
  text: {
    color: "white",
  },
});

export default NavBar;
