import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../firebase/config';
import 'firebase/auth';

export default function AddAvatar() {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const chooseImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });

    if (!result.cancelled) {
      const base64Img =
        Platform.OS === 'web'
          ? result.uri
          : `data:image/jpg;base64,${result.base64}`;

      const apiUrl = 'https://api.cloudinary.com/v1_1/ddxr0zldw/image/upload';

      const data = {
        file: base64Img,
        upload_preset: 'eqvu0yhl'
      };
      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST'
      })
        .then(async (r) => {
          const data = await r.json();
          const currentUserUID = firebase.auth().currentUser.uid;
          const db = firebase.firestore();
          const usersRef = db.collection('users').doc(currentUserUID);
          usersRef.update({ profileImage: data.secure_url });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.btn} onPress={chooseImage}>
        <Text style={styles.text}>Change Profile Image</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  btn: {
    borderRadius: 5,
    backgroundColor: '#1a759f',
    textAlign: 'center',
    width: 200,
    padding: 5,
    fontFamily: 'Nunito_600SemiBold',
    alignSelf: 'center',
    marginVertical: 10
  },

  text: {
    fontSize: 15,
    color: 'white',
    borderRadius: 3,
    textAlign: 'center',
    paddingVertical: 2,
    fontFamily: 'Nunito_600SemiBold'
  }
});
