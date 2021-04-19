import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

const ProfileHeader = () => {
  return (
    <View style={styles.userHeader}>
      <Text>Profile Picture Here</Text>
      <TouchableOpacity
        style={styles.userBtn}
        onPress={() => {
          console.log('navigating to user profile');
        }}
      >
        <Text> Username</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  userHeader: {
    padding: 5,
    borderRadius: 5,
    borderColor: 'purple',
    borderWidth: 2
  },
  userBtn: {
    margin: 5
  }
});

export default ProfileHeader;
