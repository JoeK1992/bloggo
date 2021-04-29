import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  userScreen: {
    backgroundColor: '#113755',
    flex: 1,
  },
  gamificationTitle: {
    fontSize: 20,
    textAlign: 'center',
    color: '#113755',
    paddingVertical: 5,
    fontFamily: 'Nunito_600SemiBold',
  },
  gamificationStat: {
    fontSize: 15,
    textAlign: 'center',
    color: '#113755',
    padding: 2,
    marginBottom: 5,
    fontFamily: 'Nunito_600SemiBold',
  },
  gamificationFlags: {
    fontSize: 15,
    textAlign: 'center',
    marginHorizontal: 40,
    letterSpacing: 8,
  },

  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },

  flagBackground: {
    width: 370,
    height: 150,
    margin: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  flagText: {
    fontSize: 35,
    textAlign: 'center',
  },
  statsCardContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statsCard: {
    height: 100,
    width: 150,
    marginVertical: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  statsCardText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    width: 150,
    fontFamily: 'Nunito_600SemiBold',
  },
  mapDisplay: {
    height: 300,
    width: '100%',
    margin: 'auto',
    left: 25,
  },

  btn: {
    color: '#E8F3B9',
    borderRadius: 5,
    backgroundColor: '#34A0A4',
    textAlign: 'center',
    width: 120,
    padding: 10,
    fontFamily: 'Nunito_600SemiBold',
  },
  btnContainer: {
    alignItems: 'center',
    margin: 10,
  },
  text: {
    fontSize: 17,
    color: 'white',
    borderRadius: 3,
    textAlign: 'center',
    paddingVertical: 2,
    fontFamily: 'Nunito_600SemiBold',
  },
  gamificationContainer: {
    borderRadius: 10,
    backgroundColor: '#D4EDE2',
    textAlign: 'center',
    paddingVertical: 2,
  },
});

export default styles;
