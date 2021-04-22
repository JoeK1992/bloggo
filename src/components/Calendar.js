import React, { useState } from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';

export default function Calendar(props) {
  const { page, startDate, endDate, onDateChange } = props;
  const [calendarPressed, setCalendar] = useState(false);
  let text;
  if (page === 'trip') {
    text = 'Select the dates of your trip';
  } else {
    text = 'Select the dates of your stay';
  }
  return (
    <View>
      {calendarPressed ? (
        <>
          <TouchableOpacity
            onPress={() => {
              setCalendar(false);
            }}
          >
            <Text>X</Text>
          </TouchableOpacity>
          <CalendarPicker
            startFromMonday
            allowRangeSelection
            todayBackgroundColor="#f2e6ff"
            selectedDayColor="#7300e6"
            selectedDayTextColor="#FFFFFF"
            onDateChange={onDateChange}
            scaleFactor="700"
          />
        </>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setCalendar(true);
          }}
        >
          <Text>{text}</Text>
        </TouchableOpacity>
      )}
      <View>
        <Text>
          Select Start Date:
          {startDate ? moment(startDate).format('MMM Do YYYY') : ''}
        </Text>
        <Text>
          Select End Date:
          {endDate ? moment(endDate).format('MMM Do YYYY') : ''}
        </Text>
      </View>
    </View>
  );
}
