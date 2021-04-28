import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0
  },

  stats: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Nunito_600SemiBold',
    alignSelf: 'center',
    marginVertical: 10
  },
  item: {
    borderRadius: 5,

    justifyContent: 'center',
    textAlign: 'center',

    // backgroundColor: "#f9c2ff",
    // padding: 20,
    // marginVertical: 8,
    // marginHorizontal: 16,
    // zIndex: 15,

    marginVertical: 10
  },
  itemContainer: {
    borderRadius: 5,
    width: 300,

    alignSelf: 'center'
  },
  title: {
    fontSize: 20,
    fontFamily: 'Nunito_600SemiBold',
    color: 'white',
    alignSelf: 'center'
  },
  mapDisplay: {
    height: 500,
    width: 500
  },
  image: {
    borderRadius: 5,
    height: 80,

    display: 'flex',
    marginVertical: 10,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  page: {
    backgroundColor: '#1E6091',
    height: 580
  }
});

export default styles;
