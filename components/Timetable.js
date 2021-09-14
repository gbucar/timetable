import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacityBase, TouchableOpacity, Touchable } from 'react-native';
import { WebView } from 'react-native-webview';

class LeftSquare extends Component {
    constructor (props) {
        super(props);
    };
    render () {
        return (
            <View style = {styles.leftSquare}>
                <Text style = {styles.leftSquareText}>{this.props.time}</Text>
            </View>
        );
    }
}

class Times extends Component {
    constructor(props) {
        super(props);
    };
    render () {
        return (
            <View style = {styles.timesContainer}>
                {this.props.data.map((a, i) => {
                    return <LeftSquare time = {a} key = {i}></LeftSquare>
                })}
            </View>
        );
    };
}

class Day extends Component {
    constructor(props) {
        super(props);
        this.state = {
            custom: this.props.personTimetable,
            table: this.props.table
        }
    }

    render() {
        let table = [...this.state.table];
        let custom = {...this.state.custom};
        let day = this.props.day
        if (this.props.personTimetable) {
            switch (day) {
                case 0:
                    table.unshift(custom["subjects"][0]);
                break;
                case 1:
                    table = table.concat(custom["subjects"].slice(1,4))
                break;
                case 2:
                    table.unshift(...custom["subjects"].slice(4,6))
                    table.push(custom["subjects"][custom["subjects"].length -1])
                break;
                case 3:
                    table = custom["subjects"].slice(6,8).concat(table)
                    table.unshift(custom["subjects"][9])
                    table.push(custom["subjects"][8])
                break;
                case 4:
                    table = table.concat(custom["subjects"].slice(10,12))
                break;
            }
        }
        let now = new Date();
        if (now.getHours() > 14) {now.setDate(now.getDate() + 1)}
        return (
            <View>
                {
                    table.map(a => {
                        return (
                        <View style = {[styles.timetableItem, {backgroundColor: now.getDay()-1 == day ? this.props.personTimetable["gender"] == "f" ? "#FFBBBB" : "#96DFFF"  : ""}]} key = {Math.random()}>
                            <Text>{!a || a == "---" ? ":)" : a}</Text>    
                        </View>)
                    })
                }
            </View>
        );
    }
}

export default class Timetable extends Component {
    constructor (props) {
        super(props)
        this.state = {
            times: ['7.20\n8.05 ', '8.10\n8.55 ', '9.00\n9.45 ', '10.05\n10.50 ', '10.55\n11.40 ', '11.45\n12.30 ', '12.35\n13.20 ', '13.50\n14.35'],
            timetables: this.props.timetables
        };
        this.changeWindow = this.changeWindow.bind(this);
        this.showPdf = this.showPdf.bind(this);
    };

    changeWindow () {
        this.props.changeWindow()
        this.setState({
            times: [],
            timetables: [],
            pdf: false
        });
    };

    showPdf () {
        this.setState({
            pdf: !this.state.pdf
        });
    };

    formateTimetableLink() {
        let d = new Date()
        d = d.getMonth() + 1
        d = String(d)
        if (d.length) d = "0" + d
        return "https://gz.zelimlje.si/wp-content/uploads/sites/2/2021/" + d +"/Urnik_teden.pdf"
    }

    render () {
        return (
            <View style = {styles.base}>
                <StatusBar hidden />
                <View style = {[styles.navbar, {backgroundColor: this.props.personTimetable["gender"] == "f" ? "#FA7171" : "#0080B7" }]}>
                    <Text style = {styles.text}>{this.props.firstName.trim() + " " + this.props.secondName.trim()}</Text>
                    <View style = {styles.buttonContainer}>
                        <TouchableOpacity onPress = {this.changeWindow}><Text style = {styles.text}>🔙</Text></TouchableOpacity>
                        <TouchableOpacity onPress = {this.showPdf}><Text style = {styles.text}>📰</Text></TouchableOpacity>
                        <TouchableOpacity><a href = {'https://docs.google.com/gview?url=' + this.formateTimetableLink()}>⚡</a></TouchableOpacity>
                    </View>
                </View>  

                {
                    this.state.pdf ?
                    
                    <WebView source={{uri: 'https://docs.google.com/gview?url=' + this.formateTimetableLink()}}/> :

                    <View style = {styles.timetableContainer}>
                    <Times data = {this.state.times}></Times>
                    <View style = {styles.subjectContainer}>
                        {
                            ((this.props.currentTimetable ? this.props.currentTimetable : this.state.timetables[0])[this.props.department]).map((a, i) => {
                                return <Day table = {a} personTimetable = {this.props.personTimetable} day = {i} key = {i} ></Day> 
                            })
                        }
                    </View>

                </View>
                } 
            </View>
        );
    };
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row-reverse'
    },
    navbar:{
        justifyContent: "space-between",
        flexDirection: "row",
        marginBottom: 10,
        padding: 5,
        paddingTop: 10,
    },
    text: {
        color: "white",
        paddingBottom: 0,
        paddingLeft: 3,
        fontSize: 30,
        textTransform: 'capitalize'
    },
    base : {
        flex: 1,
        flexDirection: "column",
        overflow: "scroll"
    },
    leftSquare: {
        backgroundColor: "#c3c3c3",
        height: 36,
        marginBottom: 5,
        paddingTop: 2,
    },
    leftSquareText: {
        color: "#ffffff",
        textAlign: "center",
        fontWeight: "bold",
        textShadowRadius: 10,
        textShadowOffset: {
            x: 10,
            y:10
        }

    },
    timetableItem: {
        borderWidth: 2,
        backgroundColor: "#fff",
        borderColor: "#000000",
        height: 36,
        margin: 5,
        marginTop: 0,
        padding: 5,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center"
        
    },
    timesContainer: {
        maxWidth: 50,
        height: 40,
        marginLeft: 5
    },
    timetableContainer: {
        flexDirection: "row",
        flex: 1,
    },
    subjectContainer: {
        flexDirection: "row",
        justifyContent: "space-around"

    }
})