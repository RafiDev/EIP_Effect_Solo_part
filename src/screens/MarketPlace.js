import * as React from 'react';
import { Alert, Modal, Pressable, SectionList, StyleSheet, Text, View } from 'react-native';

const DATA = [
  {
    title: 'EFFETS DE SATURATIONS',
    data: [
      'Overdrive',
      'Distorsion',
      'Fuzz'
    ],
  },
  {
    title: 'EFFETS DE FILTRES',
    data: [
      'équaliseur',
      'wah-wah',
      'auto-wah'
    ],
  },
  {
    title: 'EFFETS TEMPORELS',
    data: [
      'Delay',
      'Reverb'
    ]
  },
  {
    title: 'EFFETS DE MODULATIONS',
    data: [
      'Chorus',
      'Flanger',
      'Harmoniser',
      'Tremolo',
      'Whammy'
    ]
  },
  {
    title: 'EFFETS DYNAMIQUES',
    data: [
      'Compression',
      'Noise Gate',
      'Limiteur',
      'Enhancer'
    ]
  },
];

class MarketPlace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      secondModalVisible: false,
      libraries: [],
    };
  };

  displayModal(show) {
    this.setState({modalVisible: show})
  }

  secondDisplayModal(show) {
    this.setState({secondModalVisible: show})
  }

  getAllPlaylist = () => {
    fetch('http://api.e-ffect.fr/1/me/library', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRjMTQyYmU5NWZjZTAwMTUzODBhNmEiLCJpYXQiOjE2MjUwMzYwMjV9.u_-yJL0eJYlFQfZjwuSiivq7eSBew1uM3k_YVZqiaoc',
      },
    })
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson[0].name);
    })
  }

  render() {
    return (
        <View style={styles.container}>
          <SectionList
            sections={DATA}
            keyExtractor={(item, index) => index}
            renderItem={({item}) => (
              <>
                <Modal
                  presentationStyle="pageSheet"
                  animationType="slide"
                  visible={this.state.modalVisible}
                  onRequestClose={() => {
                    Alert.alert("Modal 1 has now been closed.");
                  }}
                >
                  <View style={styles.centeredView}>
                    <Text style={styles.item}>{item}</Text>
                    <Pressable
                      style={styles.button}
                      onPress={() => console.log("liké")}
                    >
                      <Text style={styles.text}>J'aime</Text>
                    </Pressable>
                    <Modal
                      presentationStyle="pageSheet"
                      animationType="slide"
                      visible={this.state.secondModalVisible}
                      onRequestClose={() => {
                        Alert.alert("Modal 2 has now been closed.");
                      }}
                    >
                      <View style={styles.centeredView}>
                        <Pressable
                          style={styles.button}
                          onPress={() => this.getAllPlaylist()}
                        >
                          <Text style={styles.text}>get info</Text>
                        </Pressable>
                        <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => {this.secondDisplayModal(!this.state.secondModalVisible)}}
                        >
                          <Text style={styles.textStyle}>Annuler</Text>
                        </Pressable>
                      </View>
                    </Modal>
                    <Pressable
                      style={styles.button}
                      onPress={() => this.secondDisplayModal(true)}
                    >
                      <Text style={styles.text}>ajouter à une playlist</Text>
                    </Pressable>
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
                    {item}
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