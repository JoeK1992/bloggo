import React, { useState } from 'react';
import {
  View, Text, TextInput, Alert,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from '../../firebase/config';
import 'firebase/firestore';
import 'firebase/auth';

export default function AddTripScreen() {
  const db = firebase.firestore();
  const [tripName, setName] = useState('');
  const [summary, setSummary] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const currentUserUID = firebase.auth().currentUser.uid;
  // console.log(currentUserUID);

  const handlePress = () => {
    if (!tripName) {
      Alert.alert('Name field is required.');
    }

    if (!summary) {
      Alert.alert('Summary field is required.');
    }
    if (!startDate) {
      Alert.alert('Start Date field is required.');
    }
    if (!endDate) {
      Alert.alert('End Date field is required.');
    }

    db.collection('trips').add({
      user: currentUserUID,
      summary,
      name: tripName,
      startDate,
      endDate,
    });
    setName('');
    setSummary('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <View>
      <Text>Add trip:</Text>
      <TextInput
        placeholder="Enter your trip name"
        value={tripName}
        onChangeText={(tripName) => setName(tripName)}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Enter a summary of your trip"
        value={summary}
        onChangeText={(summary) => setSummary(summary)}
      />
      <TextInput
        placeholder="Enter the Start Date of your trip"
        value={startDate}
        onChangeText={(startDate) => setStartDate(startDate)}
      />
      <TextInput
        placeholder="Enter the End Date of your trip"
        value={endDate}
        onChangeText={(endDate) => setEndDate(endDate)}
      />
      <TouchableOpacity onPress={handlePress}>
        <Text>Sumbit</Text>
      </TouchableOpacity>
    </View>
  );
}
