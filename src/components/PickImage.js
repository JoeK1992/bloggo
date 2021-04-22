import React, { useEffect } from 'react';
import {
  View, Text, TouchableOpacity, Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import s from '../styles/styles';

export default function PickImage(props) {
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

      // allowsMultipleSelection: true
    });

    if (!result.cancelled) {
      const base64Img = result.uri;

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
          props.setUrl(data.secure_url);
          return data.secure_url;
        })
        .catch((err) => console.log(err));
    }
  };
  const { uploadedUrl } = props;
  return (
    <View>
      <TouchableOpacity style={s.button} onPress={chooseImage}>
        <Text style={s.buttonText}>Pick Image</Text>
      </TouchableOpacity>
      {uploadedUrl && (
        <Text>
          Cover image
          {' '}
          <TouchableOpacity
            onPress={() => {
              props.setUrl(null);
            }}
          >
            <Text>Delete Cover image</Text>
          </TouchableOpacity>
        </Text>
      )}
    </View>
  );
}
