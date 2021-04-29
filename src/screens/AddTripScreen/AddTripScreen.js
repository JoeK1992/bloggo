import 'firebase/auth';
import 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Calendar, NavBar } from '../../components';
import firebase from '../../firebase/config';
import s from '../../styles/styles';
import styles from './styles';

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
      const userRef = db.collection('users').doc(currentUserUID);

      userRef
        .get()
        .then((doc) => {
          if (!doc.exists) {
            return 'No such user';
          }
          const userInfo = doc.data();
          const userName = `${userInfo.firstName} ${userInfo.lastName}`;
          return userName;
        })
        .then((userName) => {
          db.collection('trips')
            .add({
              user: currentUserUID,
              summary,
              name: tripName,
              startDate,
              endDate,
              userName
            })
            .then((data) => {
              setTripUid(data.id);
            });
          setName('');
          setSummary('');
          setStartDate('');
          setEndDate('');
          setSubmitted(true);
        });
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
      <NavBar />
    </View>
  );
}
