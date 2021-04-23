import 'firebase/auth';
import 'firebase/firestore';
import React, { useState } from 'react';
import {
  View, Text, TextInput, Alert,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DestinationInputBar from '../../components/DestinationInputBar';
import firebase from '../../firebase/config';
import getDestination from '../../utils/InputDestinationFuncs';
import PickImage from '../../components/PickImage';
import PickImages from '../../components/PickImages';
import Calendar from '../../components/Calendar';

export default function AddDestinationScreen(props) {
  const db = firebase.firestore();
  const [blogPost, setBlog] = useState('');

  const currentUserUID = firebase.auth().currentUser.uid;
  const [uploadedUrl, setUrl] = useState(null);
  const [uploadedUrls, setUrls] = useState([]);
  const [destination, setDestination] = useState({ formatted: '' });
  const [results, setResults] = useState([]);
  const [destinationInput, setDestinationInput] = useState('');
  const [selectedId, setSelectedId] = useState(null);
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
    if (destinationInput.length > 6) {
      const search = destinationInput.split(' ').join('+');
      getDestination(search).then((results) => {
        setResults(results.slice(0, 3));
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
    const { tripUid } = route.params;
    if (!destination.formatted) {
      Alert.alert('Destination field is required.');
    } else if (!startDate) {
      Alert.alert('Start Date field is required.');
    } else if (!endDate) {
      Alert.alert('End Date field is required.');
    } else if (!blogPost) {
      Alert.alert('Blog post is required.');
    } else if (!uploadedUrl) {
      Alert.alert('Cover image is required.');
    } else {
      db.collection('trips').doc(tripUid).collection('destinations').add({
        destination,
        user: currentUserUID,
        trip: tripUid,
        blogPost,
        startDate,
        endDate,
        uploadedUrl,
        uploadedUrls,
      });
      setBlog('');
      setStartDate('');
      setEndDate('');
    }
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
      <Calendar
        page="destination"
        startDate={startDate}
        endDate={endDate}
        onDateChange={onDateChange}
      />
      <TextInput
        multiline
        numberOfLines={6}
        placeholder="Enter your blog post"
        value={blogPost}
        onChangeText={(blogPost) => setBlog(blogPost)}
        autoCapitalize="none"
      />

      <PickImage uploadedUrl={uploadedUrl} setUrl={setUrl} />
      {/* <PickImages uploadedUrls={uploadedUrls} setUrls={setUrls} /> */}

      <PickImages uploadedUrls={uploadedUrls} setUrls={setUrls} />

      <TouchableOpacity onPress={handlePress}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
