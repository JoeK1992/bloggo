import 'firebase/auth';
import 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import {
  Alert, Text, TextInput, View, ScrollView, LogBox,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from '../../firebase/config';
import {
  ImagesCarousel,
  NavBar,
  Comments,
  AddPlace,
  Places,
} from '../../components';
import s from '../../styles/styles';
import styles from './styles';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.',
]);

export default function SingleDestinationScreen(props) {
  const [destination, setDestination] = useState(null);
  const [editable, setEditable] = useState(false);
  const [blogPost, setBlogPost] = useState('');
  const [places, setPlaces] = useState([]);
  const currentUserUID = firebase.auth().currentUser.uid;

  useEffect(() => {
    const db = firebase.firestore();
    const { tripUid, destinationUid } = props.route.params;
    const placesRef = db
      .collection('trips')
      .doc(tripUid)
      .collection('destinations')
      .doc(destinationUid)
      .collection('places');

    placesRef.onSnapshot((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents.');
      } else {
        const newPlaces = [];
        snapshot.forEach((doc) => {
          const place = doc.data();
          place.id = doc.id;
          newPlaces.push(place);
        });
        setPlaces(newPlaces);
      }
    });
    const destinationRef = db
      .collection('trips')
      .doc(tripUid)
      .collection('destinations')
      .doc(destinationUid);

    destinationRef.get().then((doc) => {
      if (!doc.exists) {
        console.log('No such document');
      } else {
        const destination = doc.data();
        destination.id = doc.id;
        setDestination(destination);
        setBlogPost(destination.blogPost);
      }
    });
  }, []);

  const editBlogPost = () => {
    const { tripUid, destinationUid } = props.route.params;
    const db = firebase.firestore();
    const destinationRef = db
      .collection('trips')
      .doc(tripUid)
      .collection('destinations')
      .doc(destinationUid);
    destinationRef.update({ blogPost }).then(() => {
      setEditable(false);
    });
  };

  const toggleEditable = () => {
    setEditable(true);
  };

  const deleteDestination = () => {
    const { tripUid, destinationUid, destinations } = props.route.params;
    const { navigation } = props;

    const filteredDestinations = destinations.filter((destination) => {
      return destination.id !== destinationUid;
    });

    Alert.alert(
      'Delete',
      'Are you sure you want to delete your destination post?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            'cancel';
          },
        },
        {
          text: 'Confirm',
          onPress: () => {
            const db = firebase.firestore();
            const destinationRef = db
              .collection('trips')
              .doc(tripUid)
              .collection('destinations')
              .doc(destinationUid);
            destinationRef.delete().then(() => {
              navigation.replace('Single Trip', {
                tripUid,
                destinations: filteredDestinations,
              });
            });
          },
        },
      ],
      { cancelable: true },
    );
  };

  const { navigation, route } = props;

  const { tripUid, destinationUid, tripName } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.titleContainer}>
          {destination && destination.destination && (
            <>
              <Text style={styles.title}>
                {destination.destination.formatted}
              </Text>
              <>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Single Trip', { tripUid });
                  }}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>
                    Back to
                    {tripName}
                    {' '}
                    trip!
                  </Text>
                </TouchableOpacity>
              </>
            </>
          )}
        </View>

        <View style={styles.container}>
          <View style={styles.carouselContainer}>
            {destination && <ImagesCarousel destination={destination} />}
          </View>
        </View>
        <View style={styles.container}>
          {destination && destination.user === currentUserUID && (
            <AddPlace tripUid={tripUid} destinationUid={destinationUid} />
          )}

          <TextInput
            value={blogPost}
            multiline
            style={[editable ? styles.input : styles.blogText]}
            onChangeText={(blogPost) => setBlogPost(blogPost)}
            editable={editable}
          />
          {destination && destination.user === currentUserUID && (
            <>
              {editable ? (
                <TouchableOpacity onPress={editBlogPost} style={s.button}>
                  <Text style={s.buttonText}>Submit!</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={toggleEditable} style={s.button}>
                  <Text style={s.buttonText}>Edit Blog</Text>
                </TouchableOpacity>
              )}
            </>
          )}
          <Places
            places={places}
            triUid={tripUid}
            destinationUid={destinationUid}
            setPlaces={setPlaces}
          />
          {destination && (
            <Comments destinationUid={destination.id} tripUid={tripUid} />
          )}

          {destination && destination.user === currentUserUID && (
            <TouchableOpacity
              onPress={deleteDestination}
              style={s.deleteButton}
            >
              <Text style={s.buttonText}>Delete Destination</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <NavBar />
    </View>
  );
}
