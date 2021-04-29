import React, { Fragment } from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';

export default function DestinationDropDown(props) {
  const {
    results, fetchResults, setDestination, destination,
  } = props;
  const resultsType = results.map((destination, index) => {
    return { name: destination.formatted, id: index };
  });
  const whichPlaceholder = destination
    ? destination.formatted
    : 'Enter the name of your destination';

  return (
    <>
      <SearchableDropdown
        containerStyle={{ padding: 5 }}
        onItemSelect={(item) => {
          setDestination(results[item.id]);
        }}
        onRemoveItem={() => {
          setDestination('');
        }}
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: '#fff',
          borderRadius: 5,
          color: '#113755',
          width: 300,
          alignSelf: 'center',
        }}
        itemTextStyle={{ color: '#113755' }}
        itemsContainerStyle={{ maxHeight: 140 }}
        items={resultsType}
        defaultIndex={2}
        resetValue={false}
        textInputProps={{
          placeholder: whichPlaceholder,
          underlineColorAndroid: 'transparent',
          style: {
            backgroundColor: '#fff',
            padding: 12,
            borderWidth: 1,
            borderColor: '#fff',
            borderRadius: 5,
            color: '#113755',
            width: 300,
            alignSelf: 'center',
          },
          onTextChange: (textInput) => {
            fetchResults(textInput);
          },
        }}
        listProps={{
          nestedScrollEnabled: true,
        }}
      />
    </>
  );
}
