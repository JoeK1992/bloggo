import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { decode, encode } from 'base-64';
import 'firebase/auth';
import 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import 'react-native-gesture-handler';

import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Nunito_600SemiBold,
  Nunito_400Regular,
} from '@expo-google-fonts/nunito';
import {
  Lato_400Regular,
  Lato_300Light,
  Lato_700Bold,
} from '@expo-google-fonts/lato';
import {
  AddDestinationScreen,
  AddTripScreen,
  HomeScreen,
  LoginScreen,
  RegistrationScreen,
  SingleDestinationScreen,
  SingleTripScreen,
  TripsScreen,
  UserScreen,
} from './src/screens';
import firebase from './src/firebase/config';

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

  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Lato_400Regular,
    Lato_300Light,
    Lato_700Bold,
    Nunito_400Regular,
  });

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
  if (!fontsLoaded) {
    return <AppLoading />;
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

            <Stack.Screen
              name="Add Destination"
              component={AddDestinationScreen}
            />

            <Stack.Screen name="My Trips" component={TripsScreen} />
            <Stack.Screen name="Profile Page" component={UserScreen} />
            <Stack.Screen name="Single Trip" component={SingleTripScreen} />
            <Stack.Screen
              name="Single Destination"
              component={SingleDestinationScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Registration"
              component={RegistrationScreen}
            />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
