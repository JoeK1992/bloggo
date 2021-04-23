import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ColouredMap from '../../components/ColouredMap';
import NavBar from '../../components/NavBar';
import ProfileHeader from '../../components/ProfileHeader';

class UserScreen extends Component {
  render() {
    return (
      <View>
        <ProfileHeader />
        <View style={styles.mapDisplay}>
          <ColouredMap />
        </View>

        <Text>User Gamification Area</Text>
        <NavBar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  },
  mapDisplay: {
    height: 500,
    width: 500
  }
});

export default UserScreen;
