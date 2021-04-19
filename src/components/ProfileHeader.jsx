import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

class ProfileHeader extends Component {
  render() {
    return (
      <View>
        <Text>Profile Picture Here</Text>
        <TouchableOpacity
          onPress={() => {
            console.log('navigating to user profile');
          }}
        >
          <Text> Username</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ProfileHeader;
