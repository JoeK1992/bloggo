import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import addDesStyles from '../screens/AddDestinationScreen/styles';

export default function PickImage(props) {
  console.log(props, 'PROPS');
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
          console.log(data, 'DATA');
          props.setUploadedUrl(data.secure_url);
          return data.secure_url;
        })
        .catch((err) => console.log(err));
    }
  };
  const { uploadedUrl, setUploadedUrl } = props;
  return (
    <View>
      <TouchableOpacity style={addDesStyles.button} onPress={chooseImage}>
        <Text style={addDesStyles.buttonText}>Pick Cover Image</Text>
      </TouchableOpacity>
      {uploadedUrl !== '' && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setUploadedUrl(null);
          }}
        >
          <Text style={styles.title}>Delete Cover image</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#34a0a4',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    width: 300,
    alignSelf: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 15,
    fontFamily: 'Nunito_400Regular',
    color: 'white'
  }
});
