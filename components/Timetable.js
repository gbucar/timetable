import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacityBase, TouchableOpacity } from 'react-native';

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
            table: this.props.table,
            custom: this.props.personTimetable
        }
    }

    render() {
        let table = this.state.table;
        let custom = this.state.custom;
        let day = this.props.day
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
                table = table.concat(custom["subjects"].slice(9,11))
            break;
        }
        return (
            <View>
                {
                    table.map(a => {
                        return (<View style = {styles.timetableItem}>
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
    };

    render () {
        return (
            <View style = {styles.base}>
                <Text style = {styles.text}>Urnik</Text>
                <View style = {styles.timetableContainer}>
                    <Times data = {this.state.times}></Times>
                    <View style = {styles.subjectContainer}>
                        {
                            this.props.timetables[0][this.props.department].map((a, i) => {
                                return <Day table = {a} personTimetable = {this.props.personTimetable} day = {i} key = {i} ></Day> 
                            })
                        }
                    </View>

                </View>
                
            </View>
        );
    };
};

const styles = StyleSheet.create({
    base : {
        flex: 1,
        flexDirection: "column"
    },
    leftSquare: {
        bordercolor: "#000000",
        backgroundColor: "#c3c3c3",
        marginBottom: 5,
        paddingTop: 2
    },
    leftSquareText: {
        color: "#ffffff",
        textAlign: "center",
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
        height: 40
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