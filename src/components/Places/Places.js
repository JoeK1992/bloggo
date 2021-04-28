import React from 'react';

import { View, Text, TouchableOpacity, FlatList, Linking } from 'react-native';
import styles from './styles';
export default function Places(props) {
  const { places } = props;

  const Item = ({ title, url, type, post }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{type}</Text>
      <Text style={styles.postTitle}>{title}</Text>
      <Text style={styles.title}>{post}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Linking.openURL(url);
        }}
      >
        <Text style={styles.info}>More info</Text>
      </TouchableOpacity>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item title={item.name} url={item.url} post={item.post} type={item.type} />
  );

  return (
    <View>
      <Text style={styles.mainTitle}>Visited Places</Text>
      <FlatList
        data={places}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}`}
      />
    </View>
  );
}
