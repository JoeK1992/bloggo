// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import "firebase/firestore";
import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import NavBar from "../../components/NavBar";
import ProfileHeader from "../../components/ProfileHeader";
import firebase from "../../firebase/config";
import image1 from "../../images/logo.jpeg";
import image from "../../images/mountain.jpeg";

export default function HomeScreen({ navigation }) {
  const handlePress = () => {
    console.log("in here");
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("in navigate");
        navigation.replace("Login");
      });
  };

  const onLinkPress = () => {
    navigation.navigate("Add Trip");
  };

  // const Stack = createStackNavigator();

  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen />
    //     <Stack.Screen name="Add Trip" component={AddTripScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <View style={styles.screen}>
      <ImageBackground source={image} style={styles.image}>
        <ProfileHeader />

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.btn1}
            onPress={() => {
              navigation.navigate("Profile Page");
            }}
          >
            <Text style={styles.text}> Your Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <TouchableOpacity style={styles.btn2}>
            <Text style={styles.text} onPress={onLinkPress}>
              Add Trip
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <TouchableOpacity style={styles.btn3}>
            <Text
              style={styles.text}
              onPress={() => navigation.navigate("My Trips")}
            >
              My Trips
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handlePress}>
          <Text>Log Out</Text>
        </TouchableOpacity>

        <Image style={styles.tinyLogo} source={image1} />
      </ImageBackground>

      <NavBar />
    </View>
  );
}
const styles = StyleSheet.create({
  // header: {
  //   padding: 5,
  //   borderRadius: 5,
  //   borderColor: "#1A759F",
  //   borderWidth: 2,
  //   backgroundColor: "#1A759F",
  // },
  screen: {
    padding: 5,
    borderRadius: 5,
    borderColor: "#52B69A",
    borderWidth: 6,
    height: "100%",
    backgroundColor: "#1E6091",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    borderRadius: 5,
  },
  btn1: {
    padding: 5,
    borderRadius: 5,
    borderColor: "#1E6091",
    borderWidth: 2,
    backgroundColor: "#34A0A4",
    position: "absolute",
    bottom: -20,
    right: 70,
    width: 200,
  },
  btn2: {
    padding: 5,
    borderRadius: 5,
    borderColor: "#1E6091",
    borderWidth: 2,
    backgroundColor: "#34A0A4",
    position: "absolute",
    bottom: -60,
    right: 70,
    width: 200,
  },
  btn3: {
    padding: 5,
    borderRadius: 5,
    borderColor: "#1E6091",
    borderWidth: 2,
    backgroundColor: "#34A0A4",
    position: "absolute",
    bottom: -100,
    right: 70,
    width: 200,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  tinyLogo: {
    width: 100,
    height: 100,
    borderColor: "#34A0A4",
    borderWidth: 2,
    position: "absolute",
    bottom: 70,
    right: 120,
  },
});
