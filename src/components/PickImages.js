import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import s from '../styles/styles';

export default function PickImages(props) {
  const [counter, incrementCounter] = useState(0);

  const pickImage = async () => {
    incrementCounter((prevCount) => prevCount + 1);
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
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
          const newImage = { name: `Image ${counter}`, url: data.secure_url };
          const newArray = [...props.uploadedUrls, newImage];
          props.setUrls(newArray);
          return data.secure_url;
        })
        .catch((err) => console.log(err));
    }
  };

  const deleteImage = (url) => {
    const currArray = props.uploadedUrls.filter((image) => {
      return image.url !== url;
    });
    props.setUrls(currArray);
  };

  const Item = ({ title, url }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity>
        <Text
          onPress={() => {
            deleteImage(url);
          }}
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
      <TouchableOpacity style={s.button} onPress={pickImage}>
        <Text style={s.buttonText}>Pick more images of your trip</Text>
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
    // flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  pic: {
    width: 100,
    height: 100,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
