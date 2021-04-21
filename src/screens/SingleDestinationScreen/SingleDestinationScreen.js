import 'firebase/auth';
import 'firebase/firestore';
import React, { Component } from 'react';
import {
  Image, StyleSheet, Text, TextInput, View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from '../../firebase/config';

export default class SingleDestinationScreen extends Component {
  state = {
    destination: {},
    editable: false,
    blogPost: '',
  };

  componentDidMount() {
    const db = firebase.firestore();
    // const currentUserUID = firebase.auth().currentUser.uid;
    // const route = this.props;
    // const { destinationUid } = route.params;
    const destinationRef = db
      .collection('trips')
      .doc('RpfkWvOyVXctYX7vR9hl')
      .collection('destinations')
      .doc('7HctWLfZLxs8avPRomuP');
    destinationRef.get().then((doc) => {
      if (!doc.exists) {
        console.log('No such document');
      } else {
        const destination = doc.data();
        this.setState({ destination, blogPost: destination.blogPost });
      }
    });
  }

  editBlogPost = (blogPost) => {
    this.setState({ blogPost });
    const db = firebase.firestore();
    const destinationRef = db
      .collection('trips')
      .doc('RpfkWvOyVXctYX7vR9hl')
      .collection('destinations')
      .doc('7HctWLfZLxs8avPRomuP');
    destinationRef.update({ blogPost }).then();
  };

  toggleEditable = () => {
    this.setState({ editable: true });
  };

  render() {
    const { destination, blogPost, editable } = this.state;
    const { editBlogPost, toggleEditable } = this.props;
    console.log(destination);
    if (destination.destination) {
      console.log(destination.destination.annotations);
    }
    return (
      <View style={styles.container}>
        <Image style={styles.pic} source={destination.uploadedUrl} />

        <View>
          {destination.destination && (
            <Text>{destination.destination.formatted}</Text>
          )}

          <TextInput
            value={blogPost}
            onChangeText={(blogPost) => this.setState({ blogPost })}
            editable={editable}
          />
          {editable ? (
            <TouchableOpacity onPress={editBlogPost}>
              <Text>Submit!</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={toggleEditable}>
              <Text>Edit Blog</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  pic: {
    width: 100,
    height: 100,
  },
});
