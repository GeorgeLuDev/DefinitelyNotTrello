import 'react-native-gesture-handler';

import * as React from 'react';
import { Platform, StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

import Login from './src/components/Authentication/Login/Login';
import Signup from './src/components/Authentication/Signup/Signup'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { create } from 'react-test-renderer';
import AuthenticationScreen from './src/components/Authentication/AuthenticationScreen';
import BoardList from './src/components/Boards/BoardList';
import { Entypo } from '@expo/vector-icons'; 
import PasswordRecovery from './src/components/Authentication/PasswordRecovery';


const Stack = createStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
        <Stack.Navigator initialRouteName="BoardList">
        <Stack.Screen name="Auth" component={AuthenticationScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="PasswordRecovery" component={PasswordRecovery} />
        <Stack.Screen name="BoardList" component={BoardList}
        options={{
          title: 'Boards',
          headerRight: () => (
            <TouchableOpacity
              style={{
                marginRight: 20
              }}
              onPress={() => alert('This is a button!')}>

            <Entypo name="plus" size={34} color="white" />
              </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#4b414a',
            
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            alignSelf: 'center'
          }
        }} />
      </Stack.Navigator>
    </NavigationContainer>

    // <Login></Login>

    // <View style={styles.container}>
    //   <Text style={styles.welcome}>Welcome to React Native!</Text>
    //   <Text style={styles.instructions}>To get started, edit App.js</Text>
    //   <Text style={styles.instructions}>{instructions}</Text>
    // </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
