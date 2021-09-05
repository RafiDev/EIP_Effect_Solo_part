import * as React from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from "react-native";
import Background from '../components/Background';

class Ecosysteme extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ecosys_name: '',
            bridge_name: '',
            ecosystems: [],
            modalVisible: false,
        };
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    };

    createEcosysteme = (visible) => {
        if ((this.state.ecosys_name == '' || this.state.ecosys_name == null) 
        && (this.state.bridge_name == '' || this.state.bridge_name == null)) {
            console.log('error: empty field');
        } else {
            fetch('http://api.e-ffect.fr/1/ecosystem', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRjMTQyYmU5NWZjZTAwMTUzODBhNmEiLCJpYXQiOjE2MjUwMzYwMjV9.u_-yJL0eJYlFQfZjwuSiivq7eSBew1uM3k_YVZqiaoc',
                },
                body: JSON.stringify({
                    name: this.state.ecosys_name,
                    bridgeName: this.state.bridge_name 
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
            })
        }
        this.setState({ modalVisible: visible });
    }

    deleteEcosyteme = (visible) => {
        
    }

    handleEcosystemeName = (text) => {
        this.setState({ ecosys_name: text })
    };

    handleBridgeName = (text) => {
        this.setState({ bridge_name: text })
    };

    render() {
        const { modalVisible } = this.state;
        return (
            <Background>
                <Text>Ecosysteme</Text>
                <Modal
                    presentationStyle="pageSheet"
                    animationType="slide"
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        this.setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <TextInput style={styles.input}
                            textContentType="username"
                            placeholder="Ecosysteme"
                            onChangeText={this.handleEcosystemeName}
                        />
                        <TextInput style={styles.input}
                            textContentType="username"
                            placeholder="Bridge"
                            onChangeText={this.handleBridgeName}
                        />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => this.createEcosysteme(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Envoyer</Text>
                        </Pressable>
                    </View>
                </Modal>
                <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => this.setModalVisible(true)}
                >
                    <Text style={styles.textStyle}>Créer</Text>
                </Pressable>
                <Pressable>
                    <Text style={styles.textStyle}>Supprimer</Text>
                </Pressable>
            </Background>
        );
    }
}

const styles = StyleSheet.create({
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
});

export default Ecosysteme;