import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#113755',
  },
  item: {
    backgroundColor: '#1a759f',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    color: '#F9FCED',
    textAlign: 'center',
    fontFamily: 'Nunito_600SemiBold',
  },
  dates: {
    fontSize: 15,
    color: '#F9FCED',
    textAlign: 'center',
    fontFamily: 'Nunito_400Regular',
  },

  sortBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  sortText: {
    fontSize: 15,
    color: 'white',
    marginLeft: 10,
    fontFamily: 'Nunito_600SemiBold',
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  headTitle: {
    paddingBottom: 10,
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Nunito_600SemiBold',
  },

  userName: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Nunito_600SemiBold',
  },
  sortBy: {
    fontSize: 15,
    fontFamily: 'Nunito_600SemiBold',
    color: 'white',
  },
});
