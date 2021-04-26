import React, { Component } from 'react';

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image'

import firebase from '../firebase/config';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import {
  faBold,
  faGlobeAmericas,
  faPlaneDeparture
} from '@fortawesome/free-solid-svg-icons';

class ProfileHeader extends Component {
  state = {
    userInfo: {}
  };

  componentDidMount() {
    const db = firebase.firestore();
    const currentUserUID = firebase.auth().currentUser.uid;

    const userRef = db.collection('users').doc(currentUserUID);

    userRef.get().then((doc) => {
      if (!doc.exists) {
        console.log('No such user');
      } else {
        const userInfo = doc.data();
        this.setState({ userInfo });
      }
    });
  }
  render() {
    const {userInfo} = this.state;
    return (
     <View>
        {userInfo && <Image style={styles.userImage} source={{uri: userInfo.profileImage}}></Image>}

       

        {userInfo && <Text style={styles.userHeaderText}>{`${userInfo.firstName} ${userInfo.lastName}`}
          <FontAwesomeIcon
            icon={faPlaneDeparture}
            style={styles.userHeaderLogo}
            size={15}
          />
        </Text>}


      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoContainer: {

  },

  userHeader: {},
  userHeaderLogo: {
    color: '#f9fced'
  },
  userHeaderText: {
    fontSize: 15,
    color: '#e2f3ec',
    alignSelf: 'center',
    fontFamily: 'Nunito_600SemiBold'
  },
  userBtn: {
    margin: 5
  },

  userImage: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 60,
    height: 60,
    borderRadius: 50,
    resizeMode:'cover'
  }
});

export default ProfileHeader;
