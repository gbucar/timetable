import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacityBase, TouchableOpacity } from 'react-native';

class Login extends Component {
    constructor(props) {
      super(props)
      this.state = {
        firstName: "",
        secondName: ""
      };
      this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
      this.handleSecondNameChange = this.handleSecondNameChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleFirstNameChange (text) {
      this.setState({
        firstName: text
      });
    };
    handleSecondNameChange (text) {
      this.setState({
        secondName: text
      });
    };

    handleSubmit () {
      this.props.handleCredentials(this.state.firstName.trim(), this.state.secondName.trim());
    };

    render() {
      return (
        <View style={styles.container}>
          <Text style = {styles.title}>Vpiši svoje podatke:</Text>
          <TextInput style = {styles.inputField} placeholder = "Ime..." onChangeText = {this.handleFirstNameChange} value = {this.state.firstName} />
          <TextInput style = {styles.inputField} placeholder = "Priimek..." onChangeText = {this.handleSecondNameChange} value = {this.state.secondName} />
          <TouchableOpacity style = {styles.button} onPress = {this.handleSubmit}><Text>➡️</Text></TouchableOpacity>
          <Text style = {styles.error}>{this.props.error}</Text>
        </View>
      );
    };
  };

  const styles = StyleSheet.create({
    container: {    
      flex: 1,
      backgroundColor: '#fff',
      flexDirection: "column",
      margin: 10,
      marginTop: "30%"
    },
    title: {
      marginBottom: 20,

    },
    inputField: {
      marginBottom: 10,
      backgroundColor: "#C4C4C4",
      height: 30,
      color: "#000000",
      padding: 3
    },
    button : {
      marginLeft: "auto",
      marginRight: "auto"
    },
    error: {
      color: "#ff0000"
    }
  })

  export default Login;