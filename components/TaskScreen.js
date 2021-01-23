import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, Button, View } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from '../database/firebaseDb';

class TaskScreen extends Component {

  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('Tarefas').where("id", "==", firebase.auth().currentUser.uid);
    this.state = {
      isLoading: true,
      taskArr: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const taskArr = [];
    querySnapshot.forEach((res) => {
      const { tarefa, descricao } = res.data();
      taskArr.push({
        key: res.id,
        res,
        tarefa,
        descricao,
      });
    });
    this.setState({
      taskArr,
      isLoading: false,
   });
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
          {
            this.state.taskArr.map((item, i) => {
              return (
                <ListItem
                  key={i}
                  chevron
                  bottomDivider
                  title={item.tarefa}
                  subtitle={item.descricao}
                  onPress={() => {
                    this.props.navigation.navigate('TaskDetailScreen', {
                      taskkey: item.key
                    });
                  }}/>
              );
            })
          }
          <Button
             color="#3740FE"
             title="Adicionar Tarefa"
             onPress={() => this.props.navigation.navigate('AddTaskScreen')}
          />
          <Button
             color="#3740FE"
             title="Sair da App"
             onPress={() => this.props.navigation.navigate('Dashboard')}
          />
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
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

export default TaskScreen;