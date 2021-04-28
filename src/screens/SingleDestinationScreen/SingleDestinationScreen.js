import 'firebase/auth';
import 'firebase/firestore';
import React, { Component } from 'react';
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  View,
  ScrollView,
  LogBox
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from '../../firebase/config';
import s from '../../styles/styles';
import ImagesCarousel from '../../components/ImagesCarousel';
import styles from './styles';
import NavBar from '../../components/NavBar';
import Comments from '../../components/Comments';
import AddPlace from '../../components/AddPlace';
import Places from '../../components/Places';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.'
]);

export default class SingleDestinationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: null,
      editable: false,
      blogPost: '',
      openedMenu: false,
      currentUserUID: firebase.auth().currentUser.uid
    };
  }

  componentDidMount() {
    const db = firebase.firestore();
    const _this = this;
    const { tripUid, destinationUid } = _this.props.route.params;

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
        this.setState({ destination, blogPost: destination.blogPost });
      }
    });
  }

  editBlogPost = () => {
    const _this = this;
    const { tripUid, destinationUid } = _this.props.route.params;
    const { blogPost } = this.state;
    const db = firebase.firestore();
    const destinationRef = db
      .collection('trips')
      .doc(tripUid)
      .collection('destinations')
      .doc(destinationUid);
    destinationRef.update({ blogPost }).then(() => {
      this.setState({ editable: false });
    });
  };

  toggleEditable = () => {
    this.setState({ editable: true });
  };

  openMenu = (boolean) => {
    this.setState({ openedMenu: boolean });
  };

  deleteDestination = () => {
    const _this = this;
    const { tripUid, destinationUid, destinations } = _this.props.route.params;
    const { navigation } = _this.props;

    const filteredDestinations = destinations.filter((destination) => {
      return destination.id !== destinationUid;
    });

    Alert.alert(
      'Delete',
      'Are you sure you want to delete your destination post?',
      [
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
                destinations: filteredDestinations
              });
            });
          }
        },
        {
          text: 'Cancel',
          onPress: () => {
            'cancel';
          }
        }
      ],
      { cancelable: true }
    );
  };

  render() {
    const { navigation, route } = this.props;
    const {
      destination,
      blogPost,
      editable,
      openedMenu,
      places,
      currentUserUID
    } = this.state;
    const { destinations, tripUid, destinationUid, tripName } = route.params;
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
              tripName
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
        <AddPlace tripUid={tripUid} destinationUid={destinationUid} />

        <TextInput
          value={blogPost}
          multiline
          style={[editable ? styles.input : styles.blogText]}
          onChangeText={(blogPost) => this.setState({ blogPost })}
          editable={editable}
        />
        {destination && destination.user === currentUserUID && (
          <>
            {editable ? (
              <TouchableOpacity onPress={this.editBlogPost} style={s.button}>
                <Text style={s.buttonText}>Submit!</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={this.toggleEditable} style={s.button}>
                <Text style={s.buttonText}>Edit Blog</Text>
              </TouchableOpacity>
            )}
          </>
        )}
        <Places
          places={places}
          tripUid={tripUid}
          destinationUid={destinationUid}
        />
        {destination && (
          <Comments destinationUid={destination.id} tripUid={tripUid} />
        )}

        {destination && destination.user === currentUserUID && (
          <TouchableOpacity
            onPress={this.deleteDestination}
            style={s.deleteButton}
          >
            <Text style={s.buttonText}>Delete Destination</Text>
          </TouchableOpacity>
        )}
        <NavBar />
      </View>
    );

    const ExploreBtn = () => (
      <TouchableOpacity
        style={s.button}
        onPress={() => {
          this.openMenu(true);
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
                    Back to {tripName} trip!
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
      </View>
    );
  }
}
