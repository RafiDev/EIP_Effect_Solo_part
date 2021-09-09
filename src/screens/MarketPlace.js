import * as React from 'react';
import { Alert, Modal, Pressable, SectionList, StyleSheet, Text, View } from 'react-native';

const DATA = [
  {
    title: 'EFFETS DE SATURATIONS',
    data: [
      {id: '1', value: 'Overdrive'},
      {id: '2', value: 'Distorsion'},
      {id: '3', value: 'Fuzz'}
    ],
  },
  {
    title: 'EFFETS DE FILTRES',
    data: [
      {id: '4', value: 'équaliseur'},
      {id: '5', value: 'wah-wah'},
      {id: '6', value: 'auto-wah'}
    ],
  },
  {
    title: 'EFFETS TEMPORELS',
    data: [
      {id: '7', value: 'Delay'},
      {id: '8', value: 'Reverb'}
    ]
  },
  {
    title: 'EFFETS DE MODULATIONS',
    data: [
      {id: '9', value: 'Chorus'},
      {id: '10', value: 'Flanger'},
      {id: '11', value: 'Harmoniser'},
      {id: '12', value: 'Tremolo'},
      {id: '13', value: 'Whammy'}
    ]
  },
  {
    title: 'EFFETS DYNAMIQUES',
    data: [
      {id: '14', value: 'Compression'},
      {id: '15', value: 'Noise Gate'},
      {id: '16', value: 'Limiteur'},
      {id: '17', value: 'Enhancer'}
    ]
  },
];

class MarketPlace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  };

  displayModal(show) {
    this.setState({modalVisible: show})
  }

  render() {
    return (
        <View style={styles.container}>
          <SectionList
            sections={DATA}
            keyExtractor={(item, index) => item + index}
            renderItem={({item}) => (
              <>
                <Modal
                  presentationStyle="pageSheet"
                  animationType="slide"
                  visible={this.state.modalVisible}
                  onRequestClose={() => {
                    Alert.alert("Modal has now been closed.");
                  }}
                >
                  <View style={styles.centeredView}>
                    <Text style={styles.text}>Test</Text>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {this.displayModal(!this.state.modalVisible)}}
                    >
                      <Text style={styles.textStyle}>Fermer</Text>
                    </Pressable>
                  </View>
                </Modal>
                <Pressable
                  onPress={() => this.displayModal(true)}
                >
                  <Text
                    style={styles.item}
                  >
                    {item.value}
                  </Text>
                </Pressable>
              </>
            )}
            renderSectionHeader={({section}) => (
              <Text style={styles.sectionHeader}>
                {section.title}
              </Text>
            )}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 55
    },
    sectionHeader: {
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    text:{
      padding: 10,
  },
  input:{
      padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#2196F3",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
  })

export default MarketPlace