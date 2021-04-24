import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
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

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };

  const renderItem = ({ item }) => {
    const backgroundColor = item.annotations.MGRS === selectedId ? '#1e6091' : 'white';
    const color = item.annotations.MGRS === selectedId ? 'white' : '#1e6091';
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
    <View style={styles.container}>
      <TextInput
        placeholder="Enter your destination"
        // value={props.destination.formatted}
        editable
        onChangeText={(textInput) => props.setDestinationInput(textInput)}
        style={styles.input}
      />
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => item.annotations.MGRS}
        extraData={selectedId}
        style={styles.list}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 15,
  },
  input: {
    marginTop: 10,
    padding: 10,
    width: 300,
    backgroundColor: 'white',
    borderRadius: 5,
  },
});
