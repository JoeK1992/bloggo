import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#113755',
    color: '#f9fced',
  },
  titles: {
    alignSelf: 'center',
    fontSize: 15,
    color: 'white',
    fontFamily: 'Nunito_400Regular',
    paddingVertical: 10,
  },

  input: {
    width: 300,
    height: 100,
    borderRadius: 5,
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },

  button: {
    alignSelf: 'center',
    borderRadius: 5,
    backgroundColor: '#52b69a',
    justifyContent: 'center',
    margin: 2,
    width: 90,
    padding: 10,
    minWidth: 300,
    marginVertical: 7,
    alignItems: 'center',
    textAlign: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
  },

  calendar: {
    backgroundColor: 'white',
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    color: '#e63946',
    marginLeft: 20,
    marginVertical: 5,
  },
  closeButton: {
    backgroundColor: 'white',
    borderTopEndRadius: 5,
    borderTopStartRadius: 5,
  },
  successMessage: {
    color: '#f9fced',
  },
});
