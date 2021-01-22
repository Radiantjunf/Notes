import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../database/firebaseDb';

class AddTaskScreen extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('Tarefas');
    this.state = {
      tarefa: '',
      descricao: '',
      isLoading: false
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storeTask() {
    if(this.state.tarefa === ''){
     alert('Preencha o nome da tarefa!')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        tarefa: this.state.tarefa,
        descricao: this.state.descricao,
      }).then((res) => {
        this.setState({
          tarefa: '',
          descricao: '',
          isLoading: false,
        });
        this.props.navigation.navigate('TaskScreen')
      })
      .catch((err) => {
        console.error("Erro: ", err);
        this.setState({
          isLoading: false,
        });
      });
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Tarefa'}
              value={this.state.tarefa}
              onChangeText={(val) => this.inputValueUpdate(val, 'tarefa')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Descricao'}
              value={this.state.descricao}
              onChangeText={(val) => this.inputValueUpdate(val, 'descricao')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Adicionar Tarefa'
            onPress={() => this.storeTask()}
            color="#19AC52"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default AddTaskScreen;