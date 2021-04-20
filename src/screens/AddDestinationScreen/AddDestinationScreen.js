import React, { useState } from 'react';
import {
  View, Text, TextInput, Alert,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CalendarPicker from 'react-native-calendar-picker';
import UploadImage from './UploadImage';
import firebase from '../../firebase/config';
import 'firebase/firestore';
import 'firebase/auth';

export default function AddDestinationScreen() {
  const db = firebase.firestore();
  const [blogPost, setBlog] = useState('');

  const currentUserUID = firebase.auth().currentUser.uid;
  const [uploadedUrl, setUrl] = useState(null);

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

  const handlePress = () => {
    if (!startDate) {
      Alert.alert('Start Date field is required.');
    }
    if (!endDate) {
      Alert.alert('End Date field is required.');
    }

    db.collection('trips').add({
      user: currentUserUID,
      trip: 'KNC4mJjToxN1jp8XTYOb',
      blogPost,
      startDate,
      endDate,
    });
    setBlog('');
    setStartDate('');
    setEndDate('');
  };
  console.log(uploadedUrl, 'here');
  return (
    <View>
      <Text>Add trip:</Text>
      <Text>Destination Name</Text>
      <Text>Select the dates of your stay</Text>

      <CalendarPicker
        startFromMonday
        allowRangeSelection
        todayBackgroundColor="#f2e6ff"
        selectedDayColor="#7300e6"
        selectedDayTextColor="#FFFFFF"
        onDateChange={onDateChange}
        scaleFactor="800"
      />

      <View>
        <Text>
          SELECTED START DATE:
          {startDate}
        </Text>
        <Text>
          SELECTED END DATE:
          {endDate}
        </Text>
      </View>
      <TextInput
        placeholder="Enter your blog post"
        value={blogPost}
        onChangeText={(blogPost) => setBlog(blogPost)}
        autoCapitalize="none"
      />
      <UploadImage setUrl={setUrl} />
      <TouchableOpacity onPress={handlePress}>
        <Text>Sumbit</Text>
      </TouchableOpacity>
    </View>
  );
}
