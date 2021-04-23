import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import NavBar from "../../components/NavBar";
import ProfileHeader from "../../components/ProfileHeader";

const { height, width } = Dimensions.get("window");

class UserScreen extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.userScreen}>
        <ScrollView>
          <ProfileHeader style={styles.profileHeader} />
          <View style={styles.mapContainer}></View>
          <Image style={styles.map} source={require("../../images/map.jpg")} />
          <View style={styles.btnContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("My Trips")}
              style={styles.btn}
            >
              <Text style={styles.text}>My Trips</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.gamificationContainer}>
            <Text style={styles.gamificationTitle}>My World</Text>
            <Text style={styles.gamificationStat}>
              2 Continents | 24 Countries | 4 Trips
            </Text>

            <Text style={styles.gamificationFlags}>
              🇦🇽 🇧🇬 🇧🇷 🇧🇿 🇦🇽 🇧🇬 🇧🇷 🇧🇿 🇦🇽 🇧🇬 🇧🇷 🇧🇿 🇦🇽 🇧🇬 🇧🇷 🇧🇿 🇦🇽 🇧🇬 🇧🇷 🇧🇿 🇦🇽 🇧🇬
              🇧🇷 🇧🇿 🇦🇽 🇧🇬 🇧🇷 🇧🇿 🇦🇽 🇧🇬
            </Text>
          </View>
          <NavBar style={styles.navBar} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profileHeader: {
    flex: 1,
  },
  navBar: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  userScreen: {
    backgroundColor: "#e7f5e8",
    position: "relative",
    flex: 1,
    height: height,
    width: width,
  },
  gamificationTitle: {
    fontSize: 20,
    textAlign: "center",
    color: "#113755",
    paddingBottom: 5,
    fontWeight: "bold",
    fontFamily: "Nunito_600SemiBold",
  },
  gamificationStat: {
    fontSize: 15,
    textAlign: "center",
    color: "#113755",
    padding: 2,
    marginBottom: 5,
    fontFamily: "Lato_400Regular",
  },
  gamificationFlags: {
    fontSize: 15,
    textAlign: "center",
    marginHorizontal: 40,
    letterSpacing: 8,
  },
  mapContainer: {
    flex: 2,
  },
  map: {
    width: "100%",
    height: undefined,
    aspectRatio: 1.5,
  },
  btn: {
    color: "#e8f3b9",
    borderRadius: 3,
    backgroundColor: "#34a0a4",
    textAlign: "center",
    width: 120,
    padding: 10,
    fontFamily: "Nunito_600SemiBold",
  },
  btnContainer: {
    alignItems: "center",
    margin: 10,
  },
  text: {
    fontSize: 20,
    color: "#113755",
    borderRadius: 3,
    textAlign: "center",
    paddingVertical: 2,
  },
  gamificationContainer: {
    borderRadius: 10,
    backgroundColor: "#d4ede2",
    textAlign: "center",
    paddingVertical: 2,
    flex: 2,
  },
});

export default UserScreen;
