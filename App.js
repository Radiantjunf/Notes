import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AddTaskScreen from './components/AddTaskScreen';
import TaskScreen from './components/TaskScreen';
import TaskDetailScreen from './components/TaskDetailScreen';
import Signup from './components/signup';
import Login from './components/login';
import Dashboard from './components/dashboard';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
          headerStyle: {
            backgroundColor: '#621FF7',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={
          {title: 'MyNotesIPS'},
          {headerLeft: null}
          }
        />
        <Stack.Screen
         name="Signup"
         component={Signup}
         options={{ title: 'Registo' }}
         />
         <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={
          { title: 'Sair da Aplicação' }
          }
          />
      <Stack.Screen 
        name="AddTaskScreen"
        component={AddTaskScreen}
        options={{ title: 'Adicionar Tarefa' }}
      />
      <Stack.Screen 
        name="TaskScreen"
        component={TaskScreen}
        options={{ title: 'Lista de Tarefas' }}
      />
      <Stack.Screen 
       name="TaskDetailScreen"
       component={TaskDetailScreen}
       options={{ title: 'Detalhes das tarefas' }}
      />

    </Stack.Navigator>

  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}