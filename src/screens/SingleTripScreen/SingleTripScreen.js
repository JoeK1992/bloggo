import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NavBar from '../../components/NavBar';
import ProfileHeader from '../../components/ProfileHeader';

// const styles = StyleSheet.create( {
//     tripDetails: {},
//     tripButtons
// });

class SingleTripScreen extends Component {
  render() {
    return (
      <View>
        <ProfileHeader />
        <View>
          <Text>Map Goes Here</Text>
          <Text>Trip Stats go Here</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              console.log('Add destination Form');
            }}
          >
            <Text> Add Destination</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log('Delete Trip');
            }}
          >
            <Text> Delete Trip </Text>
          </TouchableOpacity>
        </View>
        <NavBar />
      </View>
    );
  }
}

export default SingleTripScreen;
