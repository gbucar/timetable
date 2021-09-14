import React, { Component, useState, Navigator } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacityBase, TouchableOpacity } from 'react-native';
import Login from "./components/Login";
import Timetable from "./components/Timetable";
import maturaTimetable from './assets/matura_timetable.json';
import departments from './assets/departments.json';
import timetableA from './assets/timetable_a.json';
import timetableB from './assets/timetable_b.json';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class App extends Component {
  constructor (props) {
    super(props);
    
    this.state = {
      firstName: "",
      secondName: "",
      logged: false,
      personTimetable: {},
      errorMessage: "",
      department: "",
      currentTimetable: false
    };
    this.handleCredentials = this.handleCredentials.bind(this);
  }



  async handleCredentials (firstName, secondName) {
    this.setState({loading:true});
    firstName = firstName.toLowerCase();
    secondName = secondName.toLowerCase();

    const jsonValue = JSON.stringify([firstName, secondName]);
    await AsyncStorage.setItem("credentials", jsonValue);

    let department = ""
    for (let key in departments) {
      if (departments[key].includes(firstName.split(" ").map((a,i) => i == 1? a[0] + "." : a).join(" ") + " " + secondName)) {
        department = key
      }
    }
    if (!firstName || !secondName) return
    if (maturaTimetable[firstName + " " + secondName]) {
      this.setState({
        firstName: firstName,
        secondName: secondName,
        logged: true,
        personTimetable: maturaTimetable[firstName + " " + secondName],
        department: department,
        lastYear: true,
        loading:false
      });
    }
    else if (department) {
      let currentTimetable = false
      let c = await fetch("https://timetable-gz.herokuapp.com/").then(a => a.json()).then(a => {currentTimetable = a})
      this.setState({
        firstName: firstName,
        secondName: secondName,
        logged:  true,
        personTimetable: false,
        department: department,
        currentTimetable: currentTimetable,
        lastYear: false,
        loading:false
      })
    }
    else {
      this.setState({
        errorMessage: "Napačno ime ali priimek. Si pozabil zapisati obe imeni?",
        loading:false
      });
      setTimeout(() => {
        this.setState({
          errorMessage: ""
        })
      }, 5000)
    }
  }

  restart() {
    this.setState({
      firstName: "",
      secondName: "",
      logged: false,
      personTimetable: {},
      errorMessage: "",
      department: ""
    });
  }

  render (){
    if (this.state.logged) return <Timetable changeWindow = {() => this.restart()} department = {this.state.department} timetables = {[timetableA, timetableB, {}]} currentTimetable = {this.state.currentTimetable} personTimetable = {this.state.personTimetable} firstName = {this.state.firstName} secondName = {this.state.secondName} />;
    return <Login error = {this.state.errorMessage} handleCredentials = {this.handleCredentials} login = {this.loading}></Login>;
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