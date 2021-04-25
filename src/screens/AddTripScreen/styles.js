import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#113755',
    color: '#f9fced',
  },
  title: {},

  input: {
    width: 300,
    height: 48,
    borderRadius: 5,
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  button: {
    borderRadius: 5,
    backgroundColor: '#52b69a',
    justifyContent: 'center',
    width: 300,
    margin: 2,
    padding: 10,
    minWidth: 200,
    marginVertical: 7,
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center',
  },

  buttonDisabled: {
    height: 47,
    borderRadius: 5,
    alignSelf: 'center',

    backgroundColor: '#B7E1D5',
    width: 300,
    justifyContent: 'center',
    margin: 2,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  calendar: {
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successMessage: {
    color: '#f9fced',
  },
});
