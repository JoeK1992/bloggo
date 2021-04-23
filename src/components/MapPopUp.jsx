import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Modal,
  TouchableHighlight
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50
  },
  stretch: {
    width: 50,
    height: 200,
    resizeMode: 'stretch'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
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
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
});

const destinationFormatter = (destination) => {
  const commaIndex = destination.indexOf(',');
  const formattedDestination = destination.slice(0, commaIndex);
  return formattedDestination;
};

const MapPopUp = ({ closeModal, modalDestination }) => {
  //console.log('in map popup', modalDestination);
  const { id, destination, endDate, startDate, uploadedUrl } = modalDestination;
  console.log(typeof endDate);
  const navigation = useNavigation();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      // visible={modalVisible}
      onRequestClose={() => closeModal()}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableHighlight
            onPress={() => {
              console.log('navigating');
              navigation.navigate('Single Destination');
            }}
          >
            <Text style={styles.modalText}>
              {destinationFormatter(destination.formatted)}
            </Text>
          </TouchableHighlight>
          <Text>{startDate}</Text>
          <Text>{endDate}</Text>
          <View style={styles.container}>
            <Image source={{ uri: uploadedUrl }} style={styles.stretch} />
          </View>

          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
            onPress={() => {
              closeModal();
            }}
          >
            <Text style={styles.textStyle}>Close</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

export default MapPopUp;
