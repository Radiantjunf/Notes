import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
       paddingTop: 23,
       flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    center: {
        marginTop: 20,
        alignItems: 'center',
        },
        group: {
            marginTop: 20,
            },

    input: {
       margin: 15,
       height: 40,
       borderColor: '#7a42f4',
       borderWidth: 1
    },
    submitButton: {
       backgroundColor: '#7a42f4',
       padding: 10,
       margin: 15,
       height: 40,
    },
    submitButtonText:{
       color: 'white'
    },
    registoButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
     },
     registoButtonText:{
        color: 'white'
     }
});

module.exports = styles;