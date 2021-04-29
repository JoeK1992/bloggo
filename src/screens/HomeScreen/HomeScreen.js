import 'firebase/firestore';
import React from 'react';
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { NavBar, ProfileHeader } from '../../components';
import firebase from '../../firebase/config';
import image from '../../images/road.jpg';
import styles from './styles';
import logo from '../../images/bloggowhite.png';

export default function HomeScreen({ navigation }) {
  const userUID = firebase.auth().currentUser.uid;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        style={styles.image}
        imageStyle={{ opacity: 0.6 }}
      >
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logoImage} />
        </View>
        <ProfileHeader userUID={userUID} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Add Trip')}
        >
          <Text style={styles.buttonText}>Add Trip</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.replace('Trips', { page: 'My Trips' })}
          >
            <Text style={styles.buttonText}>My Trips</Text>
          </TouchableOpacity>
          {/* <AddAvatar /> */}
        </View>

        {/* <Image style={styles.tinyLogo} source={image1} /> */}
      </ImageBackground>

      <NavBar />
    </View>
  );
}
