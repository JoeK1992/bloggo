import 'firebase/auth';
import 'firebase/firestore';
import React, { useState } from 'react';
import {
  View, Text, TextInput, Alert,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import DestinationInputBar from '../../components/DestinationInputBar';
import firebase from '../../firebase/config';
import getDestination from '../../utils/InputDestinationFuncs';
import PickImages from '../../components/PickImages';
import Calendar from '../../components/Calendar';
import styles from './styles';
import PickImage from '../../components/PickImage';
import NavBar from '../../components/NavBar';
import DestinationDropDown from '../../components/DestinationDropDown';

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
  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  const endDate = selectedEndDate ? selectedEndDate.toString() : '';
  const currentUserUID = firebase.auth().currentUser.uid;

  const fetchResults = (textInput) => {
    if (textInput.length > 0) {
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
    } else if (uploadedUrls.length < 1) {
      Alert.alert('At least one image is required.');
    } else {
      db.collection('trips').doc(tripUid).collection('destinations').add({
        destination,
        user: currentUserUID,
        trip: tripUid,
        blogPost,
        startDate,
        endDate,
        uploadedUrls,
      });
      setBlog('');
      setStartDate('');
      setEndDate('');
      setUploadedUrls([]);
      setSuccessMessage('Destination successfully submitted');
    }
  };

  return (
    <View style={styles.container}>
      <DestinationDropDown
        results={results}
        fetchResults={fetchResults}
        setDestination={setDestination}
        destination={destination}
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
      <NavBar />
    </View>
  );
}
