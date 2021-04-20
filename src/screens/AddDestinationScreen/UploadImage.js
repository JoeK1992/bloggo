
import React, { useEffect } from 'react';
import { Button, View, Platform } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

export default function UploadImage(props) {
  // const [image, setImage] = useState(null);

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

  const pickImage = async () => {
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
          console.log(data.secure_url);
          props.setUrl(data.secure_url);
          return data.secure_url;
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick a Cover image" onPress={pickImage} />
      {/* <Button title="Add more images of your holiday" onPress={pickImage} /> */}
      {/* {image && (

      )} */}
    </View>
  );
}
