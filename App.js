import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Main from './app/components/Main';
import Main from './app/screens/login';




    const AppNavigator = createStackNavigator(
      {
        Home: {
           screen: login
           },
           main: {
              screen:  Main
            }
      },
      {
        initialRouteName: 'Home'
      }
    );

    const AppContainer = createAppContainer(AppNavigator);


export default class App extends React.Component{
   render(){
        return <AppContainer/>
    
        
        
    }
  }



  
