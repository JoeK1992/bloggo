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
    marginVertical: 10,
    textAlign: 'center'
  },
  summary: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Nunito_600SemiBold',
    alignSelf: 'center',
    marginVertical: 10,
    textAlign: 'center'
  },
  item: {
    borderRadius: 5,
    marginVertical: 10
  },
  itemContainer: {
    borderRadius: 5,
    width: 300,
    alignSelf: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontFamily: 'Nunito_600SemiBold',
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center'
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
    alignItems: 'center',
    width: 300
  },
  page: {
    backgroundColor: '#1E6091'
  }
});

export default styles;
