import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { decode, encode } from 'base-64';
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens';
import AddTripScreen from './src/screens/AddTripScreen/AddTripScreen';
import 'firebase/firestore';
import firebase from './src/firebase/config';
import TripsScreen from './src/screens/TripsScreen/TripsScreen';

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);
  if (loading) {
    return <Text>Loading</Text>;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home">
              {(props) => <HomeScreen {...props} extraData={user} />}
            </Stack.Screen>
            <Stack.Screen name="Add Trip" component={AddTripScreen} />
            <Stack.Screen name="My Trips" component={TripsScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
