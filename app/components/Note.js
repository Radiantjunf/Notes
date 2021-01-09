import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

export default class Note extends React.Component{
    render(){
        return (
            <View key={this.props.keyval} style={styles.note}>
               <Text style={styles.noteText}>{this.props.val.date}</Text>
               <Text style={styles.noteText}>{this.props.val.note}</Text>


                <TouchableOpacity onPress={this.props.deleteMethod} style={styles.noteDelete}>
                    <Text style={styles.noteDeleteText}>X</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    note: {
        position: 'relative',
        padding: 20,
        paddingRight:100,
        borderBottomWidth: 2,
        borderBottomColor: '#222222',
        backgroundColor: '#42433e'
    },
    noteText: {
        fontSize:18,
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#ff9800',
        color: '#f8f8dc',
    },
    noteDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a40a0a',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10
    },
    noteDeleteText: {
        color: 'white',
    }
});