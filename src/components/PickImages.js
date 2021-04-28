import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import addDesStyles from '../screens/AddDestinationScreen/styles';

export default function PickImages(props) {
  const [counter, incrementCounter] = useState(1);

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
    incrementCounter((prevCount) => prevCount + 1);
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
          const newImage = { name: `Image ${counter}`, url: data.secure_url };
          const newArray = [...props.uploadedUrls, newImage];
          console.log(newArray);
          props.setUploadedUrls(newArray);
          return data.secure_url;
        })
        .catch((err) => console.log(err));
    }
  };

  const deleteImage = (url) => {
    const currArray = props.uploadedUrls.filter((image) => {
      return image.url !== url;
    });
    props.setUploadedUrls(currArray);
  };

  const Item = ({ title, url }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity>
        <Text
          onPress={() => {
            deleteImage(url);
          }}
          style={styles.delete}
        >
          Delete image
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <>
      <Item title={item.name} url={item.url} />
    </>
  );
  const { uploadedUrls } = props;

  return (
    <View>
      <TouchableOpacity style={addDesStyles.button} onPress={pickImage}>
        <Text style={addDesStyles.buttonText}>
          Pick more images of your trip
        </Text>
      </TouchableOpacity>
      <View>
        <FlatList
          data={uploadedUrls}
          renderItem={renderItem}
          keyExtractor={(item) => item.url}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    fontFamily: 'Nunito_400Regular',
    // flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  pic: {
    width: 100,
    height: 100,
  },
  item: {
    backgroundColor: '#34a0a4',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    width: 300,
    alignSelf: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontFamily: 'Nunito_400Regular',
    color: 'white',
  },
  delete: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#ffe8dc',
  },
});
