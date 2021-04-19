import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NavBar from '../../components/NavBar';
import ProfileHeader from '../../components/ProfileHeader';

class TripsScreen extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View>
        <ProfileHeader />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Single Trip');
          }}
        >
          <Text> Trip 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Single Trip');
          }}
        >
          <Text> Trip 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Single Trip');
          }}
        >
          <Text> Trip 3</Text>
        </TouchableOpacity>
        <NavBar />
      </View>
    );
  }
}

export default TripsScreen;
