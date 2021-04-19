import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
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
      <Text>Home Screen</Text>
      <Text onPress={onLinkPress}>Add Trip</Text>
      <TouchableOpacity onPress={handlePress}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}
