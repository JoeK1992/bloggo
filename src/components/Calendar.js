import React, { useState } from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from '../screens/AddDestinationScreen/styles';

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
            style={styles.closeButton}
            onPress={() => {
              setCalendar(false);
            }}
          >
            <FontAwesomeIcon icon={faTimes} size={30} style={styles.logo} />
          </TouchableOpacity>
          <View style={styles.calendar}>
            <CalendarPicker
              startFromMonday
              allowRangeSelection
              todayBackgroundColor="#34A0A4"
              selectedDayColor="#1E6091"
              selectedDayTextColor="#FFFFFF"
              onDateChange={onDateChange}
              scrollable="true"
            />
          </View>
        </>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setCalendar(true);
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
      )}
      <View>
        <Text style={styles.titles}>
          Start Date:
          {' '}
          {startDate ? moment(startDate).format('MMM Do YYYY') : ''}
        </Text>
        <Text style={styles.titles}>
          End Date:
          {' '}
          {endDate ? moment(endDate).format('MMM Do YYYY') : ''}
        </Text>
      </View>
    </View>
  );
}
