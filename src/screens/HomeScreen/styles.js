import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#113755',
    position: 'relative',
  },
  logoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingTop: 10,
  },

  logoImage: {
    width: 157,
    height: 35,
    marginLeft: 5,
  },
  button: {
    alignSelf: 'center',
    borderRadius: 5,
    backgroundColor: '#52b69a',
    justifyContent: 'center',
    margin: 2,
    padding: 10,
    marginVertical: 7,
    alignItems: 'center',
    textAlign: 'center',
    width: 200,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    borderRadius: 5,
    height: '100%',
  },
});
