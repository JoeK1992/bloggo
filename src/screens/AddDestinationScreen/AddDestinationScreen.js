import 'firebase/auth';
import 'firebase/firestore';
import React, { useState } from 'react';
import {
  Alert, Text, TextInput, View,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DestinationInputBar from '../../components/DestinationInputBar';
import UploadImage from '../../components/UploadImage';
import firebase from '../../firebase/config';
import getDestination from '../../utils/InputDestinationFuncs';

export default function AddDestinationScreen(props) {
  const db = firebase.firestore();
  const [blogPost, setBlog] = useState('');

  const currentUserUID = firebase.auth().currentUser.uid;
  const [uploadedUrl, setUrl] = useState(null);
  const [destination, setDestination] = useState({ formatted: '' });
  const [results, setResults] = useState([]);
  const [destinationInput, setDestinationInput] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  console.log(destination.formatted);
  const addDestination = (results, selectedId) => {
    for (let i = 0; i < results.length; i += 1) {
      if (selectedId === results[i].annotations.MGRS) {
        setDestination(results[i]);
        setResults([]);
        setDestinationInput('');
      }
    }
  };

  React.useEffect(() => {
    if (selectedId) {
      addDestination(results, selectedId);
    }
    if (destinationInput.length > 1) {
      const search = destinationInput.split(' ').join('+');
      getDestination(search).then((results) => {
        setResults(results);
      });
    }
  });

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
    const { route } = props;
    console.log(props);
    console.log(route);
    const { tripUid } = route.params;
    if (!startDate) {
      Alert.alert('Start Date field is required.');
    }
    if (!endDate) {
      Alert.alert('End Date field is required.');
    }

    db.collection('trips').doc(tripUid).collection('destinations').add({
      destination,
      user: currentUserUID,
      trip: tripUid,
      blogPost,
      startDate,
      endDate,
      uploadedUrl,
    });
    setBlog('');
    setStartDate('');
    setEndDate('');
  };
  return (
    <View>
      <DestinationInputBar
        setDestination={setDestination}
        destination={destination}
        results={results}
        destinationInput={destinationInput}
        setDestinationInput={setDestinationInput}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
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
        multiline
        numberOfLines={6}
        placeholder="Enter your blog post"
        value={blogPost}
        onChangeText={(blogPost) => setBlog(blogPost)}
        autoCapitalize="none"
      />
      <UploadImage setUrl={setUrl} />
      <TouchableOpacity onPress={handlePress}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
