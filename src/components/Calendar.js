import React, { useState } from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import s from '../styles/styles';
import styles from '../screens/AddTripScreen/styles';

export default function Calendar(props) {
  const {
    page, startDate, endDate, onDateChange,
  } = props;
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
            style={s.button}
          >
            <Text>X</Text>
          </TouchableOpacity>
          <View style={styles.calendar}>
            <CalendarPicker
              startFromMonday
              allowRangeSelection
              todayBackgroundColor="#34A0A4"
              selectedDayColor="#1E6091"
              selectedDayTextColor="#FFFFFF"
              onDateChange={onDateChange}
              scaleFactor="600"
              scrollable="true"
            />
          </View>
        </>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setCalendar(true);
          }}
          style={s.button}
        >
          <Text style={s.buttonText}>{text}</Text>
        </TouchableOpacity>
      )}
      <View>
        <Text>
          Start Date:
          {startDate ? moment(startDate).format('MMM Do YYYY') : ''}
        </Text>
        <Text>
          End Date:
          {endDate ? moment(endDate).format('MMM Do YYYY') : ''}
        </Text>
      </View>
    </View>
  );
}
