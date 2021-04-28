import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: '#113755',
    flex: 1,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  pic: {
    width: 100,
    height: 100,
  },
  listContainer: {
    backgroundColor: '#52B69A',
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
  },

  carouselContainer: {
    backgroundColor: '#113755',
    justifyContent: 'center',
    marginTop: 120,
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontFamily: 'Nunito_600SemiBold',
    color: '#f9fced',
  },
  titleContainer: {
    fontFamily: 'Nunito_600SemiBold',
    backgroundColor: '#52b69a',
    position: 'absolute',
    top: 0,
    width,
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 20,
    zIndex: 2,
  },

  buttonText: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#f9fced',
  },

  input: {
    padding: 16,
    color: '#1e6091',
    flex: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  blogText: {
    fontSize: 15,
    fontFamily: 'Lato_400Regular',
    color: 'white',
    flex: 1,
    flexWrap: 'wrap',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    lineHeight: 20,
  },
});
