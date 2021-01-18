import React from 'react';
import {
     StyleSheet, 
     Text, 
     View,
     Image
     } from 'react-native';

     export default class login extends React.Component {


        state = {
            email: '',
            password: ''
         }
         handleEmail = (text) => {
            this.setState({ email: text })
         }
         handlePassword = (text) => {
            this.setState({ password: text })
         }
         login = (email, pass) => {
            alert('email: ' + email + ' password: ' + pass)
         }

        
         render() {
            return (
               
                  

               <View style = {styles.container}>
                  <View style = {{margin:20}}>
                     <Image source = {require ('../img/logoA.jpg' )} />
                  </View>
                  <TextInput style = {styles.input}
                     underlineColorAndroid = "transparent"
                     placeholder = "Email"
                     placeholderTextColor = "#9a73ef"
                     autoCapitalize = "none"
                     onChangeText = {this.handleEmail}/>
                  
                  <TextInput style = {styles.input}
                     underlineColorAndroid = "transparent"
                     placeholder = "Password"
                     placeholderTextColor = "#9a73ef"
                     autoCapitalize = "none"
                     onChangeText = {this.handlePassword}/>
                  
                  <TouchableOpacity
                     style = {styles.submitButton}
                     onPress = {
                        () => this.login(this.state.email, this.state.password)
                     }>
                     <Text style = {styles.submitButtonText}> Submit </Text>
                  </TouchableOpacity>
               </View>
            )
         }


     }

     var styles = require('./styles');