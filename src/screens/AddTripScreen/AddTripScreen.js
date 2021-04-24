import React, { useState } from 'react';
import {
  View, Text, TextInput, Alert, ScrollView,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Calendar from '../../components/Calendar';

import firebase from '../../firebase/config';
import 'firebase/firestore';
import 'firebase/auth';
import styles from './styles';
import s from '../../styles/styles';

export default function AddTripScreen({ navigation }) {
  const db = firebase.firestore();
  const [tripName, setName] = useState('');
  const [summary, setSummary] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [tripUid, setTripUid] = useState('');

  const currentUserUID = firebase.auth().currentUser.uid;
  const [selectedStartDate, setStartDate] = useState(null);
  const [selectedEndDate, setEndDate] = useState(null);
  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  const endDate = selectedEndDate ? selectedEndDate.toString() : '';
  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setEndDate(date);
    } else {
      setStartDate(date);
      setEndDate(null);
    }
  };

  const onLinkPress = () => {
    navigation.navigate('Add Destination', { tripUid });
  };

  const handlePress = () => {
    if (!tripName) {
      Alert.alert('Name field is required.');
    } else if (!summary) {
      Alert.alert('Summary field is required.');
    } else if (!startDate) {
      Alert.alert('Start Date field is required.');
    } else if (!endDate) {
      Alert.alert('End Date field is required.');
    } else {
      db.collection('trips')
        .add({
          user: currentUserUID,
          summary,
          name: tripName,
          startDate,
          endDate,
        })
        .then((data) => {
          setTripUid(data.id);
        });
      setName('');
      setSummary('');
      setStartDate('');
      setEndDate('');
      setSubmitted(true);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          placeholder="Enter your trip name"
          value={tripName}
          onChangeText={(tripName) => setName(tripName)}
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          placeholder="Enter a summary of your trip"
          value={summary}
          multiline
          onChangeText={(summary) => setSummary(summary)}
          style={styles.input}
        />
        <Calendar
          page="trip"
          startDate={startDate}
          endDate={endDate}
          onDateChange={onDateChange}
        />
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={s.buttonText}>Submit</Text>
        </TouchableOpacity>
        {!submitted ? (
          <TouchableOpacity
            style={styles.buttonDisabled}
            onPress={onLinkPress}
            disabled
          >
            <Text style={s.buttonText}>Add Destination</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              style={s.button}
              onPress={onLinkPress}
              disabled={false}
            >
              <Text style={s.buttonText}>Add Destination</Text>
            </TouchableOpacity>
            <Text style={styles.successMessage}>
              Trip successfully submitted
            </Text>
          </>
        )}
      </ScrollView>
    </View>
  );
}
