import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import s from '../styles/styles';
import firebase from '../firebase/config';
import 'firebase/auth';

export default function AddAvatar() {
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
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
      base64: true,
    });

    if (!result.cancelled) {
      const base64Img = Platform.OS === 'web'
        ? result.uri
        : `data:image/jpg;base64,${result.base64}`;

      const apiUrl = 'https://api.cloudinary.com/v1_1/ddxr0zldw/image/upload';

      const data = {
        file: base64Img,
        upload_preset: 'eqvu0yhl',
      };
      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
      })
        .then(async (r) => {
          const data = await r.json();
          setProfileImage(data.secure_url);
          editUser();
        })
        .catch((err) => console.log(err));
    }
  };

  const editUser = () => {
    const currentUserUID = firebase.auth().currentUser.uid;
    const db = firebase.firestore();
    const usersRef = db.collection('users').doc(currentUserUID);
    usersRef.update({ profileImage }).then(() => {});
  };
  return (
    <View>
      <TouchableOpacity style={s.button} onPress={chooseImage}>
        <Text style={s.buttonText}>Change Profile Image</Text>
      </TouchableOpacity>
      {/* {profileImage && editable && (
        <Text>
          Profile Image
          <TouchableOpacity
            onPress={() => {
              props.setProfileImage(null);
            }}
          >
            <Text>Delete Profile image</Text>
          </TouchableOpacity>
        </Text>
      )} */}
    </View>
  );
}
