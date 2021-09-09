import React, { Component, useState, Navigator } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacityBase, TouchableOpacity, AsyncStorage } from 'react-native';
import Login from "./components/Login";
import Timetable from "./components/Timetable";
import maturaTimetable from './assets/matura_timetable.json';
import departments from './assets/departments.json';
import timetableA from './assets/timetable_a.json';
import timetableB from './assets/timetable_b.json';

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      firstName: "",
      secondName: "",
      logged: false,
      personTimetable: {},
      errorMessage: "",
      department: ""
    };
    this.handleCredentials = this.handleCredentials.bind(this);
  }

  handleCredentials (firstName, secondName) {
    firstName = firstName.toLowerCase()
    secondName = secondName.toLowerCase()
    let department = ""
    for (let key in departments) {
      if (departments[key].includes(firstName.split(" ").map((a,i) => i == 1? a[0] + "." : a).join(" ") + " " + secondName)) {
        department = key
        console.log(department);
      }
    }
    if (maturaTimetable[firstName + " " + secondName]) {
      this.setState({
        firstName: firstName,
        secondName: secondName,
        logged: true,
        personTimetable: maturaTimetable[firstName + " " + secondName],
        department: department
      });
    }
    else {
      this.setState({
        errorMessage: "Napačno ime ali priimek. Si pozabil zapisati obe imeni?"
      });
      setTimeout(() => {
        this.setState({
          errorMessage: ""
        })
      }, 5000)
    }
  }

  render (){
    if (this.state.logged) return <Timetable department = {this.state.department} timetables = {[timetableA, timetableB, {}]} personTimetable = {this.state.personTimetable} firstName = {this.state.firstName} secondName = {this.state.secondName} />;
    return <Login error = {this.state.errorMessage} handleCredentials = {this.handleCredentials}></Login>;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});