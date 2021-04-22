import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

export default function DestinationInputBar(props) {
  const Item = ({
    item, onPress, backgroundColor, textColor,
  }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.formatted}</Text>
    </TouchableOpacity>
  );
  const { results, selectedId } = props;
  const renderItem = ({ item }) => {
    const backgroundColor = item.annotations.MGRS === selectedId ? '#6E3B6E' : '#F9C2FF';
    const color = item.annotations.MGRS === selectedId ? 'white' : 'black';
    return (
      <Item
        item={item}
        onPress={() => props.setSelectedId(item.annotations.MGRS)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };
  return (
    <View>
      <TextInput
        placeholder="Enter your destination"
        // value={props.destination.formatted}
        editable
        onChangeText={(textInput) => props.setDestinationInput(textInput)}
      />
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => item.annotations.MGRS}
        extraData={selectedId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 15,
  },
});
