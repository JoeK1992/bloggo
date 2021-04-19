import React, { Component } from 'react';
import { View, Text } from 'react-native';
import NavBar from '../../components/NavBar';
import ProfileHeader from '../../components/ProfileHeader';

class UserScreen extends Component {
  render() {
    return (
      <View>
        <ProfileHeader />
        <Text>Users Personal Map Goes Here</Text>
        <Text>User Gamification Area</Text>
        <NavBar />
      </View>
    );
  }
}

export default UserScreen;
