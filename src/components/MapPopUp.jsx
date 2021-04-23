const MapPopUp = () => {
  return (
    // <View style={styles.popUp}>
    // <Text>Placename</Text>
    // <TouchableOpacity
    // style={styles.mapClosingButton}
    // onPress={() => {
    // console.log("close");
    // }}
    // >
    // <Text style={styles.text}>Close</Text>
    // </TouchableOpacity>
    // <TouchableOpacity
    // // onPress={() => {
    // // console.log("navigating to single trip page");
    // // }}
    // >
    // <Text>This Trip</Text>
    // </TouchableOpacity>
    // </View>
    <Modal
      animationType="slide"
      transparent={true}
      // visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Hello World!</Text>

          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

export default MapPopUp;
