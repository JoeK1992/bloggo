import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const NavBar = () => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navbarBtn}>
        <Text>Username</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navbarBtn}>
        <Text>My Trips</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navbarBtn}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flex: 1,
    padding: 5,
    borderRadius: 5,
    borderColor: 'red',
    borderWidth: 2,
    flexDirection: 'row'
  },
  navbarBtn: {
    margin: 5
  },
});

export default NavBar;
