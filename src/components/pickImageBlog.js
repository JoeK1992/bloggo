// import React, { useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Platform,
//   StyleSheet,
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
// import addDesStyles from '../screens/AddDestinationScreen/styles';

// export default function PickImage(props) {
//   const chooseImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//       base64: true,
//     });

//     if (!result.cancelled) {
//       const base64Img = Platform.OS === 'web'
//         ? result.uri
//         : `data:image/jpg;base64,${result.base64}`;

//       const apiUrl = 'https://api.cloudinary.com/v1_1/ddxr0zldw/image/upload';
//       console.log('in here');
//       const data = {
//         file: base64Img,
//         upload_preset: 'eqvu0yhl',
//       };
//       fetch(apiUrl, {
//         body: JSON.stringify(data),
//         headers: {
//           'content-type': 'application/json',
//         },
//         method: 'POST',
//       })
//         .then(async (r) => {
//           const data = await r.json();
//           props.setUploadedUrl(data.secure_url);
//           db.collection('trips')
//             .doc(tripUid)
//             .collection('destinations')
//             .doc(destinationUid)
//             .update({
//               destination,
//               user: currentUserUID,
//               trip: tripUid,
//               blogPost,
//               startDate,
//               endDate,
//               uploadedUrl,
//               uploadedUrls,
//             });

//           console.log(data.secure_url);
//           return data.secure_url;
//         })
//         .catch((err) => console.log(err));
//     }
//   };
//   const { uploadedUrl, setUploadedUrl } = props;
//   return (
//     <View>
//       <TouchableOpacity style={addDesStyles.button} onPress={chooseImage}>
//         <FontAwesomeIcon icon={faPlus} style={styles.logo} size={30} />
//       </TouchableOpacity>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: '#34a0a4',
//     padding: 10,
//     marginVertical: 8,
//     marginHorizontal: 16,
//     borderRadius: 5,
//     width: 300,
//     alignSelf: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 15,
//     fontFamily: 'Nunito_400Regular',
//     color: 'white',
//   },
// });
