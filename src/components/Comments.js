import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, FlatList,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import firebase from '../firebase/config';

export default function Comments(props) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const { tripUid, destinationUid } = props;
  const currentUserUID = firebase.auth().currentUser.uid;

  useEffect(() => {
    const db = firebase.firestore();
    const commentsRef = db
      .collection('trips')
      .doc(tripUid)
      .collection('destinations')
      .doc(destinationUid)
      .collection('comments');

    commentsRef.onSnapshot((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents.');
      } else {
        const newComments = [];
        snapshot.forEach((doc) => {
          const comment = doc.data();
          console.log(doc.id);
          comment.id = doc.id;
          newComments.push(comment);
        });

        setComments(newComments);
      }
    });
  }, []);

  const handlePress = () => {
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(currentUserUID);
    setComment('');

    userRef
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return 'No such user';
        }
        const userInfo = doc.data();
        const userName = `${userInfo.firstName} ${userInfo.lastName}`;
        return userName;
      })
      .then((userName) => {
        const commentsRef = db
          .collection('trips')
          .doc(tripUid)
          .collection('destinations')
          .doc(destinationUid)
          .collection('comments');
        commentsRef
          .add({
            comment,
            userName,
            date: new Date().toUTCString(),
            user: currentUserUID,
          })

          .catch((err) => {
            console.log(err);
          });
      });
  };

  const deleteComment = (id) => {
    const db = firebase.firestore();
    const filteredComments = comments.filter((comment) => {
      return comment.id !== id;
    });
    setComments(filteredComments);

    const commentRef = db
      .collection('trips')
      .doc(tripUid)
      .collection('destinations')
      .doc(destinationUid)
      .collection('comments')
      .doc(id);
    commentRef.delete();
  };
  const Item = ({
    comment, date, userName, user, id,
  }) => (
    <View style={styles.item}>
      <Text style={styles.comment}>{comment}</Text>
      <Text style={styles.comment}>
        Posted by
        {' '}
        {userName}
        {' '}
        on
        {' '}
        {date.slice(0, 16)}
      </Text>
      {user === currentUserUID && (
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => {
            deleteComment(id);
          }}
        >
          <FontAwesomeIcon style={styles.deleteIcon} icon={faTimes} size={30} />
        </TouchableOpacity>
      )}
    </View>
  );

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: 300,
          alignSelf: 'center',
          marginVertical: 10,
          backgroundColor: 'white',
        }}
      />
    );
  };

  const renderItem = ({ item }) => (
    <>
      <Item
        comment={item.comment}
        date={item.date}
        userName={item.userName}
        user={item.user}
        id={item.id}
      />
    </>
  );

  return (
    <View>
      <Text style={styles.title}>Comments</Text>

      <TextInput
        style={styles.input}
        placeholder="Type your comment"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setComment(text)}
        value={comment}
        multiline
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      {comment.length > 1 ? (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.buttonDisabled} onPress={handlePress}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={comments}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}`}
        style={styles.listContainer}
        ItemSeparatorComponent={FlatListItemSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 30,
  },
  item: {
    width: 300,
    alignSelf: 'center',
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  title: {
    paddingTop: 30,
    color: '#52b69a',
    textAlign: 'center',
    paddingVertical: 2,
    fontSize: 16,
    fontFamily: 'Nunito_600SemiBold',
  },
  comment: {
    color: 'white',
    textAlign: 'center',
    paddingVertical: 2,
    fontSize: 14,
    fontFamily: 'Lato_400Regular',
  },
  button: {
    alignSelf: 'center',
    borderRadius: 5,
    backgroundColor: '#52b69a',
    justifyContent: 'center',
    margin: 2,
    width: 90,
    padding: 10,
    minWidth: 300,
    marginVertical: 7,
    alignItems: 'center',
    textAlign: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
  },

  buttonDisabled: {
    height: 47,
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: '#B7E1D5',
    width: 300,
    justifyContent: 'center',
    margin: 2,
    minWidth: 200,
    alignItems: 'center',
  },
  deleteBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  deleteIcon: {
    color: '#ed6a5a',
    fontSize: 12,
  },
});
