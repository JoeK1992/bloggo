import React, { Component } from 'react';

import { View } from 'react-native';
import firebase from '../../firebase/config';
import 'firebase/firestore';
import 'firebase/auth';

export default class DestinationScreen extends Component {
  state = {
    destination: {},
  };

  componentDidMount() {
    const db = firebase.firestore();
    // const currentUserUID = firebase.auth().currentUser.uid;
    const route = this.props;
    const { destinationUid } = route.params;
    const destinationRef = db.collection('destinations').doc(destinationUid);
    destinationRef.get().then((doc) => {
      if (!doc.exists) {
        console.log('No such document');
      } else {
        this.setState({ destination: doc.data() });
      }
    });
  }

  render() {
    return <View />;
  }
}
