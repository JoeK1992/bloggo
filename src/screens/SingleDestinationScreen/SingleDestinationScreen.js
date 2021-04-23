import 'firebase/auth';
import 'firebase/firestore';
import React, { Component } from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from '../../firebase/config';
import s from '../../styles/styles';

export default class SingleDestinationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: {},
      editable: false,
      blogPost: '',
    };
  }

  componentDidMount() {
    const db = firebase.firestore();
    const _this = this;
    const { tripUid, destinationUid } = _this.props.route.params;

    // const currentUserUID = firebase.auth().currentUser.uid;
    // const route = this.props;
    // const { destinationUid } = route.params;
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
                destinations: filteredDestinations,
              });
            });
          },
        },
        {
          text: 'Cancel',
          onPress: () => {
            'cancel';
          },
        },
      ],
      { cancelable: true },
    );
  };

  render() {
    const { navigation, route } = this.props;
    const { destination, blogPost, editable } = this.state;
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
          <Item title={item.destination.formatted} />
        </TouchableOpacity>
      </>
    );

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Single Trip', { tripUid });
          }}
          style={s.button}
        >
          <Text style={s.buttonText}>
            Back to
            {tripName}
            {' '}
            trip!
            {' '}
          </Text>
        </TouchableOpacity>

        <Image style={styles.pic} source={destination.uploadedUrl} />

        <View>
          {destination.destination && (
            <Text>{destination.destination.formatted}</Text>
          )}

          <TextInput
            value={blogPost}
            style={s.paragraphText}
            onChangeText={(blogPost) => this.setState({ blogPost })}
            editable={editable}
          />
          {editable ? (
            <TouchableOpacity onPress={this.editBlogPost} style={s.button}>
              <Text style={s.buttonText}>Submit!</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={this.toggleEditable} style={s.button}>
              <Text style={s.buttonText}>Edit Blog</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={this.deleteDestination} style={s.button}>
            <Text style={s.buttonText}>Delete Destination</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={filteredDestinations}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    // flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  pic: {
    width: 100,
    height: 100,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});