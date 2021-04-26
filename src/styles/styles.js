import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  backgroundStyles: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    color: 'white',
    position: 'relative',
  },
  titles: {
    alignSelf: 'center',
    fontSize: 15,
    color: 'white',
    fontFamily: 'Nunito_400Regular',
  },
  text: {
    fontSize: 8,
    color: 'white',
    fontFamily: 'Nunito_400Regular',
  },

  logo: {
    flex: 1,
    height: 50,
    width: 90,
    alignSelf: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
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

  deleteButton: {
    alignSelf: 'center',
    borderRadius: 5,
    backgroundColor: '#ed6a5a',
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

  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },

  paragraphText: {
    fontSize: 10,
    color: 'black',
    fontFamily: 'Lato_400Regular',
  },
});
