import 'firebase/firestore';
import React from 'react';
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import NavBar from '../../components/NavBar';
import ProfileHeader from '../../components/ProfileHeader';
import firebase from '../../firebase/config';
import image from '../../images/road.jpg';
import styles from './styles';
import logo from '../../images/bloggowhite.png';

export default function HomeScreen({ navigation }) {
  const userUID = firebase.auth().currentUser.uid;

  const onLinkPress = () => {
    navigation.navigate('Add Trip');
  };

  // const Stack = createStackNavigator();

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

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={onLinkPress}>
            Add Trip
          </Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <TouchableOpacity style={styles.button}>
            <Text
              style={styles.buttonText}
              onPress={() => navigation.replace('Trips', { page: 'My Trips' })}
            >
              My Trips
            </Text>
          </TouchableOpacity>
          {/* <AddAvatar /> */}
        </View>

        {/* <Image style={styles.tinyLogo} source={image1} /> */}
      </ImageBackground>

      <NavBar />
    </View>
  );
}
