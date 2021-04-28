import 'firebase/auth';
import 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  View,
  ScrollView,
  LogBox,
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
  const [openedMenu, setOpenedMenu] = useState(false);
  const [places, setPlaces] = useState([]);
  // const [loading, setLoading] = setState(false);
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
          console.log(place);
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
        // setLoading(false);
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

  const openMenu = (boolean) => {
    setOpenedMenu(boolean);
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

  const {
    destinations, tripUid, destinationUid, tripName,
  } = route.params;
  const filteredDestinations = destinations.filter((destination) => {
    return destination.id !== destinationUid;
  });
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.replace('Single Destination', {
            destinationUid: item.id,
            tripUid,
            destinations,
            tripName,
          });
        }}
      >
        <Item title={item.destination.formatted.split(',')[0]} />
      </TouchableOpacity>
    </>
  );

  const Header = () => (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        {destination && <ImagesCarousel destination={destination} />}
      </View>
    </View>
  );

  const Footer = () => (
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
        <TouchableOpacity onPress={deleteDestination} style={s.deleteButton}>
          <Text style={s.buttonText}>Delete Destination</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const ExploreBtn = () => (
    <TouchableOpacity
      style={s.button}
      onPress={() => {
        openMenu(true);
      }}
    >
      <Text style={s.buttonText}>Explore trip</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
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
      {!openedMenu ? (
        <ScrollView>
          <Header />
          {filteredDestinations.length > 1 && <ExploreBtn />}
          <Footer />
        </ScrollView>
      ) : (
        <FlatList
          ListHeaderComponent={<Header />}
          data={filteredDestinations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.listContainer}
          ListFooterComponent={<Footer />}
        />
      )}

      <View>
        <NavBar />
      </View>
    </View>
  );
}
