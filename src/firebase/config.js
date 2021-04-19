import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA86K3U0je37P4tJiUc2GC7TfW3pnXWBsA',
  authDomain: 'bloggo-6cda0.firebaseapp.com',
  databaseURL:
    'https://bloggo-6cda0-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'bloggo-6cda0',
  storageBucket: 'bloggo-6cda0.appspot.com',
  messagingSenderId: '808236892039',
  appId: '1:808236892039:android:dc66e184ad26a67c431d22',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
