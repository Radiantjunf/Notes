import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../database/firebaseDb';

class TaskDetailScreen extends Component {

  constructor() {
    super();
    this.state = {
      id: '',
      tarefa: '',
      descricao: '',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const dbRef = firebase.firestore().collection('Tarefas').doc(this.props.route.params.taskkey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const task = res.data();
        this.setState({
          key: res.id,
          id: task.id,
          tarefa: task.tarefa,
          descricao: task.descricao,
          isLoading: false
        });
      } else {
        console.log("Não existe a tarefa!");
      }
    });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  updateTask() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('Tarefas').doc(this.state.key);
    updateDBRef.set({
    id: this.state.id,
      tarefa: this.state.tarefa,
      descricao: this.state.descricao,
    }).then((docRef) => {
      this.setState({
        key: '',
        id: '',
        tarefa: '',
        descricao: '',
        isLoading: false,
      });
      this.props.navigation.navigate('TaskScreen');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  deleteTask() {
    const dbRef = firebase.firestore().collection('Tarefas').doc(this.props.route.params.taskkey)
      dbRef.delete().then((res) => {
          this.props.navigation.navigate('TaskScreen');
      })
  }

  openTwoButtonAlert=()=>{
    Alert.alert(
      'Apagar a tarefa',
      'Tem a certeza?',
      [
        {text: 'Sim', onPress: () => this.deleteTask()},
        {text: 'Não', onPress: () => console.log('Nenhuma tarefa removida!'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
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
              placeholder={'Descrição'}
              value={this.state.descricao}
              onChangeText={(val) => this.inputValueUpdate(val, 'descricao')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Atualizar'
            onPress={() => this.updateTask()}
            color="#19AC52"
          />
          </View>
         <View>
          <Button
            title='Apagar'
            onPress={this.openTwoButtonAlert}
            color="#E37399"
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
  },
  button: {
    marginBottom: 7, 
  }
})

export default TaskDetailScreen;