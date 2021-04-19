import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import NavBar from '../../components/NavBar';
import firebase from '../../firebase/config';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

import 'firebase/firestore';

export default function HomeScreen({ navigation }) {
  const handlePress = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate('Home');
      });
  };

  const onLinkPress = () => {
    navigation.navigate('Add Trip');
  };
  // const Stack = createStackNavigator();

  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen />
    //     <Stack.Screen name="Add Trip" component={AddTripScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <View>
      <View>
        <View style={styles.header}>
          <Text>Home Screen</Text>
          <Text> Logo Goes Here</Text>
          <Text> Profile Picture Goes Here</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate('Profile Page');
            }}
          >
            <Text> User Profile Button</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btn}>
          <Text onPress={onLinkPress}>Add Trip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text onPress={() => navigation.navigate('My Trips')}>My Trips</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      </View>
      <NavBar />
    </View>
  );
}
const styles = StyleSheet.create({
  btn: {
    padding: 5,
    borderRadius: 5,
    borderColor: 'green',
    borderWidth: 2
  },
  header: {
    padding: 5,
    borderRadius: 5,
    borderColor: 'blue',
    borderWidth: 2
  }
});
