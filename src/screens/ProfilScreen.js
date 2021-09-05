import * as React from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from "react-native";
import Background from '../components/Background';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        email: '',
        libraries: [],
        ecosystems: [],
        modalVisible: false,
        newName: '',
        newEmail: '',
        newPassword: '',
        checkEmail: '',
    };
  }

  componentDidMount = () => {
    fetch('http://api.e-ffect.fr/1/user/me', {
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
        //console.log(responseJson);
        this.setState({
          name: responseJson.user.name,
          email: responseJson.user.email,
          libraries: responseJson.user.libraries,
          ecosystems: responseJson.user.ecosystems,
          checkEmail: responseJson.user.account_infos.emailVerified,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

    handleNbPlaylist = () => {
        let i = 0;
        while (this.state.libraries[i]) {
            i++;
        }
        return i;
    };

    handleNbEcosysteme = () => {
        let i = 0;
        while (this.state.ecosystems[i]) {
            i++;
        }
        return i;
    };

    handleName = (text) => {
        this.setState({ newName: text })
    };

    handleEmail = (text) => {
        this.setState({ newEmail: text })
    };

    handlePassword = (text) => {
        this.setState({ newPassword: text })
    };

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    };

    sendData = (visible) => {     
        if (this.state.newName == '' || this.state.newName == null) {
            console.log('empty field for name');
        } else {
            fetch('http://api.e-ffect.fr/1/user/me', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRjMTQyYmU5NWZjZTAwMTUzODBhNmEiLCJpYXQiOjE2MjUwMzYwMjV9.u_-yJL0eJYlFQfZjwuSiivq7eSBew1uM3k_YVZqiaoc',
                },
                body: JSON.stringify({
                    name: this.state.newName,
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.message == 'User has been modified') {
                    this.setState({ name: this.state.newName});
                } else {
                    console.log('error with new name');
                }
            });
        }

        if (this.state.newEmail == '' || this.state.newEmail == null) {
            console.log('empty field for email')
        } else {
            fetch('http://api.e-ffect.fr/1/user/settings/email', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRjMTQyYmU5NWZjZTAwMTUzODBhNmEiLCJpYXQiOjE2MjUwMzYwMjV9.u_-yJL0eJYlFQfZjwuSiivq7eSBew1uM3k_YVZqiaoc',
                },
                body: JSON.stringify({
                    email: this.state.newEmail,
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
            })
        }

        if (this.state.newPassword == '' || this.state.newPassword == null) {
            console.log('empty field for password');
        } else {
            fetch('http://api.e-ffect.fr/1/user/settings/password', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRjMTQyYmU5NWZjZTAwMTUzODBhNmEiLCJpYXQiOjE2MjUwMzYwMjV9.u_-yJL0eJYlFQfZjwuSiivq7eSBew1uM3k_YVZqiaoc',
                },
                body: JSON.stringify({
                    newPassword: this.state.newPassword,
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
            })
        }
        this.setState({ modalVisible: visible });
    };

    render() {
        const { modalVisible } = this.state;
        return (
        <Background>
            <Text style={styles.text}>{this.state.name}</Text>
            <Text style={styles.text}>{this.state.email}</Text>
            <Text style={styles.text}>nombre de librairies</Text>
            <Text>{this.handleNbPlaylist()}</Text>
            <Text style={styles.text}>nombre d'écosystèmes</Text>
            <Text>{this.handleNbEcosysteme()}</Text>
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
                        placeholder="Name"
                        onChangeText={this.handleName}
                    />
                    <TextInput style={styles.input}
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        placeholder="Email"
                        autoCapitalize="none"
                        onChangeText={this.handleEmail}
                    />
                    <TextInput style={styles.input}
                        textContentType="password"
                        secureTextEntry={true}
                        placeholder="Password"
                        onChangeText={this.handlePassword}

                    />
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => this.sendData(!modalVisible)}
                    >
                        <Text style={styles.textStyle}>Envoyer</Text>
                    </Pressable>
                </View>
            </Modal>
            <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => this.setModalVisible(true)}
            >
            <Text style={styles.textStyle}>Modifier</Text>
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

export default ProfileScreen;
