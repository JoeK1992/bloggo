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
    fontSize: 10,
    color: 'white',
    fontFamily: 'Nunito',
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
    height: 47,
    borderRadius: 5,
    backgroundColor: '#788eec',
    width: 80,
    justifyContent: 'center',
    margin: 2,
  },

  buttonDisabled: {
    height: 47,
    borderRadius: 5,
    backgroundColor: '#567eed',
    width: 80,
    justifyContent: 'center',
    margin: 2,
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
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  paragraphText: {
    fontSize: 10,
    color: 'black',
    fontFamily: 'Nunito',
  },
});
