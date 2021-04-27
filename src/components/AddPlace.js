import React, { useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-native-material-dropdown-v2';

export default function AddPlace() {
  // function urlLocate() {
  // var url = document.getElementById("url").value;
  // var regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  // if (url != "") {
  //     if (!regexp.test(url)) {
  //         alert("Please enter valid url.");
  //     } else {
  //         window.location.assign(url);
  //     }
  // }
  // else {
  //     alert("Please upload an image.");
  // }

  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState('');
  const [post, setPost] = useState('');

  const types = [
    {
      value: 'To eat',
    },
    {
      value: 'To sleep',
    },
    {
      value: 'To visit',
    },
  ];
  console.log(type);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              // style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <FontAwesomeIcon
                style={styles.deleteIcon}
                icon={faTimes}
                size={30}
              />
            </Pressable>

            <Text>Add a new visited place to your trip</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setName(text)}
              value={name}
              multiline
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="URL"
              placeholderTextColor="#aaaaaa"
              textContentType="URL"
              onChangeText={(text) => setUrl(text)}
              value={url}
              multiline
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="post"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setPost(text)}
              value={post}
              multiline
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <Dropdown
              label="Type"
              data={types}
              containerStyle={styles.dropdown}
              onChangeText={(value) => {
                setType(value);
              }}
            />

            {/* <TextInput style={styles.modalText}>Hello World!</TextInput> */}
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontFamily: 'Nunito_600SemiBold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Nunito_600SemiBold',
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    width: 250,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 16,
  },
  deleteIcon: {
    color: '#ed6a5a',
    fontSize: 12,
  },
  dropdown: {
    width: 200,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
});
