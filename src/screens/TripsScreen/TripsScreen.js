import React, { Component } from 'react';
import { View, Text } from 'react-native';
import NavBar from '../../components/NavBar';
import ProfileHeader from '../../components/ProfileHeader';

class TripsScreen extends Component {
  render() {
    return (
      <View>
        <ProfileHeader />
        <Text> Trip 1</Text>
        <Text> Trip 2</Text>
        <Text> Trip 3</Text>
        <NavBar />
      </View>
    );
  }
}

export default TripsScreen;
