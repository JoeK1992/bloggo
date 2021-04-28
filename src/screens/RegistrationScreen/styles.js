import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logoContainer: {
    alignSelf: 'flex-start',
    top: 0,
    left: 0,
    paddingTop: 10,
  },

  logoImage: {
    width: 157,
    height: 35,
    marginLeft: 5,
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
  button: {
    backgroundColor: '#52b69a',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: 'white',
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
  },
  footerView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#2e2e2d',
    fontFamily: 'Nunito_400Regular',
  },
  footerLink: {
    color: '#52b69a',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
