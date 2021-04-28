import React from 'react';
import {
  Text,
  View,
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
  dates: {
    fontFamily: 'Nunito_600SemiBold',

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
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: 'white',
    fontFamily: 'Nunito_600SemiBold',
    textAlign: 'center'
  },
  modalText: {
        fontFamily: 'Nunito_600SemiBold',
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
  const { id, destination, endDate, startDate } = modalDestination;
  const navigation = useNavigation();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={() => closeModal()}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableHighlight
            onPress={() => {
              navigation.navigate('Single Destination');
            }}
          >
            <Text style={styles.modalText}>
              {destinationFormatter(destination.formatted)}
            </Text>
          </TouchableHighlight>
          <Text style={styles.dates}>{startDate.slice(0, 15)}</Text>
          <Text style={styles.dates}>{endDate.slice(0, 15)}</Text>
          <View style={styles.container}>
          </View>

          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: '#52b69a' }}
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
