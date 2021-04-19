import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from '../../firebase/config';
import 'firebase/firestore';
import 'firebase/auth';
import CalendarPicker from 'react-native-calendar-picker';

export default function AddTripScreen() {
  const db = firebase.firestore();
  const [tripName, setName] = useState('');
  const [summary, setSummary] = useState('');
  // const [startDate, setStartDate] = useState('');
  // const [endDate, setEndDate] = useState('');
  const currentUserUID = firebase.auth().currentUser.uid;
  const [selectedStartDate, setStartDate] = useState(null);
  const [selectedEndDate, setEndDate] = useState(null);

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setEndDate(date);
    } else {
      setStartDate(date);
      setEndDate(null);
    }
  };

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
      endDate
    });
    setName('');
    setSummary('');
    setStartDate('');
    setEndDate('');
  };

  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  const endDate = selectedEndDate ? selectedEndDate.toString() : '';

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

      <Text>Select your trip dates</Text>

      <CalendarPicker
        startFromMonday={true}
        allowRangeSelection={true}
        todayBackgroundColor="#f2e6ff"
        selectedDayColor="#7300e6"
        selectedDayTextColor="#FFFFFF"
        onDateChange={onDateChange}
        scaleFactor="700"
      />

      <View>
        <Text>SELECTED START DATE:{startDate}</Text>
        <Text>SELECTED END DATE:{endDate}</Text>
      </View>

      <TouchableOpacity onPress={handlePress}>
        <Text>Sumbit</Text>
      </TouchableOpacity>
    </View>
  );
}
