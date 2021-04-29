import 'firebase/auth';
import 'firebase/firestore';
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ScrollView, LogBox } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from '../../firebase/config';
import {
  PickImage,
  PickImages,
  Calendar,
  NavBar,
  DestinationDropDown
} from '../../components';
import getDestination from '../../utils/InputDestinationFuncs';
import styles from './styles';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.'
]);
export default function AddDestinationScreen(props) {
  const db = firebase.firestore();
  const [blogPost, setBlog] = useState('');
  const [destination, setDestination] = useState(null);
  const [results, setResults] = useState([]);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedStartDate, setStartDate] = useState(null);
  const [selectedEndDate, setEndDate] = useState(null);
  const [counter, incrementCounter] = useState(1);

  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  const endDate = selectedEndDate ? selectedEndDate.toString() : '';
  const currentUserUID = firebase.auth().currentUser.uid;
  const { route, navigation } = props;
  const { tripUid } = route.params;
  const fetchResults = (textInput) => {
    if (textInput.length > 1) {
      const search = textInput.split(' ').join('+');
      getDestination(search).then((results) => {
        setResults(results);
      });
    }
  };

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setEndDate(date);
    } else {
      setStartDate(date);
      setEndDate(null);
    }
  };

  const handlePress = () => {
    if (!destination) {
      Alert.alert('Destination field is required.');
    } else if (!startDate) {
      Alert.alert('Start Date field is required.');
    } else if (!endDate) {
      Alert.alert('End Date field is required.');
    } else if (!blogPost) {
      Alert.alert('Blog post is required.');
    } else if (!uploadedUrl) {
      Alert.alert('At least one image is required.');
    } else {
      db.collection('trips').doc(tripUid).collection('destinations').add({
        destination,
        user: currentUserUID,
        trip: tripUid,
        blogPost,
        startDate,
        endDate,
        uploadedUrl,
        uploadedUrls
      });
      setBlog('');
      setStartDate('');
      setEndDate('');
      setUploadedUrls([]);
      setUploadedUrl('');
      incrementCounter(1);
      setSuccessMessage('Destination successfully submitted');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <DestinationDropDown
          results={results}
          fetchResults={fetchResults}
          setDestination={setDestination}
          destination={destination}
          counter={counter}
          incrementCounter={incrementCounter}
        />
        <Calendar
          page="destination"
          startDate={startDate}
          endDate={endDate}
          onDateChange={onDateChange}
        />

        <TextInput
          style={styles.input}
          multiline
          numberOfLines={6}
          placeholder="Enter your blog post"
          value={blogPost}
          onChangeText={(blogPost) => setBlog(blogPost)}
          autoCapitalize="none"
        />
        <PickImage uploadedUrl={uploadedUrl} setUploadedUrl={setUploadedUrl} />
        <PickImages
          uploadedUrls={uploadedUrls}
          setUploadedUrls={setUploadedUrls}
        />
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <Text style={styles.successMessage}>{successMessage}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Single Trip', { tripUid });
          }}
        >
          <Text style={styles.buttonText}>Go Back to Trip</Text>
        </TouchableOpacity>
      </ScrollView>
      <NavBar />
    </View>
  );
}
