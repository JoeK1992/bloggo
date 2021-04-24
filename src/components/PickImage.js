import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import addDesStyles from '../screens/AddDestinationScreen/styles';

export default function PickImage(props) {
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
          props.setUrl(data.secure_url);
          return data.secure_url;
        })
        .catch((err) => console.log(err));
    }
  };
  const { uploadedUrl, setUrl } = props;
  console.log(uploadedUrl, 'here');
  return (
    <View>
      <TouchableOpacity style={addDesStyles.button} onPress={chooseImage}>
        <Text style={addDesStyles.buttonText}>Pick Cover Image</Text>
      </TouchableOpacity>
      {uploadedUrl !== '' && (
        <Text>
          Cover Image{' '}
          <TouchableOpacity
            onPress={() => {
              setUrl(null);
            }}
          >
            <Text>Delete Cover image</Text>
          </TouchableOpacity>{' '}
        </Text>
      )}
    </View>
  );
}
